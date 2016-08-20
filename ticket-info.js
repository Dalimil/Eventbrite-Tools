/**
 * This script can be used to get Eventbrite event ticket info. It must be run from the Eventbrite event page.
 *
 * The whole project can be found here: https://github.com/Dalimil/Eventbrite-Tools
 */

function checkLocation() {
	if (location.href.indexOf("eventbrite") == -1) {
		console.log("You must go to the Eventbrite event page and run the script from there!");
		throw new Error("You must go to the Eventbrite event page and run the script from there!");
	}
}

var EVENTBRITE_CHANGED_ERROR = "Eventbrite changed something and broke my script. Please let me know.";

function findCollection(data) {
	var pattern = /collection[\s:]+\[{.*/g;
	var res = data.match(pattern);
	if(res == null || res.length == 0) {
		console.log("Ticket information is not available at this time. Finding alternative info...");
		return null;
	}
	var collectionText = '{' + res[0].replace("collection", '"collection"') + '}';
	collectionText = collectionText.replace(/\t/g, '');

	var result = null;
	try {
		result = JSON.parse(collectionText);
	} catch(err) {
		console.log(EVENTBRITE_CHANGED_ERROR, err);
		throw err;
	}
	return result.collection;
}

function findModel(data) {
	var pattern = /model[\s:]+{.*},/g;
	var res = data.match(pattern);
	if(res == null || res.length == 0) {
		console.log(EVENTBRITE_CHANGED_ERROR);
		throw new Error(EVENTBRITE_CHANGED_ERROR);
	}
	var modelText = '{' + res[0].replace("model", '"model"').replace(/\t/g, '');
	modelText = modelText.substr(0, modelText.lastIndexOf(",")) + '}';

	var result = null;
	try {
		result = JSON.parse(modelText);
	} catch(err) {
		console.log(EVENTBRITE_CHANGED_ERROR, err);
		throw err;
	}
	return result.model;
}

function parseInteresting(collectionItem) {
	return {
		"name": collectionItem.name,
		"quantity": {
			"quantity_total": collectionItem.quantity_total,
			"quantity_sold": collectionItem.quantity_sold,
			"quantity_remaining": collectionItem.quantity_remaining
		},
		"cost": collectionItem.is_free ? "Free" :
			(collectionItem.total_cost == null ? collectionItem.ticket_price : collectionItem.total_cost.display),
		"status": {
			"status_is_sold_out": collectionItem.status_is_sold_out,
			"status_is_ended": collectionItem.status_is_ended,
			"on_sale_status": collectionItem.on_sale_status
		},
		"dates": {
			"start": new Date(collectionItem.start_sales).toLocaleFormat(),
			"end": new Date(collectionItem.end_sales).toLocaleFormat()
		}
	};
}

function parseModelItems(model) {
	return {
		"is_free": model.is_free,
		"capacity": model.capacity,
		"remaining_tickets": model.remaining_tickets,
		"status": {
			"status_is_sold_out": model.status_is_sold_out,
			"status_is_ended": model.status_is_ended
		},
		"dates": {
			"start": model.first_ticket_sales_start_date,
			"notification_text": model.not_yet_started_notification_text
		},
		"most_recent_event_update": new Date(model.changed).toLocaleFormat()
	};
}

function createResultTooltip(data) {
	var id = "tooltip-custom-event-info";
	var tooltip = document.getElementById(id);
	if(tooltip != null) {
		// Destroy previous
		document.body.removeChild(tooltip);
	}

	// Create
	tooltip = document.createElement("div");
	tooltip.id = id;
	tooltip.innerHTML = data;
	tooltip.style.cssText = "width: 40%; max-height: 75%; white-space: pre; overflow-y: auto; " +
		"background-color: #333; color: #EEE; border-radius: 6px; box-shadow: 0px 0px 5px #999; " +
		"position: fixed; left: 1em; top: 6em; z-index: 1; padding: 1em 2em 1em 1em;";
	document.body.appendChild(tooltip);    
}

function run() {
	checkLocation();
	var markup = document.documentElement.innerHTML;
	var collection = findCollection(markup);
	var resultString = null;

	if(collection == null) {
		var model = findModel(markup);
		var simpleModel = parseModelItems(model);
		resultString = JSON.stringify(simpleModel, null, 2);
		resultString = "<strong>Ticket info not yet available. Try later..." +
			"</strong>\n\n" + resultString;
	} else {
		var interestingCollection = [];
		collection.forEach(function(item) {
			interestingCollection.push(parseInteresting(item));
		});

		// Print results
		console.log(interestingCollection); // debug
		resultString = JSON.stringify(interestingCollection, null, 2);
		if(interestingCollection.length > 1) {
			resultString = "<strong>There are several ticket classes..." +
				"</strong>\n\n" + resultString;
		}
	}

	console.log(resultString);
	createResultTooltip(resultString);
}

run();

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
