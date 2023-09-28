firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		// User is signed in, see docs for a list of available properties
		// https://firebase.google.com/docs/reference/js/firebase.User
		var id = user.uid;
		console.log(firebase.auth().currentUser.uid);
		
		getgeneralinfo();
	} else {
		console.log("dwedwe");
		document.location.href="index.html";
	}
});
window.hideWarning = false;
window.addEventListener('beforeunload', (event) => {
    if (!hideWarning) {
        event.preventDefault();
        event.returnValue = '';
    }

});


function getgeneralinfo() {
	var ref = firebase.database().ref().child("teachers").child(firebase.auth().currentUser.uid);
	ref.on("value", function (snap) {
		document.getElementById("Cbio").value = snap.child('discription').val();
		document.getElementById("Cname").value = snap.child('name').val();
		
		document.getElementById("imgg").src =snap.child('img').val();

	});

}


function update() {
	var user = firebase.auth().currentUser;
	var newPassword = document.getElementById("pass").value;;
	var comfrimPass = document.getElementById("comPass").value;


	if ((newPassword && comfrimPass != null) && (newPassword === comfrimPass)) {
		
		user.updatePassword(newPassword).then(function () {
			console.log("done");
			
			
			ref = firebase.database().ref().child('teachers').child(firebase.auth().currentUser.uid);
			console.log(newPassword);
			ref.update({
		password: newPassword
		

	});
			
		}).catch(function (error) {
			// An error happened.
		});
	}
	var changbio = document.getElementById("Cbio").value;
	var changname = document.getElementById("Cname").value;

	if(document.getElementById("img").value!="")
	image();
	ref = firebase.database().ref().child('teachers').child(firebase.auth().currentUser.uid);

	ref.update({
		name: changname,
		discription: changbio,

	});
alert("تم تعديل البيانات");
	setTimeout(function(){ location.reload(); }, 3000);


}

function image() {

	var fileUpload = document.getElementById("img").files[0];
	var imgname = fileUpload.name;
	var storageRef = firebase.storage().ref('photos/' + imgname);
	var uploadTask = storageRef.put(fileUpload);

	uploadTask.on('state_changed', function (snapshot) {
		var prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		console.log("uploas is " + prog + "done");
document.getElementById("bar").value = prog;
	}, function (erorr) {
		console.log(erorr.message);
	}, function () {
		uploadTask.snapshot.ref.getDownloadURL().then(function (downloadUrl) {
			console.log(downloadUrl);
			ref = firebase.database().ref().child('teachers').child(firebase.auth().currentUser.uid);
console.log(downloadUrl);
			ref.update({
				img: downloadUrl
			});
		})
	});

}

function logout() {
	firebase.auth().signOut().then(logout => {

		window.alert("signed out");
		document.location.href = "Login&SignUp.html";
	}).catch(error => {});
}