window.hideWarning = false;
window.addEventListener('beforeunload', (event) => {
    if (!hideWarning) {
        event.preventDefault();
        event.returnValue = '';
    }

});

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		console.log(user);
		id = user.uid;
		getinfo();
		
		// User is signed in.

	} else {
		// No user is signed in.
		document.location.href = "index.html";

	}
});

function getinfo() {
	console.log(id);
	var ref = firebase.database().ref().child("Student").child(id);
	ref.on("value", function (snap) {
		document.getElementById("Cname").value = snap.child('name').val();
		document.getElementById("phonen").value = snap.child('phoneNumber').val();
		document.getElementById("imgg").src = snap.child('img').val();
	});

}



function update() {
	var user = firebase.auth().currentUser;
	var newPassword = document.getElementById("pass").value;;
	var comfrimPass = document.getElementById("comPass").value;


	if ((newPassword && comfrimPass != null) && (newPassword === comfrimPass)) {
		user.updatePassword(newPassword).then(function () {
			console.log("done");


			ref = firebase.database().ref().child('Student').child(firebase.auth().currentUser.uid);

			ref.update({

				password: newPassword

			});


		}).catch(function (error) {
			// An error happened.
		});
	}

	var changname = document.getElementById("Cname").value;
	var pnum = document.getElementById("phonen").value;
	image();
	ref = firebase.database().ref().child('Student').child(firebase.auth().currentUser.uid);

	ref.update({
		name: changname,
		phoneNumber: pnum,

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
			ref = firebase.database().ref().child('Student').child(firebase.auth().currentUser.uid);

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