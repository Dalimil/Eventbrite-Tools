# Eventbrite Tools - Scripts and bots for Eventbrite

## Eventbrite Ticket Bot - ticket-getter.js

This bot is intended to be run a short time (a minute or two) before Eventbrite event tickets are released. Its main purpose is to secure tickets for events which are sold out within seconds after tickets are released. 

**Run this script only a short time before the tickets are released because it's quite aggresive in terms of its network activity.**

#### Usage
1. Open Firefox and navigate to your Eventbrite event
2. Open Scratchpad (Shift + F4) and Open file ticket-getter.js
3. Set `startTime` to the tickets opening time
4. Click Run
5. Call `stop();` from the console (press F12 to open) to quit



## EventBrite Ticket Notifier (advanced) - ticket-notifier.py

Eventbrite bot for checking event status and notifying the user by email when ticket status changes.

Simply change the python file to indicate which email address should be used and which events (URLs) should be periodically checked. You will receive an email notification when one of the Eventbrite events changes.

#### Usage
You can run it locally with 'python ticket-notifier.py' but the best thing to do is to find a server/IaaS where you can leave this running...
