// Initialize Firebase
  var config = {
  	apiKey: "AIzaSyAlJ1vxffN49vHV2N87n4GRha9tjIzHNds",
    authDomain: "humantalks-firebase.firebaseapp.com",
    databaseURL: "https://humantalks-firebase.firebaseio.com",
    projectId: "humantalks-firebase",
    storageBucket: "humantalks-firebase.appspot.com",
    messagingSenderId: "368564411937"
  };
  firebase.initializeApp(config);

let current_progress = 0;
let dbRef            = firebase.database().ref();
let countWinnerPlace = dbRef.child('countWinnerPlace/');

dbRef.on('value', function(snapshot) {
	$('.game').empty();
  	console.log(snapshot.val());
  	$.each(snapshot.val(), function(index, value){
  		if (value.count != undefined) {
	  		$('.game').append('<div class="progress align-self-center" id="' + value.username + '">');
	  		$('#' + value.username).before('<h1>' + value.username + '</h1>');
	  		$('#' + value.username).append('<div id="dynamic_'+ value.username +'" class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%">');
			$('#dynamic_' + value.username).append('<span id="current-progress_"' + value.username + '></span>'); 	  	
	  		console.log(value.count);
		  	current_progress = value.count;
		  	$("#dynamic_" + value.username)
		      	.css("width", current_progress + "%")
		      	.attr("aria-valuenow", current_progress)
		      	.text(current_progress + "% Complete");

		    	if (current_progress >= 100) {
		    		$("#dynamic_" + value.username).addClass('hidden');
		    		$('#' + value.username).after('<h2>' + value.place + '</h2>');
		    	}
  			
  		}
  	});

});

	function startGame() {
	  dbRef.child('startGame/').set(true);
	  dbRef.child('countWinnerPlace/').set(1);
	  $('#startGame').addClass('hidden');
	  $('#endGame').removeClass('hidden');
	}

	function endGame() {
	  dbRef.remove();
	  dbRef.child('startGame/').set(false);
	  $('#endGame').addClass('hidden');
	  $('#startGame').removeClass('hidden');
	}
