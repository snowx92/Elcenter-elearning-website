var arr = [];

var quiz = 1;
var quistion = 1;
var answer = 1;
var correct = 1;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user);
        id = user.uid;
        console.log(id);

        // User is signed in.

    } else {
        // No user is signed in.
        document.location.href = "index.html";
    }
});

var teacherid = '';
var yearid = '';
var lectureid = '';

function importinfo() {
    var sessionstring = sessionStorage.getItem('teacheridEdit');
    teacherid = JSON.parse(sessionstring);
    var yearselected = sessionStorage.getItem("yearidEdit");
    yearid = JSON.parse(yearselected);
    var yearselected = sessionStorage.getItem("lecidEdit");
    lectureid = JSON.parse(yearselected);
    console.log(yearid, teacherid, lectureid);
    load_info();
}


function load_info() {

    firebase.database().ref().child(yearid).child(teacherid).child("lectures").child(lectureid).once('value').then((snapshot) => {
        console.log(snapshot.val());
        document.getElementById("Mname").value = snapshot.child('lecname').val();
        document.getElementById("discription").value = snapshot.child('discription').val();
        document.getElementById("videoId").src = snapshot.child('LVL').val();
        document.getElementById("pdf").value = snapshot.child('PDF').val();
        console.log(snapshot.child("Quiz").val());

        snapshot.child("Quiz").forEach(function(shot) {

            let div1 = document.createElement("div");
            div1.className = "form-controlo";
            div1.id = quiz;
            arr.push(shot.child("quizid").val());

            let ul1 = document.createElement("ul");
            ul1.id = "list_Q";
            ul1.style = "list-style-type: none; ";
            div1.appendChild(ul1);

            let li1 = document.createElement("li");
            ul1.appendChild(li1);
			
 			let label = document.createElement("label");
			label.innerText="السؤال";
			li1.appendChild(label);
			
            let input1 = document.createElement("input");
            input1.className = "form-controlQ";
            input1.type = "text";
            input1.placeholder = "Question - " + quiz;
            input1.id = "Q" + quiz + "" + quistion;
            input1.value = shot.child("Question").val();
            li1.appendChild(input1);


            let li2 = document.createElement("li");
            ul1.appendChild(li2);
			
			let label1 = document.createElement("label");
			label1.innerText="الاختيار الاول";
			li2.appendChild(label1);

            let input2 = document.createElement("input");
            input2.className = "form-controlQ";
            input2.type = "text";
            input2.placeholder = "Answer -" + answer;
            input2.id = "A" + quiz + "" + answer;
            input2.value = shot.child("Answer1").val();
            li2.appendChild(input2);
            answer++;

            let li3 = document.createElement("li");
            ul1.appendChild(li3);
			let label3 = document.createElement("label");
			label3.innerText="الاختيار الثاني";
			li3.appendChild(label3);

            let input3 = document.createElement("input");
            input3.className = "form-controlQ";
            input3.type = "text";
            input3.placeholder = "Answer -" + answer;
            input3.id = "A" + quiz + "" + answer;
            input3.value = shot.child("Answer2").val();
            li3.appendChild(input3);
            answer++;


            let li4 = document.createElement("li");
            ul1.appendChild(li4);
				let label4 = document.createElement("label");
			label4.innerText="الاختيار الثالث";
			li4.appendChild(label4);

            let input4 = document.createElement("input");
            input4.className = "form-controlQ";
            input4.type = "text";
            input4.placeholder = "Answer -" + answer;
            input4.id = "A" + quiz + "" + answer;
            input4.value = shot.child("Answer3").val();
            li4.appendChild(input4);
            answer++;

            let li5 = document.createElement("li");
            ul1.appendChild(li5);
	let label5 = document.createElement("label");
			label5.innerText="الاختيار الرابع";
			li5.appendChild(label5);
            let input5 = document.createElement("input");
            input5.className = "form-controlQ";
            input5.type = "text";
            input5.placeholder = "Answer -" + answer;
            input5.id = "A" + quiz + answer;
            input5.value = shot.child("Answer4").val();
            li5.appendChild(input5);




            let input6 = document.createElement("input");
				let label6 = document.createElement("label");
			label6.innerText="الاجابة الصحيحة";
			li5.appendChild(label6);
            input6.className = "form-control7";
            input6.type = "text";
            input6.placeholder = "correct Answer";
            input6.id = 'C' + correct;
            input6.value = shot.child("Correct_answer").val();
            div1.appendChild(input6);


            var x = document.getElementById("main");
            x.appendChild(div1);

            answer = 1;
            quiz++;
            correct++;
            quistion++;



        })




    });


}


