var userid = "";

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		console.log(user);
		userid = user.uid;
		getinfo();
		getcard();
		// User is signed in.

	} else {
		// No user is signed in.
		document.location.href = "index.html";

	}
});


function savelecinfo(lecid ,yearid ,teacherid) {
	var teacherid2 = "";
	var f = false;
	console.log(lecid ,yearid ,teacherid);

	let reff = firebase.database().ref().child("Student").child(userid).once("value").then((snap) => {

			//var money = snap.child("money").val();
			//if (money >= 5) {
			//	money -= 5;
			//	alert("تم خصم خمس جنية")
				//firebase.database().ref().child("Student").child(userid).child("money").set(money);
				//console.log("lele");
				window.location.href = "Lecture.html";
			
		//else 
			//alert ");

	});
	
	
	sessionStorage.setItem("lecid", JSON.stringify(lecid));
	sessionStorage.setItem("yearid", JSON.stringify(yearid));
	sessionStorage.setItem("teacherid", JSON.stringify(yearid+teacherid));
	sessionStorage.setItem("teacherinfo", JSON.stringify(teacherid));

}


function getinfo() {
	//console.log(id);
	var ref = firebase.database().ref().child("Student").child(userid);
	ref.on("value", function (snap) {
		document.getElementById("username").innerHTML = snap.child('name').val();
		document.getElementById("Pnum").innerHTML = snap.child('phoneNumber').val();
		document.getElementById("email").innerHTML = snap.child('email').val();
		
		document.getElementById("Pimg").src = snap.child('img').val();
	});

}

function getcard() {

	var ref = firebase.database().ref().child("Student").child(userid).child("purchasedlectures");
	ref.once("value").then((snap)=>{



			snap.forEach(function (snapshot) {


				if (snapshot.child("enable").val() == true) {


					let x = document.getElementById("bodyy");

					let cardBody = document.createElement('div');
					cardBody.className = "col mb-4";



					let card = document.createElement('div');
					card.className = "card";
					cardBody.appendChild(card);

					let img = document.createElement("img");
					img.src = snapshot.child("img").val();
					img.className = "card-img-top";
					card.appendChild(img);



					console.log("dsad");
					let card2 = document.createElement('div');
					card2.className = "card-body";
					card.appendChild(card2);


					let h51 = document.createElement('h5');
					h51.className = "card-title";
					h51.innerText = snapshot.child("lecname").val();
					card2.appendChild(h51);



					let p1 = document.createElement('p');
					p1.className = "card-text";
					p1.innerText = snapshot.child("discription").val();
					card2.appendChild(p1);

					let a1 = document.createElement('a');
					a1.id = snapshot.child("lecid").val();
					a1.charset = snapshot.child("teacherid").val()
					a1.className = "btn btn-primary";
					a1.innerText = "مشاهدة المحاضره";
					a1.name =snapshot.child("yearid").val();
					a1
					a1.setAttribute("onclick", "savelecinfo(this.id ,this.name,this.charset)");
					
					card2.appendChild(a1);
					x.appendChild(cardBody);


				}
		


		});


	});
}


/* */





function logout() {
	firebase.auth().signOut().then(logout => {

		window.alert("signed out");
		document.location.href = "Login&SignUp.html";
	}).catch(error => {});
}
