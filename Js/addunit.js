var id = '';
var name = '';
var arr = [];
var key = "";
var bool = false;
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});




var z = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString();
z = z.substring(0, z.length - 1);
document.getElementById('meeting-time').value = z;

console.log(document.getElementById('meeting-time').value);

function load_data() {
    console.log(id);
    var ref = firebase.database().ref().child('teachers').child(id).on("value", function(snapshpt) {
        console.log(snapshpt.child("years").val());
        arr = snapshpt.child("years").val();
        name = snapshpt.child("name").val();
        console.log(arr);

        var select = document.getElementById("standard-select");

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

}
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        id = user.uid;
        load_data();
        // ...
    } else {
        // User is signed out
        // ...
        document.location.href = "index.html";
    }
});








var Q_ctr = 1;

function myFunction() {
    if (Q_ctr < 0) {
        Q_ctr = 0;
    }
    ++Q_ctr;
    var div = document.createElement("div");
    let textt = '<ul id="list_Q" style="list-style-type: none; " ><li><input type="text" placeholder="Question' + ' - ' + Q_ctr.toString() + '" id="Q' + Q_ctr + '" class="form-controlQ" ></li><li><input type="text" placeholder="1" id="A' + Q_ctr + '1" class="form-controlA1"></li><li><input type="text" placeholder="2" id="A' + Q_ctr + '2" class="form-controlA2"></li><li><input type="text" placeholder="3" id="A' + Q_ctr + '3" class="form-controlA4"></li><li><input type="text" placeholder="4" id="A' + Q_ctr + '4" class="form-controlA4"></li></ul><input type="text" placeholder="Correct Answer" id="Correct_answer' + Q_ctr + '" class="form-controlRA" list="AnswersList">';
    div.innerHTML = textt;

    div.setAttribute("id", "Question-input" + Q_ctr.toString());
    div.setAttribute("class", "Question-input");

    document.getElementById("main").appendChild(div);
}





function func() {
    Q_ctr--;
    var list = document.getElementById('main'),
        item = list.lastElementChild;
    list.removeChild(item);
}


function uploadToVimeo() {
    var Tid = id;
    var year = document.getElementById("standard-select");
    var discription1 = document.getElementById('lecdiscription').value;
    var lecname1 = document.getElementById('lecname').value;
    var yearselected = year.options[year.selectedIndex].value;
    console.log("gfwgfwe");
    var file = new Blob([document.getElementById("video").files[0]], { "type": "video\/mp4" });
    var uploader = new VimeoUpload({
        file: file,
        token: "debbd7d03ee8838a23a1f92315caf3a9",
        name: lecname1,
        description: discription1,
        private: 'disable',
        onComplete: function(e) {
            alert("Done ya m3lm    ");
            console.log(e);

            ref = firebase.database().ref().child(yearselected).child(yearselected + Tid).child("lectures").child(key.key);
            ref.update({
                LVL: 'https://player.vimeo.com/video/' + e,
                LVLname: 'teachersvideos'

            });
            alert("تم رفع المحاضرة");
            location.reload();


        },
        onError: function(e) {
            alert("فشل رفع الفيديوا  " + e);
        }
    });
    uploader.upload();
    console.log("تم رفع الفيديوا");
}


function vidos() {



    var year = document.getElementById("standard-select");
    var yearselected = year.options[year.selectedIndex].value;
    var fileUpload = document.getElementById("video").files[0];

    if (fileUpload == null) {
        alert("الرجاء رفع الفديو الخاص بالمحاضرة");

        bool = false;
        return;
    } else {
        var imgname = fileUpload.name;
        var storageRef = firebase.storage().ref('teachersvideos/' + imgname);
        var uploadTask = storageRef.put(fileUpload);

        uploadTask.on('state_changed', function(snapshot) {
            var prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("uploas is " + prog + " done");
            document.getElementById("bar").value = +prog;

        }, function(erorr) {
            console.log(erorr.message);
        }, function() {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadUrl) {
                console.log(downloadUrl);
                ref = firebase.database().ref().child(yearselected).child(yearselected + firebase.auth().currentUser.uid).child("lectures").child(key.key);
                ref.update({
                    LVL: downloadUrl,
                    LVLname: 'teachersvideos/' + imgname

                });
                alert("تم رفع المحاضرة");
                location.reload();


            })
        });
        bool = true;
    }


}

