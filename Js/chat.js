var id = "";
var chatid = "";
var chatIDD = "no";
var index = 0;
var anotheruserid = "";
var userid = '';
var vector = [];
var mymap = new Map();
var from = '';
var to = "";
var m = 0;

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		console.log(user);
		userid = user.uid;
		console.log(userid);
		loaddata();

	} else {
		console.log(";ee");
		//document.location.href = "index.html";
	}
});

function loaddata() {

	//var sessionstring = sessionStorage.getItem('id');
	//id = JSON.parse(sessionstring);
	//var storage = sessionStorage.getItem('chatid');
	//chatid = JSON.parse(storage);
	var storage2 = sessionStorage.getItem('from');
	from = JSON.parse(storage2);
	var storage3 = sessionStorage.getItem('to');
	to = JSON.parse(storage3);
	
	console.log(from , to ,)
	
	importchats();

}

function importchats() {

	var chatid = "";


	firebase.database().ref().child(from).child(userid).child("chat").once("value").then((snapshot) => {

		snapshot.forEach(function (snap) {


			chatid = snap.child("chatid").val();
			firebase.database().ref().child(to).child(snap.child("id").val()).on("value",function(snap) {


				console.log("here");
				let div1 = document.createElement("div");
				div1.className = "chat_list active_chat";
				div1.id = chatid;
				div1.name = snap.child("id").val();
				div1.setAttribute("onclick", "gettext(this.id ,this.name)");

				let div2 = document.createElement("div");
				div2.className = "chat_people";
				div1.appendChild(div2);

				let div3 = document.createElement("div");
				div3.className = "chat_img";
				div2.appendChild(div3);

				let image1 = document.createElement("img");
				image1.src = snap.child("img").val();
				image1.alt = "sunil";
				div3.appendChild(image1);

				let div4 = document.createElement("div");
				div4.className = "chat_ib";
				div2.appendChild(div4);

				let h51 = document.createElement("h5");
				h51.innerText = snap.child("name").val();

				div4.appendChild(h51);

				let x = document.getElementById("inbox");
				x.appendChild(div1);


			});


		});
	});


}


function gettext(chatID, personid) {
	console.log("here", "  " + chatID, " " + userid);
	chatIDD = chatID;
	anotheruserid = personid;
	document.getElementById("inboxx").innerHTML = "";
	firebase.database().ref().child("chat").child(chatID).child(userid).limitToLast(1).on("child_added", function (snapp) {


		if (m==1) {
			if (snapp.child("sentfrom").val() == personid) {

				let div2 = document.createElement("div");
				div2.className = "incoming_msg";

				let div3 = document.createElement("div");
				div3.className = "received_msg";
				div2.appendChild(div3);

				let div4 = document.createElement("div");
				div4.className = "received_withd_msg";
				div2.appendChild(div4);

				let div1 = document.createElement("div");
				div1.className = "received_withd_msg";
				div4.appendChild(div1);

				let p1 = document.createElement("p");

				p1.innerText = snapp.child("Message").val();
				div1.appendChild(p1);
				let span1 = document.createElement("span");
				span1.className = "time_date";
				span1.innerText = snapp.child("date").val() + "|" + snapp.child("time_sent").val();
				div1.appendChild(span1);


				var x = document.getElementById("inboxx");
				x.appendChild(div2);
			}



			if (snapp.child("sentfrom").val() == userid) {

				let div1 = document.createElement("div");
				div1.className = "outgoing_msg";

				let div2 = document.createElement("div");
				div2.className = "sent_msg";
				div1.appendChild(div2);


				let p1 = document.createElement("p");

				p1.innerText = snapp.child("Message").val();
				div2.appendChild(p1);

				let span1 = document.createElement("span");
				span1.className = "time_date";
				span1.innerText = snapp.child("date").val() + "|" + snapp.child("time_sent").val();
				div2.appendChild(span1);


				var x = document.getElementById("inboxx");
				x.appendChild(div1);
			}
		} else {
			m++;
			console.log(m);
		}

	});
	firebase.database().ref().child("chat").child(chatID).child(userid).once("value").then((snapshot) => {

		snapshot.forEach(function (snap) {

			if (snap.child("read").val() == false) {
				/*firebase.database().ref().child("chat").child(chatID).child(userid).child(snap.child("messageID").val()).child("read").set(false);*/

				console.log("one time ");

				if (snap.child("sentfrom").val() == personid) {

					let div2 = document.createElement("div");
					div2.className = "incoming_msg";

					let div3 = document.createElement("div");
					div3.className = "received_msg";
					div2.appendChild(div3);

					let div4 = document.createElement("div");
					div4.className = "received_withd_msg";
					div2.appendChild(div4);

					let div1 = document.createElement("div");
					div1.className = "received_withd_msg";
					div4.appendChild(div1);

					let p1 = document.createElement("p");
					console.log(snap.val());
					p1.innerText = snap.child("Message").val();
					div1.appendChild(p1);
					let span1 = document.createElement("span");
					span1.className = "time_date";
					span1.innerText = snap.child("date").val() + "|" + snap.child("time_sent").val();
					div1.appendChild(span1);


					var x = document.getElementById("inboxx");
					x.appendChild(div2);
				}



				if (snap.child("sentfrom").val() == userid) {
					console.log(snap);
					let div1 = document.createElement("div");
					div1.className = "outgoing_msg";

					let div2 = document.createElement("div");
					div2.className = "sent_msg";
					div1.appendChild(div2);


					let p1 = document.createElement("p");
					console.log(snap.val());
					p1.innerText = snap.child("Message").val();
					div2.appendChild(p1);

					let span1 = document.createElement("span");
					span1.className = "time_date";
					span1.innerText = snap.child("date").val() + "|" + snap.child("time_sent").val();
					div2.appendChild(span1);


					var x = document.getElementById("inboxx");
					x.appendChild(div1);
				}


			}


		})

	})

}
 var input =document.getElementById("message");
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("send").click();
  }
});

function sendMassage() {

	var message = document.getElementById("message").value;
	var date = new Date();
	var h = String(date.getHours()).padStart(2, '0');
	var mu = String(date.getMinutes()).padStart(2, '0');
	var houres = h + ":" + mu;

	var dd = String(date.getDate()).padStart(2, '0');
	var m = String(date.getMonth() + 1).padStart(2, '0');

	var key = firebase.database().ref().child("chat").child(chatIDD).push();

	firebase.database().ref().child("chat").child(chatIDD).child(userid).child(key.key).set({
		sentfrom: userid,
		Message: message,
		time_sent: houres,
		date: dd + "/" + m,
		read: false,
		messageID: key.key


	});


	firebase.database().ref().child("chat").child(chatIDD).child(anotheruserid).child(key.key).set({
		sentfrom: userid,
		Message: message,
		time_sent: houres,
		date: dd + "/" + m,
		read: false,
		messageID: key.key


	});

document.getElementById('message').value = '';
	var elem = document.getElementById('inboxx');
  elem.scrollTop = elem.scrollHeight;
}