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

function getuser() {

    //console.log(td.par)

    var table = document.getElementById("userinfo").getElementsByTagName('tbody')[0];

    var phone = document.getElementById('phonee').value;


    var ss;
    var ref2 = firebase.database().ref().child('Pickly').child('users');

    ref2.orderByChild('phone').equalTo(phone).on('value', function (snapshot) {

        snapshot.forEach(function (children) {

            var newRow = table.insertRow(table.length);

            var cell0 = newRow.insertCell(0);
            cell0.innerHTML = children.child('name').val();

            var cell1 = newRow.insertCell(1);
            cell1.innerHTML = children.child('id').val();

            var cell2 = newRow.insertCell(2);
            cell2.innerHTML = children.child('active').val();

            var cell3 = newRow.insertCell(3);
            cell3.innerHTML = children.child('phone').val();

            var cellspinner = newRow.insertCell(4);
            cellspinner.innerHTML = '<select><option value= "true">true</option> <option value= "false">false</option>';
            var cellsubmit = newRow.insertCell(5);
            cellsubmit.innerHTML = '<input  type="submit"  value="Submit" onClick="submit(this)"><i class ="fas fa-trash-alt btndelete"></i></input>';

            console.log('123');
        });


    });

}


function submit(this1) {

   // var reff = firebase.database().ref().child('Pickly').child('users').child(this1.parentElement.parentElement.cells[1].innerHTML).child('active').set();


    console.log(this1.parentElement.parentElement.cells[4].selected);
    //

}
