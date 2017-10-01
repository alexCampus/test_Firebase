// Initialize Firebase
  var config = {
   
  };
  firebase.initializeApp(config);

let current_progress = 0;
var userCountRef = firebase.database().ref();

userCountRef.on('value', function(snapshot) {
	$('.game').empty();
  	console.log(snapshot.val());
  	$.each(snapshot.val(), function(index, value){
  		$('.game').append('<div class="progress align-self-center" id="' + value.username + '">');
  		$('#' + value.username).append('<h1>' + value.username + '</h1>');
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
	    	}
  	});

});