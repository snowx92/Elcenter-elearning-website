var actualBtn = document.getElementById('actual-btn');

var fileChosen = document.getElementById('file-chosen');

/*actualBtn.addEventListener('change', function(){
  fileChosen.textContent = this.files[0].name
});*/
window.hideWarning = false;
window.addEventListener('beforeunload', (event) => {
	if (!hideWarning) {
		event.preventDefault();
		event.returnValue = '';
	}

});

function image2() {

	var fileUpload = document.getElementById("img").files[0];
	
		if(fileUpload==null){
		

			ref = firebase.database().ref().child(i).child(i + firebase.auth().currentUser.uid);

			ref.update({
				img: "https://firebasestorage.googleapis.com/v0/b/oxford-web-edu.appspot.com/o/photos%2Fdownload.png?alt=media&token=14ac79ed-4add-461f-a465-f5e597e49a10"
			});
		
	
return
		
	}
	
	
	var imgname = fileUpload.name;
	var storageRef = firebase.storage().ref('photos/' + imgname);
	var uploadTask = storageRef.put(fileUpload);
	if (imgname == null) {
		return;
	}

	uploadTask.on('state_changed', function (snapshot) {
		var prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		console.log("uploas is " + prog + "done");
		document.getElementById("bar").value = prog;
	}, function (erorr) {
		console.log(erorr.message);
	}, function () {
		uploadTask.snapshot.ref.getDownloadURL().then(function (downloadUrl) {
			console.log(downloadUrl);
			ref = firebase.database().ref().child("teachers").child(firebase.auth().currentUser.uid);

			ref.update({
				img: downloadUrl
			});
			reff = firebase.database().ref().child("users").child(firebase.auth().currentUser.uid);

			ref.update({
				img: downloadUrl
			});
		})
	});

}

function image(i) {

	var fileUpload = document.getElementById("img").files[0];
	
	if(fileUpload==null){
		

			ref = firebase.database().ref().child(i).child(i + firebase.auth().currentUser.uid);

			ref.update({
				img: "https://firebasestorage.googleapis.com/v0/b/oxford-web-edu.appspot.com/o/photos%2Fdownload.png?alt=media&token=14ac79ed-4add-461f-a465-f5e597e49a10"
			});
		
	
return
		
	}
	
	var imgname = fileUpload.name;
	var storageRef = firebase.storage().ref('photos/' + imgname);
	var uploadTask = storageRef.put(fileUpload);
	if (imgname == null) {
		return;
	}

	uploadTask.on('state_changed', function (snapshot) {
		var prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		console.log("uploas is " + prog + "done");

	}, function (erorr) {
		console.log(erorr.message);
	}, function () {
		uploadTask.snapshot.ref.getDownloadURL().then(function (downloadUrl) {
			console.log(downloadUrl);
			ref = firebase.database().ref().child(i).child(i + firebase.auth().currentUser.uid);

			ref.update({
				img: downloadUrl
			});
		})
	});

}



