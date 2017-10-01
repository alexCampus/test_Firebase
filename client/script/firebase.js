// Initialize Firebase
var config = {

};

firebase.initializeApp(config);

let count = 0;
let name;

function getName() {
	name  = $('#name').val();
	console.log(name);
	$('.input-group').addClass('hidden');
	$('#game').removeClass('hidden');
}
function writeUserData(userId) {
	count++;
	firebase.database().ref('/' + name).set({
		username: name,
		count   : count
	});
}