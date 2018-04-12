/**
 * This script can be used to get Eventbrite event ticket info. It must be run from an Eventbrite event page.
 * The whole project can be found here: https://github.com/Dalimil/Eventbrite-Tools
 */

function checkLocation() {
	if (location.href.indexOf("eventbrite") == -1) {
		const errmsg = "You must go to the Eventbrite event page and run the script from there!";
		console.error(errmsg);
		throw new Error(errmsg);
	}
}

function parseMediatorData(data) {
	return data.collection.map(function(item) {
		return {
			"name": item.ticket_name,
			"quantity": {
				//"quantity_total": collectionItem.quantity_total,
				//"quantity_sold": collectionItem.quantity_sold,
				"quantity_remaining": item.number_of_tickets_remaining
			},
			"cost": item.is_free ? "Free" :
				(item.total_cost == null ? item.ticket_price : item.total_cost.display),
			"status": {
				"status_is_sold_out": item.status_is_sold_out,
				"status_is_ended": item.status_is_ended,
				"status_not_yet_started": item.not_yet_started,
				"on_sale_status": item.on_sale_status
			},
			"dates": {
				"sales_start": new Date(item.start_sales).toLocaleString(),
				"sales_end": new Date(item.end_sales).toLocaleString()
			}
		};
	});
}

function createResultTooltip(data) {
	const id = "tooltip-custom-event-info";
	let tooltip = document.getElementById(id);
	if(tooltip != null) {
		// Destroy previous
		document.body.removeChild(tooltip);
	}
	tooltip = document.createElement("div");
	tooltip.id = id;
	
	tooltip.style.cssText = "width: 40%; max-height: 75%; white-space: pre; overflow-y: auto; " +
		"background-color: #333; color: #EEE; border-radius: 6px; box-shadow: 0px 0px 5px #999; " +
		"position: fixed; left: 1em; top: 6em; z-index: 10001; padding: 1em 2em 1em 1em;";

	const closeButton = document.createElement("a");
	closeButton.innerHTML = "&times;";
	closeButton.href = "javascript:void(0)";
	closeButton.onclick = function() { document.body.removeChild(this.parentElement); };
	closeButton.style = "float: right; font-weight: bold; font-size: 2.5em; line-height: 1em;" +
		"position: fixed; left: 40%";

	const content = document.createElement("div");
	content.innerHTML = data;

	tooltip.appendChild(closeButton);
	tooltip.appendChild(content);
	document.body.appendChild(tooltip);    
}

function getQuantities(source) {
	const quantities = source.match(/\"inventoryLevel\":[0-9]+/g);
	if (!quantities) {
		return [];
	}
	return quantities.map(s => s.replace(/"inventoryLevel":/, ""));
}

function run() {
	checkLocation();
	let resultString = null;
	const mediator = require('mediatorjs');
	const data = mediator && mediator.get('ticketOrderOptions');
	if (data) {
		const quantities = getQuantities(document.documentElement.innerHTML);
		if (quantities.length == data.collection.length) {
			data.collection.forEach((item, ind) => {
				item.number_of_tickets_remaining = item.number_of_tickets_remaining || quantities[ind];
			});
		}
		const parsedInfos = parseMediatorData(data);
		resultString = JSON.stringify(parsedInfos, null, 2);
		if(parsedInfos.length > 1) {
			resultString = "<strong>There are several ticket classes..." +
				"</strong>\n\n" + resultString;
		}
	} else {
		resultString = "Unable to retrieve ticket information. Eventbrite must have changed their code..."
	}
	console.log(resultString);
	createResultTooltip(resultString);
}

run();

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
