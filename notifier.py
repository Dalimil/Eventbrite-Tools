import smtplib
import requests
import threading
import re
import datetime

interested = [
  "https://www.eventbrite.co.uk/e/games-night-tickets-21304932627", 
  "https://www.eventbrite.com/e/gather-ceilidh-country-and-contra-dance-with-new-scotland-country-dance-tickets-19920158731"]
  
state = []

def get_state(s):
  return re.findall("micro-ticket-box__btn[^>]+>([^<]+)</a>", s)[0]
  
def init():
  global state
  for i in interested:
    k = requests.get(i).text
    state.append(get_state(k))

def check():
  global state
  threading.Timer(30, check).start() #every 30s
  for i in range(len(interested)):
    k = requests.get(interested[i]).text
    st = get_state(k)
    if(state[i] != st):
      s = ("One of your events has changed its status from "+state[i]+" to "+st+" ("+interested[i][interested[i].find("/e/"):]+")")
      print(s)
      state[i] = st
      sendMail(s)
        
  print(state)
  print(datetime.datetime.now())
  
def sendMail(text):
  to = ["your-email@example.com"]
  # http://www.mailgun.com/ is used for sending emails
  requests.post("https://api.mailgun.net/v3/samples.mailgun.org/messages",
        auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"),
        data={"from": "Eventbrite Notifier <excited@samples.mailgun.org>", 
        "to": to, "subject": "Eventbrite ticket notification", "text": text})
  
  
if __name__ == '__main__':
  init()
  check()
  #sendMail("This is a simple test")
  
  
