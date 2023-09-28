const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
	container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
	container.classList.remove("sign-up-mode");
});
function myFunction() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
function myFunction2() {
  var x = document.getElementById("loginPassword");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}


/*messaging.getToken({ vapidKey: '<YOUR_PUBLIC_VAPID_KEY_HERE>' }).then((currentToken) => {
    if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
    } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
    }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
});*/


firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		console.log(user);
		id = user.uid;
		console.log(id);

		const messaging = firebase.messaging();
		messaging.requestPermission()
			.then(function () {
				console.log("yeah");
				return messaging.getToken();
			})
			.then(function (token) {
				console.log(token);


			})
		//document.location.href = "Teachers.html";
		firebase.database().ref().child("users").child(id).once("value").then((snapshot) => {
			if (snapshot.exists()) {
				console.log(snapshot.child("type").val());
				if (snapshot.child("type").val() == 'student') {
					document.location.href = "Teachers.html";
				}
				if (snapshot.child("type").val() == 'teacher') {
					//document.location.href = "Teachers.html";
				}
				if (snapshot.child("type").val() == 'admin') {
					//document.location.href = "Teachers.html";
				}
				if (snapshot.child("type").val() == 'input') {
					//document.location.href = "Teachers.html";
				}
			}



		})



		// User is signed in.

	} else {
		// No user is signed in.
	}
});


///////////////////////// sign up 
function studentref() {

	var UserName = document.getElementById('name');
	var Email = document.getElementById('email');
	var Pnumber = document.getElementById('phonenumber');
	var password = document.getElementById('password');
	var year = document.getElementById("standard-select");
	var yearSelect = year.options[year.selectedIndex].text;
	console.log(yearSelect);


	ref = firebase.database().ref().child('Student').child(firebase.auth().currentUser.uid);

	ref.update({
		name: UserName.value,
		type: "student",
		phoneNumber: Pnumber.value,
		password: password.value,
		year: yearSelect,

		img: "https://firebasestorage.googleapis.com/v0/b/oxford-web-edu.appspot.com/o/photos%2Fdownload.png?alt=media&token=14ac79ed-4add-461f-a465-f5e597e49a10",
		email: firebase.auth().currentUser.email,
		id: firebase.auth().currentUser.uid
	});






}



var myInput = document.getElementById("password");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

// When the user clicks on the password field, show the message box
myInput.onfocus = function () {
	document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function () {
	document.getElementById("message").style.display = "none";
}

// When the user starts to type something inside the password field
myInput.onkeyup = function () {
	// Validate lowercase letters
	var lowerCaseLetters = /[a-z]/g;
	if (myInput.value.match(lowerCaseLetters)) {
		letter.classList.remove("invalid");
		letter.classList.add("valid");
	} else {
		letter.classList.remove("valid");
		letter.classList.add("invalid");
	}

	// Validate capital letters
	var upperCaseLetters = /[A-Z]/g;
	if (myInput.value.match(upperCaseLetters)) {
		capital.classList.remove("invalid");
		capital.classList.add("valid");
	} else {
		capital.classList.remove("valid");
		capital.classList.add("invalid");
	}

	// Validate numbers
	var numbers = /[0-9]/g;
	if (myInput.value.match(numbers)) {
		number.classList.remove("invalid");
		number.classList.add("valid");
	} else {
		number.classList.remove("valid");
		number.classList.add("invalid");
	}

	// Validate length
	if (myInput.value.length >= 8) {
		length.classList.remove("invalid");
		length.classList.add("valid");
	} else {
		length.classList.remove("valid");
		length.classList.add("invalid");
	}
	if (myInput.value.length >= 8 && myInput.value.match(numbers) && myInput.value.match(upperCaseLetters) && myInput.value.match(lowerCaseLetters)) {
		document.getElementById("message").style.display = "none";

	}
}

document.getElementById("form").addEventListener('submit', function (e) {
	e.preventDefault();




	var UserName = document.getElementById('name');
	var Email = document.getElementById('email');
	var Pnumber = document.getElementById('phonenumber');
	var password = document.getElementById('password');
	var year = document.getElementById("standard-select");
	var yearSelect = year.options[year.selectedIndex].text;
	console.log(yearSelect);
	firebase.auth().createUserWithEmailAndPassword(Email.value, password.value)
		.then(function (response) {
			console.log("sucess");
			console.log(response);
			studentref();
			ref = firebase.database().ref().child('users').child(firebase.auth().currentUser.uid);

			ref.update({

				name: UserName.value,
				type: "student",
				phoneNumber: Pnumber.value,
				password: password.value,
				year: yearSelect,
				id: firebase.auth().currentUser.uid,
				img: 'https://firebasestorage.googleapis.com/v0/b/oxford-web-edu.appspot.com/o/photos%2Fdownload.png?alt=media&token=14ac79ed-4add-461f-a465-f5e597e49a10',
				email: firebase.auth().currentUser.email
			});
			const messaging = firebase.messaging();
			messaging.requestPermission()
				.then(function () {
					console.log("yeah");
					return messaging.getToken();
				})
				.then(function (token) {
					console.log(token);
					ref.update({
						token1: token
					});

				})


			window.alert("تم انشاء حسابك بنجاح الرجاء قم بتسجيل الدخول");
			container.classList.remove("sign-up-mode");

		})
		.catch(function (error) {
			var errorcode = error.code;
			var errorMessage = error.message;
			console.log(errorcode);
			console.log(errorMessage);
		});
});



///////////////////////// End Of Sign Up


/////////////////////////////// SIGN in
function LOGIN() {
	var UserEmail = document.getElementById('loginEmail').value;
	var password = document.getElementById('loginPassword').value;
	const messaging = firebase.messaging();
	firebase.auth().signInWithEmailAndPassword(UserEmail, password).then((user) => {
			// Signed in 
			// ...

			var id = user.uid;

			var ref = firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).child('type');

			console.log("hey");
			ref.on('value', gotdata, errdata);

			function gotdata(data) {
				console.log(data);
				console.log(data.val())
				var type = data.val();

				if (type == "teacher") {
					document.location.href = "profile.html";
				}
				if (type == "student") {

					document.location.href = "Teachers.html";

				}
				if (type == "admin") {
					document.location.href = "admin/add_teacher.html";
				}
				if (type == "input") {
					document.location.href = "input-account.html";
				}



			}

			function errdata(data) {
				console.log('erorr');
			}




		})




		.catch(function (error) {
			alert("الرجاء التأكد من الايميل وكلمة المرور");
		});
}



