# Eventbrite-Notifier
Receive an email notification when an Eventbrite event changes.

Simply change main.py file to indicate which email address should be used and which events (URLs) should be periodically checked.

I like to run this on http://c9.io/ (but you can also run it locally with 'python notifier.py').

## TODO
Unfortunately, Cloud9 stops all processes after 2 hours. 

> Since Cloud9 workspaces are intended for active development (not production or other users), different actions are taken on workspaces after certain times of inactivity.
> Workspaces must be accessed via the IDE in order to be considered active again. Accessing a preview of the application or even the admin panel of a Wordpress install is not considered active.

**TODO: Create a script to access its own workspace to renew the 'timeout'.**

# Eventbrite-Ticket-Getter
Run it with 'python ticket-getter.py'. Run this script only a short time before the tickets are released because its quite aggresive in terms of its network activity.

Change eventUrl and ticketPositionInList variables before running it.
