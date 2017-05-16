/**
 * This script can be used to get Eventbrite event tickets. You must run it from the Eventbrite event page.
 * Change OPTIONS below to configure script parameters
 * 
 * The whole project can be found here: https://github.com/Dalimil/Eventbrite-Tools
 */

var OPTIONS = {
	startTime: "2017-06-18T15:59:55", // When should this script start checking for tickets (e.g. 5 seconds before official release time)
	ticketIndex: 0, // There may be several ticket types in the list - set to 0 to select the first one
	ticketQuantity: 1 // How many tickets you want to buy? - WARNING: Often limited by the event organizer to 1
};

function checkLocation() {
	if (location.href.indexOf("eventbrite") == -1) {
		const errmsg = "You must go to the Eventbrite event page and run the script from there!";
		console.error(errmsg);
		throw new Error(errmsg);
	}
}

function post(path, params) {
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", path);

	for (var key in params) {
		if (params.hasOwnProperty(key)) {
			var hiddenField = document.createElement("input");
			hiddenField.setAttribute("type", "hidden");
			hiddenField.setAttribute("name", key);
			hiddenField.setAttribute("value", params[key]);
			form.appendChild(hiddenField);
		}
	}
	document.body.appendChild(form);
	form.submit();
}

function getTicket(data) {
	const findAll = (s) => {
		const rx = new RegExp(s, "g");
		const matches = [];
		while ((match = rx.exec(data)) !== null) {
			matches.push(match);
		}
		return matches;
	};
	const ticketMatches = findAll("ticket_form_element_name\":\"([^\"]+)\"");
	console.log(ticketMatches);
	return ticketMatches[OPTIONS.ticketIndex][1];
}

var scheduler = initScheduler();
var running = true;

function run() {
	checkLocation();
	$.get(location.href, (data) => {
		// console.log(data);
		const ticket = getTicket(data);
		if (!ticket) {
			console.log("Unsuccessful: " + (new Date()).toLocaleTimeString());
			if (running) {
				setTimeout(run, 500);
			}
			return;
		}
		const payload = {
			'eid': $("form input[name=eid]").attr('value'),
			'has_javascript': 1,
			[ticket]: OPTIONS.ticketQuantity
		};
		console.log(payload);
		post("https://www.eventbrite.co.uk/orderstart", payload);
	});
}

function stop() {
	if (!running) {
		return "Already stopped";
	}
	running = false;
	return "Stopped";
}

function initScheduler() {
	if (typeof scheduler !== 'undefined') {
		clearTimeout(scheduler); // when re-run
	}
	return null;
}

$(document).ready(function() {
	checkLocation();
	const diff = Date.parse(OPTIONS.startTime) - Date.now();
	const timeToStart = Math.max(0, diff || 0);
	console.log(`Scheduled start in:` +
		`${Math.floor(timeToStart / (1000 * 60))}m ` +
		`${Math.floor(timeToStart / 1000)%60}s`);

	scheduler = setTimeout(run, timeToStart);
});

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
