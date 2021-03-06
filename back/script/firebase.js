// Initialize Firebase
let current_progress = 0;
let dbRef            = firebase.database().ref();
let countWinnerPlace = dbRef.child('countWinnerPlace/');

dbRef.on('value', function(snapshot) {
	$('.game').empty();
  	console.log(snapshot.val());
  	$.each(snapshot.val(), function(index, value){
  		if (value.count != undefined) {
  			$('.game').append('<div class="row" id="row_' + value.username + '" style="margin-left:1%">');
	  		$('#row_'+ value.username).append('<div class="progress align-self-center" id="' + value.username + '">');
	  		$('#' + value.username).before('<h1 style="width:6%">' + value.username + '</h1>');
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
		    		$('#' + value.username).after('<h2 style="color: green">' + value.place + '</h2>');
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