function pdf() {
    var year = document.getElementById("standard-select");
    var yearselected = year.options[year.selectedIndex].value;
    var fileUpload = document.getElementById("pdf").files[0];
    var imgname = fileUpload.name;
    var storageRef = firebase.storage().ref('teachersvideos/' + imgname);
    var uploadTask = storageRef.put(fileUpload);

    uploadTask.on('state_changed', function(snapshot) {
        var prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("uploas is " + prog + " done");
        document.getElementById("bar").value = +(prog / 2);
    }, function(erorr) {
        console.log(erorr.message);
    }, function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadUrl) {
            console.log(downloadUrl);
            ref = firebase.database().ref().child(yearselected).child(yearselected + firebase.auth().currentUser.uid).child("lectures").child(key.key);
            ref.update({
                PDF: downloadUrl,
                PDFname: 'teachersvideos/' + imgname

            });


        })
    });

}


function addlecture() {


    var year1 = document.getElementById("standard-select");
    var yearselected1 = year1.options[year1.selectedIndex].value;
    var discription1 = document.getElementById('lecdiscription').value;
    var lecname1 = document.getElementById('lecname').value;
    console.log(discription1, yearselected1, lecname1);
    if (discription1 == "" || (yearselected1 == "" || yearselected1 == null) || lecname1 == "") {

        alert("الرجاء اكمال بيانات المحاضرة");
        //location.reload();
    } else {
        var dateTime = document.getElementById("meeting-time").value;
        var years = dateTime.charAt(0) + dateTime.charAt(1) + dateTime.charAt(2) + dateTime.charAt(3);
        var month = dateTime.charAt(5) + dateTime.charAt(6);
        var day = dateTime.charAt(8) + dateTime.charAt(9);
        var houre = dateTime.charAt(11) + dateTime.charAt(12);
        var minutes = dateTime.charAt(14) + dateTime.charAt(15);
        console.log(years + " " + month + " " + day + " " + houre + "  " + minutes);

        var year = document.getElementById("standard-select");
        var yearselected = year.options[year.selectedIndex].value;



        var Tid = firebase.auth().currentUser.uid;
        var reff = firebase.database().ref().child("users").child(Tid);
        reff.on("value", function(snap) {

            var img = snap.child('img').val();


            var year = document.getElementById("standard-select");
            var yearselected = year.options[year.selectedIndex].value;
            var discription = document.getElementById('lecdiscription').value;
            var lecname = document.getElementById('lecname').value;
            key = firebase.database().ref().child(yearselected).child(yearselected + firebase.auth().currentUser.uid).push();
            var ref = firebase.database().ref().child(yearselected).child(yearselected + firebase.auth().currentUser.uid).child('lectures').child(key.key);

            ref.set({
                LVL: '',
                PDF: '',
                discription: discription,
                lecname: lecname,
                teachername: name,
                views: '0',
                lecid: key.key,
                img: img,
                enable: true,
                date: dateTime.toString(),
                year: years,
                month: month.toString(),
                day: day.toString(),
                houre: houre.toString(),
                minutes: minutes.toString(),
                free: false
            })

            for (var i = 2; i <= Q_ctr; i++) {

                var val = 'Q' + i.toString();
                var vall = document.getElementById(val).value;
                var val1 = 'A' + i.toString() + '1';
                var vall1 = document.getElementById(val1).value;
                var val2 = 'A' + i.toString() + '2';
                var vall2 = document.getElementById(val2).value;
                var val3 = 'A' + i.toString() + '3';
                var vall3 = document.getElementById(val3).value;
                var val4 = 'A' + i.toString() + '4';
                var vall4 = document.getElementById(val4).value;
                var val5 = 'Correct_answer' + i.toString();
                var vall5 = document.getElementById(val5).value;

                var k = firebase.database().ref().child(yearselected).child(yearselected + firebase.auth().currentUser.uid).child('lectures').child(key.key).child("Quiz").push();

                firebase.database().ref().child(yearselected).child(yearselected + firebase.auth().currentUser.uid).child('lectures').child(key.key).child("Quiz").child(k.key).set({


                    Question: vall,
                    Answer1: vall1,
                    Answer2: vall2,
                    Answer3: vall3,
                    Answer4: vall4,
                    Correct_answer: vall5,
                    quizid: k.key

                });


            }



        });


        pdf();
        uploadToVimeo();
        alert("جاري اضافة المحاضرة الرجاء الانتظار");
    }
}

function logout() {
    firebase.auth().signOut().then(logout => {

        window.alert("signed out");
        document.location.href = "Login&SignUp.html";
    }).catch(error => {});
}