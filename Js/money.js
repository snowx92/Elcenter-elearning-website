var id  = '';
var name = '';
var uid = {};
var d;
function add_money(){
	
	var f = false;
	var number = document.getElementById('phoneNumber').value;
	var money = document.getElementById('money').value;
	
	
	var key = firebase.database().ref().child('Pickly').child('fawrypayments').push();
	
	
	var path = firebase.database().ref().child('Pickly').child('users');
	path.orderByChild('phone').equalTo(number).once('value').then(function(snapshot){
	
		
		
	snapshot.forEach(function(child){

        var keypath = firebase.database().ref().child('Pickly').child('notificationRequests').child(child.child('id').val()).push();

        var time = new Date();
        var format = time.getFullYear() + '.' + String(time.getMonth() + 1).padStart(2, '0') + '.' + String(time.getDate()).padStart(2, '0') + ' ' + String(time.getHours()).padStart(2, '0') + ':' + String(time.getMinutes()).padStart(2, '0') + ':' + String(time.getSeconds()).padStart(2, '0');
	
		var month =time.getFullYear()+'_'+String(time.getMonth()+1).padStart(2,'0');
			
		var ref2 = firebase.database().ref().child('Pickly').child('users').child(id);
		ref2.on('value' , function(snapshot){
		
		name = snapshot.child('name').val();
            var map = { by: name, date: format, id: key.key, money: money, month: month, phone: number, to: child.child('id').val()};
            var ref;         
		var ref = firebase.database().ref().child('Pickly').child('fawrypayments').child(key.key).set(map);
			
		 ref = firebase.database().ref().child('Pickly').child('monthPayments').child(month).child(key.key).set(map);
			
			
		 ref = firebase.database().ref().child('Pickly').child('users').child(child.child('id').val()).child('payments').child(key.key).set(map);

            var map2 = { action: 'wallet', datee: format, from: id, isRead: "false", orderid: "", statue: "لقد تم تحويل " + money + " جنيه الي محفظتك", to: child.child('id').val(), uName: "Quicker", ppURL: "https://firebasestorage.googleapis.com/v0/b/pickly-ed2f4.appspot.com/o/ppUsers%2Ficon.png?alt=media&token=4dce9f34-2794-4690-b888-10e5b0cb7865" };
            ref = firebase.database().ref().child('Pickly').child('notificationRequests').child(child.child('id').val()).child(keypath.key).set(map2);
            window.alert("تم اضافه الفلوس ع المحفظة")
            console.log(keypath.key);
            console.log(child.child('id').val());
	});
		
		
		 
	});
		
		
		
	});
	
	
	
	
	
	
}
	
firebase.auth().onAuthStateChanged(function (user) {
	if (user ) {
		id = user.uid;
		
		//var ref = firebase.database().ref().child('Pickly').child('users').child(id).child('accountType');
		
  }


});
firebase.auth().onAuthStateChanged(function (user) {
	if (user ) {
		var id = user.uid;
		
var ref = firebase.database().ref().child('Pickly').child('users').child(id).child('accountType');
		
	ref.on('value', gotdata , errdata);
	  
function gotdata(data){
	console.log(data.val())
	var type = data.val();
	
	if (type == "input"){
		console.log("hi");
	}
	else{
		document.location.href="index.html";
	}
	
	
	

        }

        function errdata() {

        }
	
  }

		
 else {
		// No user is signed in.
		
		
	}
});
function logout(){
firebase.auth().signOut().then(logout =>{
	
	window.alert("signed out");
	document.location.href="login.html";
}).catch(error=>{
});
}
firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		console.log(user);
		// User is signed in.
		
	} else {
		// No user is signed in.
		document.location.href="index.html";
		
	}
});