function pdff() {
    var fileUpload = document.getElementById("PDF").files[0];
    var imgname = fileUpload.name;
    var storageRef = firebase.storage().ref('teachersvideos/' + imgname);
    var uploadTask = storageRef.put(fileUpload);

    uploadTask.on('state_changed', function(snapshot) {
        var prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("uploas is " + prog + " done");

    }, function(erorr) {
        console.log(erorr.message);
    }, function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadUrl) {
            console.log(downloadUrl);
            ref = firebase.database().ref().child(yearid).child(teacherid).child("lectures").child(lectureid);
            ref.update({
                PDF: downloadUrl,
                PDFname: 'teachersvideos/' + imgname

            });


        })
    });

}



function vidos() {
    var fileUpload = document.getElementById("video").files[0];
    var imgname = fileUpload.name;
    var storageRef = firebase.storage().ref('teachersvideos/' + imgname);
    var uploadTask = storageRef.put(fileUpload);

    uploadTask.on('state_changed', function(snapshot) {
        var prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("uploas is " + prog + " done");

    }, function(erorr) {
        console.log(erorr.message);
    }, function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadUrl) {
            console.log(downloadUrl);
            ref = firebase.database().ref().child(yearid).child(teacherid).child("lectures").child(lectureid);
            ref.update({
                LVL: downloadUrl,
                LVLname: 'teachersvideos/' + imgname

            });


        })
    });

}


function uploadToVimeo() {
    var Tid = teacherid;
    var discription = document.getElementById('discription').value;
    var lecname = document.getElementById('Mname').value;
    console.log("gfwgfwe");
    var file = new Blob([document.getElementById("video").files[0]], { "type": "video\/mp4" });
    var uploader = new VimeoUpload({
        file: file,
        token: "debbd7d03ee8838a23a1f92315caf3a9",
        name: lecname,
        description: discription,
        private: 'disable',
        onComplete: function(e) {
            alert("Done ya m3lm    ");
            console.log(e);

            ref = firebase.database().ref().child(yearid).child(Tid).child("lectures").child(lectureid);
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

function setNewLecInfo() {
    var video = document.getElementById('video').value;
    var pdf = document.getElementById('PDF').value;
    var videourl = document.getElementById("Murl").value;
    var loll = document.getElementById("Q11").value;
    console.log(loll);
    if (video == '' && videourl == '') {
        console.log("nopdw");
        return;
    }
    
    if (document.getElementById("discription").value == '') {
        console.log("nop");
        return;
    }
    if (document.getElementById("Mname").value == '') {
        console.log("nop");
        return;
    }
    var discription = document.getElementById('discription').value;
    var lecname = document.getElementById('Mname').value;
    var ref = firebase.database().ref().child(yearid).child(teacherid).child('lectures').child(lectureid);

    ref.update({
        discription: discription,
        lecname: lecname,
        teachername: name,
        lecid: lectureid
    })

    quistion = 1;
    var quiiz = 1;
    answer = 1;
    correct = 1;
    for (i = 1; i < quiz; i++) {
        var quistionid = "Q" + quiiz + "" + quistion;
        var quistionval = document.getElementById(quistionid).value;
        var ans1 = document.getElementById("A" + quiiz + "" + answer).value;
        answer++;
        var ans2 = document.getElementById("A" + quiiz + "" + answer).value;
        answer++;
        var ans3 = document.getElementById("A" + quiiz + "" + answer).value;
        answer++;
        var ans4 = document.getElementById("A" + quiiz + "" + answer).value;
        var correct = document.getElementById("C" + correct).value;
        var idd = arr[i - 1];

        firebase.database().ref().child(yearid).child(teacherid).child('lectures').child(lectureid).child("Quiz").child(idd).set({

            Question: quistionval,
            Answer1: ans1,
            Answer2: ans2,
            Answer3: ans3,
            Answer4: ans4,
            Correct_answer: correct,
            quizid: idd


        })



    }



    if (video != '') {

        uploadToVimeo();
    }

    if (pdf != "") {

        var refff = firebase.database().ref().child(yearid).child(teacherid).child('lectures').child(lectureid).once("value").then((snap) => {
            var storageRef = firebase.storage().ref();
            var desertRef = storageRef.child(snap.child("PDFname").val());

            // Delete the file
            desertRef.delete().then(function() {
                console.log("lol");
            }).catch(function(error) {

            });


        })

        pdff();

    }


alert("تم تعديل المحاضرة");







}