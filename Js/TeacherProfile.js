var count = 0;
var arr = [];
var lastselected = '';
var bufferscelected = '';
var yearselected = '';
var vector = [];
arr = {
	firstSC: 0,
	secondSC: 0,
	thirdSC: 0,
	firstHI: 0,
	secondHI: 0,
	thirdHI: 0
};


firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		// User is signed in, see docs for a list of available properties
		// https://firebase.google.com/docs/reference/js/firebase.User
		var id = user.uid;
		console.log(firebase.auth().currentUser.uid);
		load_data();
		getgeneralinfo();
	} else {
		console.log("dwedwe");
		//document.location.href="index.html";
	}
});

function load_Notifications() {

	document.getElementById("noti").innerHTML = "";
	console.log("rwerwe");
	firebase.database().ref().child("General_Notification").orderByChild("type").equalTo("teacher").limitToLast(20).once("value" ,function(snap) {

		snap.forEach(function (snapp) {

			let li1 = document.createElement("li");
			li1.className = "success";

			let div1 = document.createElement("div");
			div1.className = "notify_icon";
			li1.appendChild(div1);

			let span1 = document.createElement("snap");
			span1.className = "icon";
			div1.appendChild(span1);

			let img1 = document.createElement("img");
			img1.src = snapp.child("img").val();
			span1.appendChild(img1);


			let div2 = document.createElement("div");
			div2.className = "notify_data";
			li1.appendChild(div2);

			let div3 = document.createElement("div");
			div3.className = "title";
			div3.innerText = snapp.child("text").val();
			div2.appendChild(div3);


			let div4 = document.createElement("div");
			div4.className = "notify_status";
			
			let p1 = document.createElement("p");
			p1.innerText = snapp.child("datee").val();
		
			div4.appendChild(p1);
			
			li1.appendChild(div4);
			let x = document.getElementById("noti");
			x.appendChild(li1);
			console.log(x);

		});

	});

}







function load_data() {
	var ref = firebase.database().ref().child('teachers').child(firebase.auth().currentUser.uid).on("value", function (snapshpt) {
		arr = snapshpt.child("years").val();
		name = snapshpt.child("name").val();
		console.log(arr);

		var select = document.getElementById("exampleFormControlSelect1");

		if (arr.firstSC == true) {
			let option0 = document.createElement("option");
			option0.value = "firstSC";
			option0.innerText = "اولى اعدادي";
			select.appendChild(option0);

		}
		if (arr.secondSC == true) {
			let option0 = document.createElement("option");
			option0.value = "secondSC";
			option0.innerText = "تانيه اعدادي";
			select.appendChild(option0);
		}
		if (arr.thirdSC == true) {
			let option0 = document.createElement("option");
			option0.value = "thirdSC";
			option0.innerText = "تالته اعدادي";
			select.appendChild(option0);
		}
		if (arr.firstHI == true) {
			let option0 = document.createElement("option");
			option0.value = "firstHI";
			option0.innerText = "اولى ثانوي";
			select.appendChild(option0);
		}
		if (arr.secondHI == true) {
			let option0 = document.createElement("option");
			option0.value = "secondHI";
			option0.innerText = "تانيه ثانوي";
			select.appendChild(option0);
		}
		if (arr.thirdHI == true) {
			let option0 = document.createElement("option");
			option0.value = "thirdHI";
			option0.innerText = "تالته ثانوي";
			select.appendChild(option0);
		}

	});


	load_Notifications();

}

function getgeneralinfo() {
	var ref = firebase.database().ref().child("teachers").child(firebase.auth().currentUser.uid);
	ref.on("value", function (snap) {
		document.getElementById("username").innerHTML = snap.child('name').val();

		document.getElementById("email").innerHTML = snap.child('email').val();

		document.getElementById("bio").innerHTML = snap.child('discription').val();

		document.getElementById("Pimg").src = snap.child('img').val();

	});

}


function getlecturesinfo() {


	var year = document.getElementById("exampleFormControlSelect1");
	yearselected = year.options[year.selectedIndex].value;

	var ref = firebase.database().ref().child(yearselected).child(yearselected + firebase.auth().currentUser.uid).child("lectures");
	ref.on("value", function (snap) {
		console.log(snap.val());
		var div = document.getElementById("bodyy");

		while (div.firstChild) {
			div.removeChild(div.firstChild);
		}
		snap.forEach(function (snapshot) {
			console.log(snapshot.val());
			let x = document.getElementById("bodyy");
			let div1 = document.createElement('div');
			div1.className = "col mb-4";
			div1.id = count.toString();
			let div2 = document.createElement('div');
			div2.className = "card";
			div1.appendChild(div2);
			let div3 = document.createElement('div');
			div3.className = "card-body";
			div2.appendChild(div3);
			let h51 = document.createElement('h5');
			h51.className = "card-title";
			h51.innerText = snapshot.child("lecname").val();
			div3.appendChild(h51);
			let p1 = document.createElement('p');
			p1.className = "card-text";
			p1.innerText = snapshot.child("discription").val();
			div3.appendChild(p1);
			let p2 = document.createElement('p');
			p2.innerText = " عدد المشاهدات:";
			let span2 = document.createElement('span');
			span2.innerText = " " + snapshot.child("views").val() + " ";
			p2.appendChild(span2);
			div3.appendChild(p2);
			let a1 = document.createElement('a');
			a1.href = "EditLecture.html";
			a1.className = "btn btn-primary";
			a1.id = snapshot.child("lecid").val();
			a1.setAttribute("onclick", "savelecinfo(this.id)");
			a1.innerText = "تعديل المحاضره";

			div3.appendChild(a1);
			x.appendChild(div1);
			console.log(x);
		})

	});

}




function savelecinfo(lol) {
	console.log(lol);
	console.log(yearselected);
	console.log(yearselected + firebase.auth().currentUser.uid);
	sessionStorage.setItem("lecidEdit", JSON.stringify(lol));
	sessionStorage.setItem("yearidEdit", JSON.stringify(yearselected));
	sessionStorage.setItem("teacheridEdit", JSON.stringify(yearselected + firebase.auth().currentUser.uid));
	window.location.href = "EditLecture.html";
}

function chat() {
	console.log("piwhfpijf");
	sessionStorage.setItem("from", JSON.stringify("teachers"));
	sessionStorage.setItem("to", JSON.stringify("Student"));
	window.location.href = 'chat.html';
	console.log("done babe");

}



function logout() {
	firebase.auth().signOut().then(logout => {

		window.alert("signed out");
		document.location.href = "Login&SignUp.html";
	}).catch(error => {});
}

$(document).ready(function () {
	$('.notifictions .icon-wrap').click(function () {
		$(this).parent().toggleClass("active");
	})
})
$(".link").click(function () {
	$(".notifictions").removeClass("active");
	$(".popup").addClass("active");
})
$(".close").click(function () {

	$(".popup").removeClass("active");
})
