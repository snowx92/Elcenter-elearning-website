var bool = true;
var teacherid = "";
var key = "";
window.hideWarning = false;
window.addEventListener('beforeunload', (event) => {
    if (!hideWarning) {
        event.preventDefault();
        event.returnValue = '';
    }

});
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});




var z = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString();
z = z.substring(0, z.length - 1);
console.log(z);
document.getElementById('meeting-time').value = z;

function on_load() {

    var year = document.getElementById("years");
    var yearselected = year.options[year.selectedIndex].value;
    var select = document.getElementById("teachers");
    var ref = firebase.database().ref().child(yearselected).on("value", function(ss) {

        ss.forEach(function(cs) {

            //console.log(cs.child("id").val());
            // console.log(cs.child("id").val());
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
    var select = document.getElementById("teachers");
    for (i = 0; i < select.length; i++) {
        select.remove(0);
    }

    var ref = firebase.database().ref().child(yearselected).on("value", function(ss) {

        ss.forEach(function(cs) {

            console.log(cs.child("id").val());

            let option = document.createElement("option");
            option.value = cs.child("id").val();
            option.innerText = cs.child("name").val();
            select.appendChild(option);


        });
    });

}







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



document.getElementById('btn_remove').onclick = func();

function func() {
    Q_ctr--;
    var list = document.getElementById('main'),
        item = list.lastElementChild;
    list.removeChild(item);
}





function uploadToVimeo() {

    console.log("gfwgfwe");
    var file = new Blob([document.getElementById("video").files[0]], { "type": "video\/mp4" });
    var uploader = new VimeoUpload({
        file: file,
        token: "debbd7d03ee8838a23a1f92315caf3a9",
        name: "fewfwefwe",
        description: "efpiqwhfqilgwghwigfhq",
        private: 'disable',
        onComplete: function(e) {
            alert("تم رفع الفيديوا بنجاح");
            console.log(e);
        },
        onError: function(e) {
            alert("فشل رفع الفيديوا  " + e);
        }
    });
    uploader.upload();
    console.log("تم رفع الفيديوا");
}



function vidos() {
    var Tid = teacherid;
    var bar = document.getElementById("bar");
    var year = document.getElementById("years");
    var yearselected = year.options[year.selectedIndex].value;
    var fileUpload = document.getElementById("video").files[0];

    if (fileUpload == null) {
        alert("الرجاء رفع الفديو الخاص بالمحاضرة");
        bool = false;
        return;
    }

    var imgname = fileUpload.name;
    var storageRef = firebase.storage().ref('teachersvideos/' + imgname);
    var uploadTask = storageRef.put(fileUpload);

    uploadTask.on('state_changed', function(snapshot) {
        var prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("uploas is " + prog + " done");
        document.getElementById("bar").value = +(prog);
    }, function(erorr) {
        console.log(erorr.message);
    }, function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadUrl) {
            console.log(downloadUrl);
            ref = firebase.database().ref().child(yearselected).child(yearselected + Tid).child("lectures").child(key.key);
            ref.update({
                LVL: downloadUrl,
                LVLname: 'teachersvideos/' + imgname

            });
            alert("تم رفع المحاضرة");
            location.reload();

        })
    });

}


function pdf() {
    var terid = document.getElementById("teachers");
    var Tid = terid.options[terid.selectedIndex].value;
    var year = document.getElementById("years");
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
            ref = firebase.database().ref().child(yearselected).child(yearselected + Tid).child("lectures").child(key.key);
            ref.update({
                PDF: downloadUrl,
                PDFname: 'teachersvideos/' + imgname

            });


        })
    });

}


function addlecture() {


    var dateTime = document.getElementById("meeting-time").value;
    var years = dateTime.charAt(0) + dateTime.charAt(1) + dateTime.charAt(2) + dateTime.charAt(3);
    var month = dateTime.charAt(5) + dateTime.charAt(6);
    var day = dateTime.charAt(8) + dateTime.charAt(9);
    var houre = dateTime.charAt(11) + dateTime.charAt(12);
    var minutes = dateTime.charAt(14) + dateTime.charAt(15);
    console.log(years + " " + month + " " + day + " " + houre + "  " + minutes);

    var terid = document.getElementById("teachers");
    var Tid = terid.options[terid.selectedIndex].value;
    console.log(Tid);
    var year = document.getElementById("years");
    var yearselected = year.options[year.selectedIndex].value;

    var discription = document.getElementById('lecdiscription').value;
    var lecname = document.getElementById('lecname').value;
    key = firebase.database().ref().child(yearselected).child(yearselected + Tid).push();

    if (discription == "" || (yearselected == "" || yearselected == null) || lecname == "" || bool == false) {

        alert("الرجاء اكمال بيانات المحاضرة");
        return;
    }


    var reff = firebase.database().ref().child("users").child(Tid);
    reff.on("value", function(snap) {

        var img = snap.child('img').val();


        var ref = firebase.database().ref().child(yearselected).child(yearselected + Tid).child('lectures').child(key.key);

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
            minutes: minutes.toString()
        });


        for (var i = 1; i <= Q_ctr; i++) {

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

            var k = firebase.database().ref().child(yearselected).child(yearselected + Tid).child('lectures').child(key.key).child("Quiz").push();

            firebase.database().ref().child(yearselected).child(yearselected + Tid).child('lectures').child(key.key).child("Quiz").child(k.key).set({


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
    console.log("gfwgfwe");
    var file = new Blob([document.getElementById("video").files[0]], { "type": "video\/mp4" });
    var uploader = new VimeoUpload({
        file: file,
        token: "1586ec9cdf6679c240d921d1eed5fed5",
        name: "fewfwefwe",
        description: "efpiqwhfqilgwghwigfhq",
        private: 'disable',
        onComplete: function(e) {
            alert("تم رفع الفيديوا بنجاح");
            console.log(e);
            ref = firebase.database().ref().child(yearselected).child(yearselected + Tid).child("lectures").child(key.key);
            ref.update({
                LVL: 'https://player.vimeo.com/video/' + e,
                LVLname: e

            });
        },
        onError: function(e) {
            alert("فشل رفع الفيديوا  " + e);
        }
    });

    uploader.upload();

    console.log("تم رفع الفيديوا");


    alert("جاري اضافة المحاضرة الرجاء الانتظار");

}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

        id = user.uid;


        // User is signed in.

    } else {
        // No user is signed in.
      //  document.location.href = "../index.html";

    }
});



function logout() {
    firebase.auth().signOut().then(logout => {

        window.alert("signed out");
        document.location.href = "../Login&SignUp.html";
    }).catch(error => {});
}