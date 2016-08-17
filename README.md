# Eventbrite Tools - Scripts and Bots for Eventbrite

## EventBrite Ticket Info - [`ticket-info.js`](https://raw.githubusercontent.com/Dalimil/Eventbrite-Tools/master/ticket-info.js)

This script allows you to find all information about EventBrite event tickets in advance - their quantity, price and release date. It is even more useful when used in combination with the Eventbrite Bot described below (`ticket-getter.js`).

#### Usage
1. Open Firefox and navigate to your Eventbrite event
2. Open Scratchpad (Shift + F4) and Open file `ticket-info.js`
3. Click Run


## Eventbrite Ticket Bot - [`ticket-getter.js`](https://raw.githubusercontent.com/Dalimil/Eventbrite-Tools/master/ticket-getter.js)

This bot is intended to be run a short time (e.g. 10s) before Eventbrite event tickets are released (use `ticket-info.js` script described above to find the ticket release time). Its main purpose is to secure tickets for events which are sold out very quickly. 

**Run this script only a short time before the tickets are released because it's quite aggresive in terms of its network activity.**

#### Usage
1. Open Firefox and navigate to your Eventbrite event
2. Open Scratchpad (Shift + F4) and Open file `ticket-getter.js`
3. Set `startTime` to the tickets opening time
4. Click Run
5. Call `stop();` from the console (press F12 to open) to quit

