var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");
var sidebarCloseIcon= document.getElementById("sidebarIcon");
 
function toggleSidebar(){
	if (!sidebarOpen){
		sidebar.classList.add("sidebar_responsive");
		sidebarOpen=true;
	}
}
 
function closeSidebar(){
	 console.log("hsasah");
	 if (sidebarOpen){
		 console.log("hh");
		 sidebar.classList.remove("sidebar_responsive");
		 sidebarOpen = false;
	 }
}
 
var id = '';
 
 
 
function send_teachers() {
 
 
    var text = document.getElementById('text').value;
 
    var time = new Date();
    var format = time.getFullYear() + '.' + String(time.getMonth() + 1).padStart(2, '0') + '.' + String(time.getDate()).padStart(2, '0') + ' ' + String(time.getHours()).padStart(2, '0') + ':' + String(time.getMinutes()).padStart(2, '0') + ':' + String(time.getSeconds()).padStart(2, '0');
console.log(text);
  if(text!=""){
	  document.getElementById("h4").style.display='block';
	 document.getElementById("h3").style.display='none';
    var ref = firebase.database().ref().child('General_Notification').push().set({
		 text: text,
		datee: format,
		 isRead: "false",
		type:"teacher",
		   img: "https://f...content-available-to-author-only...s.com/v0/b/oxford-web-edu.appspot.com/o/photos%2FnotiT.jpg?alt=media&token=f903c231-606b-492d-a45a-c46ef0f69f13"
	});
 
 
	  } 
 
	else if(text==""){
	document.getElementById("h3").style.display='block';
		 document.getElementById("h4").style.display='none';
	}
 
 
 
}
 
 
function send_student() {
 
 
    var text = document.getElementById('text').value;
    var time = new Date();
    var format = time.getFullYear() + '.' + String(time.getMonth() + 1).padStart(2, '0') + '.' + String(time.getDate()).padStart(2, '0') + ' ' + String(time.getHours()).padStart(2, '0') + ':' + String(time.getMinutes()).padStart(2, '0') + ':' + String(time.getSeconds()).padStart(2, '0');
 
    if(text!=""){
	  document.getElementById("h4").style.display='block';
		document.getElementById("h3").style.display='none';
    var ref = firebase.database().ref().child('General_Notification').push().set({
		 text: text,
		datee: format,
		 isRead: "false",
		type:"student",
		   img: "https://f...content-available-to-author-only...s.com/v0/b/oxford-web-edu.appspot.com/o/photos%2FnotiS.png?alt=media&token=d6b2c29d-2d8f-49d9-898e-94add269e67f"
	});
	}
	else if(text==""){
		 document.getElementById("h4").style.display='none';
	document.getElementById("h3").style.display='block';	
	}
 
 
 
}
firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
 
		id = user.uid;
 
 
		// User is signed in.
 
	} else {
		// No user is signed in.
		document.location.href = "../index.html";
 
	}
});
 
 
 
function logout() {
	firebase.auth().signOut().then(logout => {
 
		window.alert("signed out");
		document.location.href = "../Login&SignUp.html";
	}).catch(error => {});
}