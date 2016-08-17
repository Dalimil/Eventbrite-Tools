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

function findCollection(data) {
	var errorMsg = "Eventbrite changed something and broke my script. Please let me know.";
	var pattern = /collection[\s:]+\[{.*/g;
	var res = data.match(pattern);
	if(res == null || res.length == 0) {
		console.log(errorMsg);
	}
	var collectionText = '{' + res[0].replace("collection", '"collection"') + '}';
	collectionText = collectionText.replace(/\t/g, '');

	var result = null;
	try {
		result = JSON.parse(collectionText);
	} catch(err) {
		console.log(errorMsg, err);
		throw err;
	}
	return result.collection;
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

function run() {
	checkLocation();
	var markup = document.documentElement.innerHTML;
	var collection = findCollection(markup);
	if(collection == null) return;

	var interestingCollection = [];
	collection.forEach(function(item) {
		interestingCollection.push(parseInteresting(item));
	});
	console.log(interestingCollection);
	console.log(JSON.stringify(interestingCollection, null, 2));
}

run();

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
