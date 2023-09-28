

 window.hideWarning = false;
 window.addEventListener('beforeunload', (event) => {
 	if (!hideWarning) {
 		event.preventDefault();
 		event.returnValue = '';
 	}

 });

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

 function add_money() {

 	var num = document.getElementById("number").value;
 	

 	var money = document.getElementById("money").value;
 	var money = parseInt(money);

 	var ref = firebase.database().ref().child("Student").orderByChild("phoneNumber").equalTo(num).once("value").then((snapshot)=>{
		
		console.log(snapshot.val());
		
		snapshot.forEach(function(snap){
			
		var mon = parseInt(snap.child("money").val()) + money;
		
		console.log(snap.child("id").val());
		
		console.log(snap.child("money").val());
		firebase.database().ref().child("Student").child(snap.child("id").val()).child("money").set(mon);
			
		})
		
		
	})

 }
