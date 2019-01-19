<?php

	require_once ('params.php');

	$result  				= [];
	$Ymd     				= date("Ymd");
	$logname 				= $Ymd .'.log';
	$remoteip 				= $_SERVER['REMOTE_ADDR'];

 	// --------------------------------------------------------------------------------------------
	// SECURITY - if the ip is in the blacklist, do not grant the ICE servers
 	// --------------------------------------------------------------------------------------------
	if (in_array($remoteip, $blacklist))
	{
		exit_error($logname, 'error');
	}

 	// --------------------------------------------------------------------------------------------
	// SECURITY - if not in the white list, throttle
 	// --------------------------------------------------------------------------------------------
	if (!in_array($remoteip, $whitelist))
	{
		// if too many connections for this ip today, do not grant the
		$csv 	  = array_map( function($input){ return str_getcsv($input, '#');}, file($logname));
		$attempts = 0;

		foreach ($csv as $row) 
		{
			if (trim($row[2]) == $remoteip)
			{
				++$attempts;
			}
		}

		if ($attemps  > 3)
		{
			log_attempt($logname, 'THIRD_TODAY');
		}
	
		if ($attempts > MAX_ATTEMPTS_PER_IP_PER_24_HOURS) 
		{
			exit_error($logname, 'too_many_attempts');
		}
	}

 	// --------------------------------------------------------------------------------------------
	// CORE of the query
 	// --------------------------------------------------------------------------------------------

	switch($_POST['action'])
	{
		case 'get_ice_servers':
			
			$fields =  ["TTl"=> '600'];			// this token : max 10 min 
			$ch 	= curl_init();

			curl_setopt($ch, CURLOPT_URL, 			'https://api.twilio.com/2010-04-01/Accounts/'.TWILIO_SID.'/Tokens.json');
			curl_setopt($ch, CURLOPT_POST, 			TRUE);
			curl_setopt($ch, CURLOPT_USERPWD, 		TWILIO_SID . ':' . TWILIO_APIKEY);
			curl_setopt($ch, CURLOPT_HTTPAUTH, 		CURLAUTH_BASIC);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER,  	1);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER,  	false);
		        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST,  	0);
			curl_setopt($ch, CURLOPT_POSTFIELDS,     	http_build_query($fields));

			$ret 	= curl_exec($ch);

			curl_close($ch);

			if ($ret != null)
			{
				$ret    = json_decode($ret, true);
				$result = ['ice_servers' => $ret["ice_servers"]];
				exit_ok($logname, $result);
			}
			else
			{
				exit_error($logname, 'unknown_error');
			}
			
		break;
	 
		default:
			 exit_error($logname, 'unknown_action');
	}

 	// --------------------------------------------------------------------------------------------
	// SECURITY -- log and report
 	// --------------------------------------------------------------------------------------------
	function log_attempt($logname, $result_txt)
	{
		file_get_contents(EMAIL_WEBHOOK . '?value1='.$result_txt);	// to get notified very easily -- in production, should find smth more professional
		error_log(time() . ' # ' . date("Y-m-d H:i:s") . ' # ' . $_SERVER['REMOTE_ADDR'] . ' # ' . $_SERVER['REMOTE_HOST'] . ' # ' . $_SERVER['HTTP_USER_AGENT'] . ' # ' . $result_txt . PHP_EOL, 3, $logname);	 
	}

 	// --------------------------------------------------------------------------------------------
	// exit functions
 	// --------------------------------------------------------------------------------------------
	function exit_error($logname, $error_txt)
	{
		log_attempt($logname, 'TURN_REFUSED');
		die(json_encode( ['message'=>$error_txt]));
	}

	function exit_ok($logname, $result)
	{
		log_attempt($logname, 'TURN_GRANTED');
		die(json_encode($result));
	}
	
?>
