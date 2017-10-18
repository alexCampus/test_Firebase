// Initialize Firebase
let dbRef            = firebase.database().ref();
let countWinnerPlace = dbRef.child('countWinnerPlace/');
let count            = 0;
let name;
let user;
let userKey;

dbRef.once('value').then(function(snapshot){
	if (snapshot.numChildren() >= 19 ) {
		$('.input-group').addClass('hidden');
		$('#loader').removeClass('hidden');
	}
});
function getName() {
	name  = $('#name').val();
	if (name) {
		$('.input-group').addClass('hidden');
		$('#loader').removeClass('hidden');
		user =  dbRef.push({
			username: name,
			count   : 0,
			place   : 0
		});
		userKey = user.key;
	} else {
		location.reload();
	}
	
}
function writeUserData() {
	count +=20;

	dbRef.child('/' + userKey).update({
		count: count
	});
	user.once('value').then(function(snapshot) {
		
		count = snapshot.val().count;
		if (count >= 100) {
			countWinnerPlace.once('value').then(function(snap){
				$('#winnerPlace').append('<h1 id="h1"></h1>')
				$('#h1').text('Tu as la place N° ' + snap.val());
				user.update({
					place: snap.val()
				});
				dbRef.child('countWinnerPlace/').set(snap.val()+1);

			});
			$('#game').addClass('hiddenPlus');
			return;
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
		$('#h1').remove();
		count = 0;
		
	}
});