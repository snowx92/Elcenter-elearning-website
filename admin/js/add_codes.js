 var teacherid = "";


window.hideWarning = false;
window.addEventListener('beforeunload', (event) => {
    if (!hideWarning) {
        event.preventDefault();
        event.returnValue = '';
    }

});

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
		document.location.href = "Login&SignUp.html";
	}).catch(error => {});
}

 function on_load() {

 	var year = document.getElementById("years");
 	var yearselected = year.options[year.selectedIndex].value;
 	var select = document.getElementById("teacher");
 	var ref = firebase.database().ref().child(yearselected).on("value", function (ss) {

 		ss.forEach(function (cs) {

 			console.log(cs.child("id").val());

 			console.log(cs.child("id").val());
 			teacherid = cs.child("id").val();
 			let option = document.createElement("option");
 			option.value = teacherid;
 			option.innerText = cs.child("name").val();
 			select.appendChild(option);

 		});
 	});


 }

 function getteachers() {
 	var year = document.getElementById("years");
 	var yearselected = year.options[year.selectedIndex].value;
 	var select = document.getElementById("teacher");
 	for (i = 0; i < select.length; i++) {
 		select.remove(0);
 	}

 	var ref = firebase.database().ref().child(yearselected).on("value", function (ss) {

 		ss.forEach(function (cs) {

 			let option = document.createElement("option");
 			option.value = cs.child("id").val();
 			option.innerText = cs.child("name").val();
 			select.appendChild(option);


 		});
 	});

 }

function add_codes(){
    var year = document.getElementById("years");
 	var yearselected = year.options[year.selectedIndex].value;
    
    var teacher = document.getElementById("teacher");
 	var teacherselected = teacher.options[teacher.selectedIndex].value;    
    
    console.log(yearselected,teacherselected);
    var table = document.getElementById("employeeList2").getElementsByTagName('tbody')[0];
    
    var num = document.getElementById("numcodes").value;
    var numcodes = parseInt(num);
    
    for (i = 0; i < numcodes; i++) {
        var key = firebase.database().ref().child(yearselected).child(teacherselected).child("codes").push();
        var string="";
		string = key.key;
		var kay = "";
		for(j = 0;j<string.length;j++){
			if(string[j]!="-"&&string[j]!="_"){
				kay+=string[j];
			}
		}
		
		var newRow = table.insertRow(table.length);	
		cell1 = newRow.insertCell(0);
		cell2 = newRow.insertCell(1);
		cell3 = newRow.insertCell(2);
		
		var year = document.getElementById("years");
 		var yearselected = year.options[year.selectedIndex].innerText;
		
		var t = document.getElementById("teacher");
 		var teacher = t.options[t.selectedIndex].innerText;
		
		
		cell1.innerHTML = kay;
		cell2.innerHTML=yearselected;
		cell3.innerHTML =teacher;
		
        
        var ref = firebase.database().ref().child(yearselected).child(yearselected+teacherselected).child("codes").child(key.key).set({
						code: kay,
						used: false
					});


				}
	alert("تم اضافة الاكواد قم بالضغط على زر حفظ الاكواد لتخزينهم");

        
}
function logout() {
    firebase.auth().signOut().then(logout => {

        window.alert("signed out");
        document.location.href = "../Login&SignUp.html";
    }).catch(error => {});
}