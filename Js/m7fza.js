firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		console.log(user);


	} else {
		// No user is signed in.
		document.location.href = "index.html";

	}
});
function logout() {
	firebase.auth().signOut().then(logout => {

		window.alert("signed out");
		document.location.href = "Login&SignUp.html";
	}).catch(error => {});
}