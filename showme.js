	// bcz Internet Explorer does not support new URL()
	// https://stackoverflow.com/questions/48447629/new-urllocation-href-doesnt-work-in-ie
	function get_userid()
	{
		var i=0, i0=-1; while (i>=0) {i0=i; i = location.href.indexOf('/', i0+1); }; 
		return parseInt(location.href.substr(i0+1))
	}

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
	function peer_destroy(callback)
	{
		if (peer !== null) 
		{
			peer.destroy()
		}
		peer 		= null

		var stream = video.srcObject;
		var tracks = stream.getTracks();  
	 
		for (var i=0; i<tracks.length; ++i) 
		{
			tracks[i].stop();
		}
		callback();
	}

	function validate_userid(u)
	{
		if (  (u < 1000000 ) | (u > 999999999999999)  )
		{
			return false;
		}
	
		return true;
	}


