eventUrl = "https://www.eventbrite.co.uk/e/how-will-we-power-the-uk-in-the-future-an-evening-with-prof-ian-stewart-and-sir-mark-walport-tickets-21446271375"
ticketPositionInList = 0 # There may be several ticket types - set to 0 to select the first one (or change accordingly)

import sys
import requests
import re

def abort():
	print("aborting...")
	sys.exit(0)


eid = eventUrl[eventUrl.rfind("-")+1:]

basic = requests.get(eventUrl).text
tickets = re.findall("ticket_form_element_name\":\"([^\"]+)\"", basic)
if(len(tickets) <= ticketPositionInList):
	print("Invalid ticket type - change: ticketPositionInList variable")
	abort()

ticket = tickets[ticketPositionInList]
print(tickets)

payload = {'eid': eid, 'has_javascript': 1, ticket: 1}
r = requests.post("https://www.eventbrite.co.uk/orderstart", data=payload)
#print(r.text.encode('utf-8'))
#print(r.cookies)
#source_id=e122b6cadba811e5898522000b5b866d&payment_type=free&legacy_event_page=1

#NOW GET
#https://www.eventbrite.co.uk/register?orderid=ea817350dba811e5ad2122000b488336&client_token=abcbe931dce34c62b80ebf6ed25c3297&eid=21446271375