function login() {



	var NEW = false;
	var t1 = false;
	var t2 = false;
	var UserEmail = document.getElementById('loginEmail').value;
	var password = document.getElementById('loginPassword').value;
		
	firebase.database().ref().child("users").orderByChild("email").equalTo(UserEmail).once("value").then((snapshot)=>{
		
		if(snapshot.exists()){
			snapshot.forEach(function(childs){
				
				if(childs.child("type").val()!="student"){
					LOGIN();
				}
				else{
					const messaging = firebase.messaging();
	messaging.requestPermission()
		.then(function () {
			console.log("yeah");
			return messaging.getToken();
		})
		.then(function (token) {
			console.log(token);

			firebase.database().ref().child('users').orderByChild("email").equalTo(UserEmail).once("value").then((snapshot) => {
				if (snapshot.exists()) {
					console.log("w;tij");
					snapshot.forEach(function (snap) {
						console.log("w;tijte43");
						if (snap.child("token1").exists()) {
							console.log("w;t6u");
							if (snap.child("token1").val() != token) {
								if (snap.child("token2").exists()) {
									if (snap.child("token2").val() != token) {
										NEW = true;
										alert("لقد قمت بالتسجيل على جاهزين مختلفين لايمكنك التسجيل من جهاز اخر , الرجاء تواصل مع خدمة العملاء");

									} else {
										LOGIN();
									}

								} else {
									console.log("awpdijf");
									firebase.database().ref().child('users').child(snap.child("id").val()).update({
										token2: token
									})
									LOGIN();
								}

							} else {
								LOGIN();
							}

						} else {
							firebase.database().ref().child('users').child(snap.child("id").val()).update({
								token1: token
							})
							console.log("evtbetv");
							LOGIN();
						}



					})
				}
			})

		})


	if (NEW) {
		//alert("لقد قمت بالتسجيل على جاهزين مختلفين لايمكنك التسجيل من جهاز اخر , الرجاء تواصل مع خدمة العملاء");
		return;

	}
				}
			})
		}
	})
	
	/*const messaging = firebase.messaging();
	messaging.requestPermission()
		.then(function () {
			console.log("yeah");
			return messaging.getToken();
		})
		.then(function (token) {
			console.log(token);

			firebase.database().ref().child('users').orderByChild("email").equalTo(UserEmail).once("value").then((snapshot) => {
				if (snapshot.exists()) {
					console.log("w;tij");
					snapshot.forEach(function (snap) {
						console.log("w;tijte43");
						if (snap.child("token1").exists()) {
							console.log("w;t6u");
							if (snap.child("token1").val() != token) {
								if (snap.child("token2").exists()) {
									if (snap.child("token2").val() != token) {
										NEW = true;
										alert("لقد قمت بالتسجيل على جاهزين مختلفين لايمكنك التسجيل من جهاز اخر , الرجاء تواصل مع خدمة العملاء");

									} else {
										LOGIN();
									}

								} else {
									console.log("awpdijf");
									firebase.database().ref().child('users').child(snap.child("id").val()).update({
										token2: token
									})
									LOGIN();
								}

							} else {
								LOGIN();
							}

						} else {
							firebase.database().ref().child('users').child(snap.child("id").val()).update({
								token1: token
							})
							console.log("evtbetv");
							LOGIN();
						}



					})
				}
			})

		})


	if (NEW) {
		alert("لقد قمت بالتسجيل على جاهزين مختلفين لايمكنك التسجيل من جهاز اخر , الرجاء تواصل مع خدمة العملاء");
		return;

	}*/


}

function forget() {
	document.getElementById("login").style.display = "none";
	document.getElementById("forg").style.display = "flex";
}

function code() {




	var auth = firebase.auth();
	var emailAddress = document.getElementById('forgetemail').value;

	auth.sendPasswordResetEmail(emailAddress).then(function () {
		// Email sent.

		window.alert("تم ارسال رساله الي بريدك الالكتروني");
		document.getElementById("login").style.display = "flex";
		document.getElementById("forg").style.display = "none";

	}).catch(function (error) {
		// An error happened.
		window.alert("الرجاء التأكد من البريد الالكتروني");

	});
}
