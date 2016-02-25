# Eventbrite Tools - Scripts and bots for Eventbrite

## Eventbrite Ticket Bot - ticket-getter.js

This bot is intended to be run a short time (a minute or two) before Eventbrite event tickets are released. Its main purpose is to secure tickets for events which are sold out within seconds after tickets are released. 

**Run this script only a short time before the tickets are released because it's quite aggresive in terms of its network activity.**

#### Usage
1. Open Firefox and navigate to your Eventbrite event
2. Open Scratchpad (Shift + F4) and Open file ticket-getter.js
3. Click Run
4. Call stop(); from the console to quit (try several times if not working) 



## EventBrite Ticket Notifier - ticket-notifier.py

Eventbrite bot for checking event status and notifying the user by email when ticket status changes.

Simply change the python file to indicate which email address should be used and which events (URLs) should be periodically checked. You will receive an email notification when one of the Eventbrite events changes.

I like to run this on http://c9.io/ (but you can also run it locally with 'python notifier.py').

#### TODO
Unfortunately, Cloud9 stops all processes after 2 hours. 

> Since Cloud9 workspaces are intended for active development (not production or other users), different actions are taken on workspaces after certain times of inactivity.
> Workspaces must be accessed via the IDE in order to be considered active again. Accessing a preview of the application or even the admin panel of a Wordpress install is not considered active.

**TODO: Create a script to access its own workspace to renew the 'timeout'.**
