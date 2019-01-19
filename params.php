<?php

	define('TWILIO_SID', 				'***');	// Twilio : for TURN & STUN servers (always) 
	define('TWILIO_APIKEY', 			'***');

	define('MAX_ATTEMPTS_PER_IP_PER_24_HOURS', 	20);	// this may be too few for a call center, but they can ask to be whitelisted
	define('EMAIL_WEBHOOK', 			'***');	// for reporting

	$blacklist 					= [];	// a list of ipv4 ips to ban - blacklist take the precedence on whitelist
	$whitelist 					= [];	// a list of ipv4 ips to allow anyway
 
?>
