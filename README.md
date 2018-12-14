# 112.camera
A very simple way for citizens to stream pictures to the 112 PSAP's

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
3. in config.js, maje peerjs_url point to the peer server (eg, on Heroku, see ShowMe)
4. in params.php, define TWILIO_SID and TWILIO_APIKEY for the TURN & STUN servers
5. ideally, make a domain name point to that folder, so that the user can call, say, domain.com/123456789

__Current structure__

 - All the files in the same folder (later, it shuold be professionalized)
 - server side: query.php & params.php
 - client side: 
   - iam.html for the citizen & psap.html for the PSAP
   - params.js & showme.js for common functions
 - .htaccess routes to iam.html or psap.html depending wether or not there is a number after the domain name
 
 
 

