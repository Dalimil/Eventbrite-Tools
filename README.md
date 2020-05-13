# Eventbrite Tools - Scripts and Bots for Eventbrite

## Eventbrite Ticket Info - [`ticket-info.js`](https://raw.githubusercontent.com/Dalimil/Eventbrite-Tools/master/ticket-info.js)

This script allows you to find all information about Eventbrite event tickets in advance - their quantity, price and release date. It is even more useful when used in combination with the Eventbrite Bot described below (`ticket-getter.js`).

#### Usage
1. Open Chrome and navigate to your Eventbrite event
2. Open Developer Console (Option+⌘+J (on macOS), or Shift+CTRL+J (on Windows/Linux))
3. Copy paste `ticket-info.min.js` file contents and press Enter


## Eventbrite Ticket Bot - [`ticket-getter.js`](https://raw.githubusercontent.com/Dalimil/Eventbrite-Tools/master/ticket-getter.js)

This bot is intended to be run a short time (e.g. 10s) before Eventbrite event tickets are released (use the `ticket-info.js` script described above to find the ticket release time). Its main purpose is to redirect your browser to the checkout page as quickly as possible, thus securing tickets for events which are sold out very quickly. 

**Use the startTime script option to run it only a short time before the tickets are released because it's quite aggresive in terms of its network activity, and you don't want Eventbrite to ban you.**

#### Usage
1. Open Chrome and navigate to your Eventbrite event
2. Open Developer Console (Option+⌘+J (on macOS), or Shift+CTRL+J (on Windows/Linux))
3. Copy paste `ticket-getter.min.js` file contents
4. Set `startTime` to the tickets opening time and then press Enter
5. Now just watch progress, or type `stop()` to quit

## Screenshots
This is what the pop-up that `ticket-info.js` script generates looks like:

![Eventbrite ticket-info.js popup #1 - Dalimil Hajek](https://github.com/Dalimil/Eventbrite-Tools/blob/master/screenshots/event_tickets_second.png)

You always know when the ticket sales start and how many tickets are going to be released:

![Eventbrite ticket-info.js popup #2 - Dalimil Hajek](https://github.com/Dalimil/Eventbrite-Tools/blob/master/screenshots/event_unavailable.png)

It gives you an idea of how many people are going to attend (no more tricks from the organizers):

![Eventbrite ticket-info.js popup #3 - Dalimil Hajek](https://github.com/Dalimil/Eventbrite-Tools/blob/master/screenshots/event_tickets_first.png)


## Bugs and Issues
1. There are two types of layout for Eventbrite event pages. Both scripts only work for events whose Eventbrite page contains a big header image (see screenshots) - this is the type that you will see most often. Neither script will work for events that list tickets and prices in a table - see https://github.com/Dalimil/Eventbrite-Tools/issues/3#issuecomment-256580440.
2. Ticket-Info script used to obtain more information about ticket quantity. Eventbrite added this JSON to each ticket collection object and the fields are no longer accessible: `"json_blacklist_set": ["event_level_info", "quantity_sold", "quantity_remaining", "request", "quantity_total", "waitlist_settings"]`. Can someone figure this out? (Also see our partial workaround: https://github.com/Dalimil/Eventbrite-Tools/issues/4)
3. Someone should set-up minification automation for the scripts instead of manually using https://skalman.github.io/UglifyJS-online/

**Pull requests welcome.**
