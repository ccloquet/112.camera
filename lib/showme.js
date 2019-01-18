
// -----------------------------------------------------
// HELPER LIBRARY FOR POPPY SHOW ME & 112.CAMERA
// -----------------------------------------------------


	// bcz Internet Explorer does not support new URL()
	// https://stackoverflow.com/questions/48447629/new-urllocation-href-doesnt-work-in-ie
	function get_userid()
	{
		var i=0, i0=-1; while (i>=0) {i0=i; i = location.href.indexOf('/', i0+1); }; 
		return parseInt(location.href.substr(i0+1));
		// parseInt : to sanitize the input (must be a phone number)
	}

	function get_params()
	{
		var href_url = window.location.href;	
		var obj_url  = parseUri(href_url);
		return obj_url.queryKey
	}

	// parseUri 1.2.2
	// (c) Steven Levithan <stevenlevithan.com>
	// MIT License

	function parseUri (str) 
	{
		var	o   = parseUri.options,
			m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
			uri = {},
			i   = 14;

		while (i--) uri[o.key[i]] = m[i] || "";

		uri[o.q.name] = {};
		uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
			if ($1) uri[o.q.name][$1] = $2;
		});

		return uri;
	};

	parseUri.options = 
	{
		strictMode: false,
		key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
		q:   {	
			name:   "queryKey",
			parser: /(?:^|&)([^&=]*)=?([^&]*)/g
		},
		parser: {
			strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
			loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
		}
	};

	// end parseUri

	function error_msg(txt)
	{
		if (txt == null)
		{
			txt = 'An error occured<br>Reload the page';
		}
		$('#waiting').html(txt).removeClass('blink_me').show()
	}

	function hasGetUserMedia() 
	{
		return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
	}

	//https://github.com/peers/peerjs/issues/227
	// pass the peer instance, and it will start sending heartbeats

	// stop them later
	// heartbeater.stop();

	function makePeerHeartbeater ( peer ) {
	    var timeoutId = 0;
	    function heartbeat () {
        	timeoutId = setTimeout( heartbeat, 10000 );
	        if ( peer.socket._wsOpen() ) {
        	    peer.socket.send( {type:'HEARTBEAT'} );
	        }
	    }
	    // Start 
	    heartbeat();
	    // return
	    return {
	        start : function () {
	            if ( timeoutId === 0 ) { heartbeat(); }
	        },
	        stop : function () {
	            clearTimeout( timeoutId );
	            timeoutId = 0;
	        }
	    };
	}

	// function: destroys peer & mediastream
	function peer_destroy(peer, video, callback)
	{
		if (peer !== null) 
		{
			peer.destroy()	 
		}

		var stream = video.srcObject;
		var tracks = stream.getTracks();  
	 
		for (var i=0; i<tracks.length; ++i) 
		{
			tracks[i].stop();
		}
		callback();
	}

	function validate_userid(u)				// if to validate ohone number, should ne more elaborate
	{
		if (  (u < 1000000 ) | (u > 999999999999999)  )
		{
			return false;
		}
	
		return true;
	}


