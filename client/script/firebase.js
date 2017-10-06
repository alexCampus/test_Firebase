// Initialize Firebase
let dbRef            = firebase.database().ref();
let countWinnerPlace = dbRef.child('countWinnerPlace/');
let count            = 0;
let name;
let user;
let userKey;

dbRef.once('value').then(function(snapshot){
	console.log("There are "+snapshot.numChildren()+" messages");
	if (snapshot.numChildren() >= 23 ) {
		$('.input-group').addClass('hidden');
		$('#loader').removeClass('hidden');
	}
});
function getName() {
	name  = $('#name').val();
	console.log(name);
	$('.input-group').addClass('hidden');
	$('#loader').removeClass('hidden');
	user =  dbRef.push({
		username: name,
		count   : 0,
		place   : 0
	});
	userKey = user.key;
}
function writeUserData() {
	count ++;

	dbRef.child('/' + userKey).update({
		count: count
	});
	user.once('value').then(function(snapshot) {
		
		count = snapshot.val().count;
		if (count >= 100) {
			countWinnerPlace.once('value').then(function(snap){
				console.log(snap.val());
				$('#loader').after('<h1>' + snap.val() + '</h1>');
				user.update({
					place: snap.val()
				});
				dbRef.child('countWinnerPlace/').set(snap.val()+1);

			});
			$('#game').addClass('hiddenPlus');
			// $('#loader').removeClass('hidden');
		}
	})
}

var startGame = dbRef.child('/startGame');

startGame.on('value', function(snapshot) {
	if (snapshot.val() === true) {
		$('#loader').addClass('hidden');
		$('#game').removeClass('hiddenPlus');
	} 
	if (snapshot.val() === false) {
		$('#game').addClass('hiddenPlus');
		$('.input-group').removeClass('hidden');
		
	}
	console.log(snapshot.val());
});