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
	var pattern = /collection.*/g;
	var res = data.match(pattern);
	if(res == null || res.length == 0) {
		console.log(errorMsg);
	}
	var collectionText = '{' + res[0].replace("collection", '"collection"') + '}';

	var result = null;
	try {
		result = JSON.parse(collectionText);
	} catch(err) {
		console.log(errorMsg, err);
		throw err;
	}
	return result;
}


function run() {
	checkLocation();
	var markup = document.documentElement.innerHTML;
	var collection = findCollection(markup);
}

run();

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
