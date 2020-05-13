/**
 * This script can be used to get Eventbrite event tickets. You must run it from the Eventbrite event page.
 * Change OPTIONS below to configure script parameters
 * 
 * The whole project can be found here: https://github.com/Dalimil/Eventbrite-Tools
 */
var stop = ((OPTIONS) => {
OPTIONS.ticketQuantity = 1; // How many tickets you want to buy? - WARNING: Often limited by the event organizer to 1

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

function findAll(needle, haystack) {
	const rx = new RegExp(needle, "g");
	const matches = [];
	while ((match = rx.exec(haystack)) !== null) {
		matches.push(match);
	}
	return matches;
}

function getTicket(data) {
	const ticketMatches = findAll("ticket_form_element_name\":\"([^\"]+)\"", data);
	// console.log(ticketMatches);
	return ticketMatches[OPTIONS.ticketIndex][1];
}

function isTicketAvailable(source) {
	// if the format changes and we get nulls, return true
	// mediator only applies to the current document status
	const mediator = require('mediatorjs');
	const ticketData = mediator && mediator.get('ticketOrderOptions');
	if (ticketData && ticketData.collection) {
		const ticket = ticketData.collection[OPTIONS.ticketIndex];
		if (ticket && (ticket.status_is_sold_out || ticket.status_is_ended)) {
			throw new Error("SOLD OUT: " + ticket.status_is_sold_out + " or ENDED: " + ticket.status_is_ended);
		}				
	}

	const notOnSale = findAll("\"not_on_sale\":(true|false)+", source);
	if (notOnSale[OPTIONS.ticketIndex] && notOnSale[OPTIONS.ticketIndex][1] == "true") {
		return false;
	}

	return true;
}

var scheduler = initScheduler();
var running = true;

function run() {
	checkLocation();
	$.get(location.href, (data) => {
		const ticket = getTicket(data);
		if (!ticket || !isTicketAvailable(data)) {
			console.log("Unsuccessful: " + (new Date()).toLocaleTimeString());
			if (running) {
				setTimeout(run, 1000);
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
return stop;
})({
	ticketIndex: 0, // There may be several ticket types in the list - set to 0 to select the first one
	startTime: "2020-05-19T15:59:55", // When should this script start checking for tickets (e.g. 5 seconds before official release time)
})
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
