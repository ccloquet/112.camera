<?php

	require_once ('params.php');

	$result = [];

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
			}
		break;
	 
		default:
			$result = ['message'=>'error'];
	}

	echo json_encode($result);
	
?>