function addteacher() {

	image2();
	var email = document.getElementById("TeacherEmail").value;
	var pass = document.getElementById("TeacherPass").value;

	var name1 = document.getElementById("name").value;

	var subject1 = document.getElementById("subject").value;
	var discription1 = document.getElementById("discription").value;

	var firstSC1 = document.getElementById("1secondry").checked;
	var secondtSC1 = document.getElementById("2secondry").checked;
	var thirdSC1 = document.getElementById("3secondry").checked;
	var firstHI1 = document.getElementById("1highschool").checked;
	var secondHI1 = document.getElementById("2highschool").checked;
	var thirdHI1 = document.getElementById("3highschool").checked;

	console.log(email);
	console.log(pass);
	console.log(name1);
	console.log(subject1);
	console.log(discription1);
	console.log(firstHI1);
	console.log(firstSC1);
	console.log(secondHI1);
	console.log(secondtSC1);
	console.log(thirdHI1);
	console.log(thirdSC1);

	if ((email == "" || pass == "" || name1 == "" || discription1 == "") || (firstHI1 == false && secondtSC1 == false && thirdSC1 == false && firstHI1 == false && secondHI1 == false && thirdHI1 == false)) {
		alert("الرجاء اكمال بيانات المعلم");
		return;
	}

	firebase.auth().createUserWithEmailAndPassword(email, pass)
		.then((user) => {

			var id = firebase.auth().currentUser.uid;
			var name = document.getElementById("name").value;
			var year = '';
			var subject = document.getElementById("subject").value;
			var discription = document.getElementById("discription").value;

			var firstSC = document.getElementById("1secondry").checked;
			var secondtSC = document.getElementById("2secondry").checked;
			var thirdSC = document.getElementById("3secondry").checked;
			var firstHI = document.getElementById("1highschool").checked;
			var secondHI = document.getElementById("2highschool").checked;
			var thirdHI = document.getElementById("3highschool").checked;









			if (firstSC == true) {

				year = "firstSC";
				console.log(name, discription);
				var idk = firebase.database().ref().child(year).push();
				image(year);
				var ref = firebase.database().ref().child(year).child(year + id).set({
					name: name,
					subject: subject,
					discription: discription,
					id: id,
					img: '',
					rate: '',
					defult: 'firstSC',
					email: email,
					password: pass,
					views: '',

					type: 'teacher'
				});

				for (i = 0; i < 10; i++) {

					var key = firebase.database().ref().child(year).child(year + id).child("codes").push();
					var ref = firebase.database().ref().child(year).child(year + id).child("codes").child(key.key).set({
						code: key.key,
						used: false
					});


				}

				var map = {
					firstSC: firstSC,
					secondSC: secondtSC,
					thirdSC: thirdSC,
					firstHI: firstHI,
					secondHI: secondHI,
					thirdHI: thirdHI
				};
				var ref = firebase.database().ref().child(year).child(year + id).child("years").set(map);
			}

			if (secondtSC == true) {
				year = "secondSC";

				var idk = firebase.database().ref().child(year).push();
				image(year);
				var ref = firebase.database().ref().child(year).child(year + id).set({
					name: name,
					subject: subject,
					discription: discription,
					id: id,
					img: '',
					rate: '',
					defult: 'firstSC',
					email: email,
					password: pass,
					views: '',
					type: 'teacher'
				});

				for (i = 0; i < 10; i++) {

					var key = firebase.database().ref().child(year).child(year + id).child("codes").push();
					var ref = firebase.database().ref().child(year).child(year + id).child("codes").child(key.key).set({
						code: key.key,
						used: false
					});


				}

				var map = {
					firstSC: firstSC,
					secondSC: secondtSC,
					thirdSC: thirdSC,
					firstHI: firstHI,
					secondHI: secondHI,
					thirdHI: thirdHI
				};
				var ref = firebase.database().ref().child(year).child(year + id).child("years").set(map);


			}

			if (thirdSC == true) {
				year = "thirdSC";
				image(year);
				var idk = firebase.database().ref().child(year).push();

				var ref = firebase.database().ref().child(year).child(year + id).set({
					name: name,
					subject: subject,
					discription: discription,
					id: id,
					img: '',
					rate: '',
					defult: 'firstSC',
					email: email,
					password: pass,
					views: '',
					type: 'teacher'
				});
				for (i = 0; i < 10; i++) {

					var key = firebase.database().ref().child(year).child(year + id).child("codes").push();
					var ref = firebase.database().ref().child(year).child(year + id).child("codes").child(key.key).set({
						code: key.key,
						used: false
					});


				}


				var map = {
					firstSC: firstSC,
					secondSC: secondtSC,
					thirdSC: thirdSC,
					firstHI: firstHI,
					secondHI: secondHI,
					thirdHI: thirdHI
				};
				var ref = firebase.database().ref().child(year).child(year + id).child("years").set(map);

			}

			if (firstHI == true) {
				year = "firstHI";
				image(year);
				var idk = firebase.database().ref().child(year).push();

				var ref = firebase.database().ref().child(year).child(year + id).set({
					name: name,
					subject: subject,
					discription: discription,
					id: id,
					img: '',
					rate: '',
					defult: 'firstSC',
					email: email,
					password: pass,
					views: '',
					type: 'teacher'
				});

				for (i = 0; i < 10; i++) {

					var key = firebase.database().ref().child(year).child(year + id).child("codes").push();
					var ref = firebase.database().ref().child(year).child(year + id).child("codes").child(key.key).set({
						code: key.key,
						used: false
					});


				}

				var map = {
					firstSC: firstSC,
					secondSC: secondtSC,
					thirdSC: thirdSC,
					firstHI: firstHI,
					secondHI: secondHI,
					thirdHI: thirdHI
				};
				var ref = firebase.database().ref().child(year).child(year + id).child("years").set(map);

			}

			if (secondHI == true) {
				year = "secondHI";
				image(year);
				var idk = firebase.database().ref().child(year).push();

				var ref = firebase.database().ref().child(year).child(year + id).set({
					name: name,
					subject: subject,
					discription: discription,
					id: id,
					img: '',
					rate: '',
					defult: 'firstSC',
					email: email,
					password: pass,
					views: '',
					type: 'teacher'
				});


				for (i = 0; i < 10; i++) {

					var key = firebase.database().ref().child(year).child(year + id).child("codes").push();
					var ref = firebase.database().ref().child(year).child(year + id).child("codes").child(key.key).set({
						code: key.key,
						used: false
					});


				}

				var map = {
					firstSC: firstSC,
					secondSC: secondtSC,
					thirdSC: thirdSC,
					firstHI: firstHI,
					secondHI: secondHI,
					thirdHI: thirdHI
				};

				var ref = firebase.database().ref().child(year).child(year + id).child("years").set(map);

			}

			if (thirdHI == true) {
				year = "thirdHI";
				image(year);
				var idk = firebase.database().ref().child(year).push();

				var ref = firebase.database().ref().child(year).child(year + id).set({
					name: name,
					subject: subject,
					discription: discription,
					id: id,
					img: '',
					rate: '',
					defult: 'firstSC',
					email: email,
					password: pass,
					views: '',
					type: 'teacher'
				});

				for (i = 0; i < 10; i++) {

					var key = firebase.database().ref().child(year).child(year + id).child("codes").push();
					var ref = firebase.database().ref().child(year).child(year + id).child("codes").child(key.key).set({
						code: key.key,
						used: false
					});


				}


				var map = {
					firstSC: firstSC,
					secondSC: secondtSC,
					thirdSC: thirdSC,
					firstHI: firstHI,
					secondHI: secondHI,
					thirdHI: thirdHI
				};
				var ref = firebase.database().ref().child(year).child(year + id).child("years").set(map);
			}

			if (firstSC == true) {
				year ="firstSC";
				
				var ref = firebase.database().ref().child('teachers').child(id).set({
					name: name,
					subject: subject,
					discription: discription,
					id: id,
					img: '',
					rate: '',
					defult: 'firstSC',
					email: email,
					password: pass,
					views: '',

					total_money: "",
					type: 'teacher'
				});


				var map = {
					firstSC: firstSC,
					secondSC: secondtSC,
					thirdSC: thirdSC,
					firstHI: firstHI,
					secondHI: secondHI,
					thirdHI: thirdHI
				};
				var ref = firebase.database().ref().child('teachers').child(id).child("years").set(map);


				var ref = firebase.database().ref().child('users').child(id).set({
					name: name,
					subject: subject,
					discription: discription,
					id: id,
					img: '',
					rate: '',
					defult: 'thirdHI',
					email: email,
					password: pass,
					views: '',

					total_money: "",
					type: 'teacher'
				});
				image2();
			} else if (secondtSC == true) {
				year ="secondtSC";
				image2();
				var ref = firebase.database().ref().child('teachers').child(id).set({
					name: name,
					subject: subject,
					discription: discription,
					id: id,
					img: '',
					rate: '',
					defult: 'secondSC',
					email: email,
					password: pass,
					views: '',

					total_money: "",
					type: 'teacher'

				});


				var map = {
					firstSC: firstSC,
					secondSC: secondtSC,
					thirdSC: thirdSC,
					firstHI: firstHI,
					secondHI: secondHI,
					thirdHI: thirdHI
				};
				var ref = firebase.database().ref().child('teachers').child(id).child("years").set(map);

				var ref = firebase.database().ref().child('users').child(id).set({
					name: name,
					subject: subject,
					discription: discription,
					id: id,
					img: '',
					rate: '',
					defult: 'thirdHI',
					email: email,
					password: pass,
					views: '',
					total_money: "",
					type: 'teacher'
				});
image2();


			} else if (thirdSC == true) {
				year ="thirdSC";
				
				var ref = firebase.database().ref().child('teachers').child(id).set({
					name: name,
					subject: subject,
					discription: discription,
					id: id,
					img: '',
					rate: '',
					defult: 'thirdSC',
					email: email,
					password: pass,
					views: '',

					total_money: "",
					type: 'teacher'
				});


				var map = {
					firstSC: firstSC,
					secondSC: secondtSC,
					thirdSC: thirdSC,
					firstHI: firstHI,
					secondHI: secondHI,
					thirdHI: thirdHI
				};
				var ref = firebase.database().ref().child('teachers').child(id).child("years").set(map);
				var ref = firebase.database().ref().child('users').child(id).set({
					name: name,
					subject: subject,
					discription: discription,
					id: id,
					img: '',
					rate: '',
					defult: 'thirdHI',
					email: email,
					password: pass,
					views: '',

					total_money: "",
					type: 'teacher'
				});
				image2();
			} else if (firstHI == true) {
				
				var ref = 
					firebase.database().ref().child('teachers').child(id).set({
					name: name,
					subject: subject,
					discription: discription,
					id: id,
					img: '',
					rate: '',
					defult: 'firstHI',
					email: email,
					password: pass,
					views: '',

					total_money: "",
					type: 'teacher'
				});


				var map = {
					firstSC: firstSC,
					secondSC: secondtSC,
					thirdSC: thirdSC,
					firstHI: firstHI,
					secondHI: secondHI,
					thirdHI: thirdHI
				};
				var ref = firebase.database().ref().child('teachers').child(id).child("years").set(map);
				var ref = firebase.database().ref().child('users').child(id).set({
					name: name,
					subject: subject,
					discription: discription,
					id: id,
					img: '',
					rate: '',
					defult: 'thirdHI',
					email: email,
					password: pass,
					views: '',

					total_money: "",
					type: 'teacher'
				});
				image2();

			} else if (secondHI == true) {
				var ref = firebase.database().ref().child('teachers').child(id).set({
					name: name,
					subject: subject,
					discription: discription,
					id: id,
					img: 'https://firebasestorage.googleapis.com/v0/b/oxford-web-edu.appspot.com/o/photos%2Fdownload.png?alt=media&token=14ac79ed-4add-461f-a465-f5e597e49a10',
					rate: '',
					defult: 'secondHI',
					email: email,
					password: pass,
					views: '',

					total_money: "",
					type: 'teacher'
				});


				var map = {
					firstSC: firstSC,
					secondSC: secondtSC,
					thirdSC: thirdSC,
					firstHI: firstHI,
					secondHI: secondHI,
					thirdHI: thirdHI
				};
				var ref = firebase.database().ref().child('teachers').child(id).child("years").set(map);
				var ref = firebase.database().ref().child('users').child(id).set({
					name: name,
					subject: subject,
					discription: discription,
					id: id,
					img: '',
					rate: '',
					defult: 'thirdHI',
					email: email,
					password: pass,
					views: '',

					total_money: "",
					type: 'teacher'
				});
image2();
			} else if (thirdHI == true) {
				var ref = firebase.database().ref().child('teachers').child(id).set({
					name: name,
					subject: subject,
					discription: discription,
					id: id,
					img: '',
					rate: '',
					defult: 'thirdHI',
					email: email,
					password: pass,
					views: '',

					total_money: "",
					type: 'teacher'
				});



				var map = {
					firstSC: firstSC,
					secondSC: secondtSC,
					thirdSC: thirdSC,
					firstHI: firstHI,
					secondHI: secondHI,
					thirdHI: thirdHI
				};
				var ref = firebase.database().ref().child('teachers').child(id).child("years").set(map);


				var ref = firebase.database().ref().child('users').child(id).set({
					name: name,
					subject: subject,
					discription: discription,
					id: id,
					img: '',
					rate: '',
					defult: 'thirdHI',
					email: email,
					password: pass,
					views: '',

					total_money: "",
					type: 'teacher'
				});




image2();

			}




		})
	alert("لقد تم انشاء حساب للمعلم");

setTimeout(function(){ 

	location.reload();

}, 3000);







}
firebase.auth().onAuthStateChanged(function (user) {
	if (user) {

		id = user.uid;


		// User is signed in.

	} else {
		// No user is signed in.
		//document.location.href = "../index.html";

	}
});



function logout() {
	firebase.auth().signOut().then(logout => {

		window.alert("signed out");
		document.location.href = "../Login&SignUp.html";
	}).catch(error => {});
}
