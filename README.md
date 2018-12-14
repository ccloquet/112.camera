# 112.camera
A very simple way for citizens to stream pictures to the 112 PSAP's

This is only intended for test & demo purposes. https://github.com/ccloquet/showme, or a complete integration in existing tools would be better alternatives (easier fot the citizens & the dispatchers).

__Working__

The citizen (most probably a trained citizen) 
1. calls the 112/911 and describes his/her emergency situation
2. tells the dispatch that a live streaming will be available from 112.camera/his-her-phone-number (eg: 112.camera/123456789)
3. opens 112.camera.
4. enters his/her phone number in international format.
5. presses on GO.

The PSAP
6. opens 112.camera/his-hier phone-number (eg: 112.camera/123456789)

__Installation__

1. copy the file in a directory on your server
2. in .htaccess, replace the /light/ by your folder. Pay attention to the HSTS config, and if not sure, remove it
3. in config.js, maje peerjs_url point to the peer server (eg, on Heroku, see below)
4. in params.php, define TWILIO_SID and TWILIO_APIKEY for the TURN & STUN servers
5. ideally, make a domain name point to that folder, so that the user can call, say, domain.com/123456789

- a Peer Server is needed to use the video set up. You can deploy yours on Heroku using : https://elements.heroku.com/buttons/peers/peerjs-server. The cloud server provided by peerJS is not suitable as it does not support https and there is a risk of identifiers collision. The Heroku server should be dimensioned taking into account the forecasted usage.

- for real world use cases, a STUN & a TURN server is needed. This example uses Twilio's. See eg: https://peerjs.com/docs/#api, https://www.avaya.com/blogs/archives/2014/08/understanding-webrtc-media-connections-ice-stun-and-turn.html & https://www.html5rocks.com/en/tutorials/webrtc/infrastructure, https://www.twilio.com/stun-turn. STUN Server usage is free, but TURN is not.

__Current structure__

 - All the files in the same folder (later, it shuold be professionalized)
 - server side: query.php & params.php
 - client side: 
   - iam.html for the citizen & psap.html for the PSAP
   - params.js & showme.js for common functions
 - .htaccess routes to iam.html or psap.html depending wether or not there is a number after the domain name:
   - 112.camera/ -> iam.html
   - 112.camera/123456789 -> psap.html
 
 __Dependencies__ (automaticallly loaded from CDN)
  - peerjs
  - jQuery
  - fontAwesome
 
See discussions on https://github.com/ccloquet/showme for non-technical issues
