var ticketPositionInList = 0 // There may be several ticket types - set to 0 to select the first one (or change accordingly)

if(location.href.indexOf("eventbrite") == -1){
	throw new Error("You must go to the Eventbrite event page and run the script from there!")
}


function post(path, params) {
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", path);

	for(var key in params) {
		if(params.hasOwnProperty(key)) {
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

function findAll(data, s){
	var rx = new RegExp(s, "g");
	var matches = new Array();
	while((match = rx.exec(data)) !== null){
		matches.push(match);
	}
	return matches;
}

function getTicket(data){
	ticketMatches = findAll(data, "ticket_form_element_name\":\"([^\"]+)\"");
	quantityMatches = findAll(data, "quantity_remaining\":([^,]+),");
	console.log(quantityMatches);
	console.log(ticketMatches);
	if(quantityMatches.length != ticketMatches.length){
		throw new Error("ERROR: No. of ticket types doesn't match ticket quantities data");
	}

	var ticket = "";
	for(var i = 0; i < quantityMatches.length; i++){
		var rem = parseInt(quantityMatches[i][1]);
		if(rem <= 0) continue;

		ticket = ticketMatches[i][1];
		if(ticketPositionInList <= 0){
			break;
		}
		ticketPositionInList -= 1; // valid ticket found so untick position
	}
	return ticket;
}

var repeat = null;
function run(){
	$.get(location.href, function( data ) {
		// console.log(data);
		ticket = getTicket(data);

		if(ticket == ""){
			console.log("Unsuccessful: "+(new Date()).toLocaleTimeString());
			repeat = setTimeout(run, 500);
			return;
		} else{
			var eid = $("form input[name=eid]").attr('value');
			console.log(ticket +" "+eid);
			var payload = {'eid': eid, 'has_javascript': 1};
			payload[ticket] = 1;
			console.log(payload);
			post("https://www.eventbrite.co.uk/orderstart", payload);
		}    
	});
}

function stop(){
	if(repeat == null) return;
	clearTimeout(repeat);
	repeat = null;
}

$( document ).ready(function() {
	run();
});

