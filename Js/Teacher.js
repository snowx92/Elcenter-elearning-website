var teachersinformations = [];
var te = [];
var index = 0;
var s = "lfnwlkefnw";

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // ...
    } else {
        // User is signed out

     //   document.location.href = "index.html";
        // ...
    }
});


function logout() {
    firebase.auth().signOut().then(logout => {

        window.alert("signed out");
        document.location.href = "Login&SignUp.html";
    }).catch(error => {});
}

function getteachersId() {
    te[0] = 1;
    te[1] = 2;

    var id = firebase.database().ref().child("firstSC").push();
    var ref = firebase.database().ref().child("firstSC").on("value", function(snapshot) {


        snapshot.forEach(function(childs) {
            teachersinformations[index] = childs.val();
            console.log(teachersinformations[index]);

            let div = document.createElement("div");
            div.className = "col mb-4";
            let div2 = document.createElement("div");
            div2.className = "card";
            div.appendChild(div2);
            let img = document.createElement("img");
            img.src = teachersinformations[index].img;
            img.className = "card-img-top";
            div2.appendChild(img);
            let div3 = document.createElement("div");
            div3.className = "card-body";
            div2.appendChild(div3);
            let h5 = document.createElement("h5");
            h5.innerText = teachersinformations[index].name;
            h5.className = "card-title";
            div3.appendChild(h5);
            let span = document.createElement("span");
            span.className = "tagname";
            span.innerText = teachersinformations[index].subject;
            h5.appendChild(span);

            let p = document.createElement("p");
            p.className = "card-text";
            p.innerText = teachersinformations[index].discription;
            div3.appendChild(p);
            let a = document.createElement("a");
            a.className = "btn btn-primary";
            a.innerText = "مشاهدة المحاضرات";
            a.id = teachersinformations[index].id;
            a.setAttribute("onclick", "valid(this.id)");
            div3.appendChild(a);
            var x = document.getElementById("containe");
            x.appendChild(div);
            console.log(div);
            index++;

        });

    });
    load_Notifications();

}

function load_Notifications() {
    document.getElementById("noti").innerHTML = "";

    console.log("rwerwe");
    firebase.database().ref().child("General_Notification").orderByChild("type").equalTo("student").limitToLast(20).once("value").then((snap) => {

        snap.forEach(function(snapp) {

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


function valid(lol) {
    console.log(lol);
	
    var year = document.getElementById("standard-select");
    var yearselected = year.options[year.selectedIndex].value;
    console.log(yearselected);
    sessionStorage.setItem("teachersinfo", JSON.stringify(lol));
    sessionStorage.setItem("yearinfo", JSON.stringify(yearselected));
    window.location.href = 'units.html';



}

function search() {

    var arr = [];

    for (i = 0; i < teachersinformations.length; i++) {
        arr[i] = teachersinformations[i].name;
    }


    var string = documnet.getElementById("search");


    if (arr.includes(string)) {
        console.log("lflfl");
    } else {
        console.log("DSfsd");
    }

}

function getteachers() {
    console.log("dfaf");




    var year = document.getElementById("standard-select");
    var yearselected = year.options[year.selectedIndex].value;

    var id = firebase.database().ref().child(yearselected).push();
    var ref = firebase.database().ref().child(yearselected).once("value").then((snapshot)=> {

        var div = document.getElementById("containe").innerHTML = "";


        snapshot.forEach(function(childs) {
            teachersinformations[index] = childs.val();
            console.log(teachersinformations[index]);

            let div = document.createElement("div");
            div.className = "col mb-4";
            let div2 = document.createElement("div");
            div2.className = "card";
            div.appendChild(div2);
            let img = document.createElement("img");
            img.src = teachersinformations[index].img;
            img.className = "card-img-top";
            div2.appendChild(img);
            let div3 = document.createElement("div");
            div3.className = "card-body";
            div2.appendChild(div3);
            let h5 = document.createElement("h5");
            h5.innerText = teachersinformations[index].name;
            h5.className = "card-title";
            div3.appendChild(h5);
            let span = document.createElement("span");
            span.className = "tagname";
            span.innerText = teachersinformations[index].subject;
            h5.appendChild(span);

            let p = document.createElement("p");
            p.className = "card-text";
            p.innerText = teachersinformations[index].discription;
            div3.appendChild(p);
            let a = document.createElement("a");
            a.className = "btn btn-primary";
            a.innerText = "مشاهدة المحاضرات";
            a.id = teachersinformations[index].id;
            a.setAttribute("onclick", "valid(this.id)");
            div3.appendChild(a);
            var x = document.getElementById("containe");
            x.appendChild(div);
            console.log(div);
            index++;

        });

    });




};



$(document).ready(function() {
    $('.notifictions .icon-wrap').click(function() {
        $(this).parent().toggleClass("active");
    })
})
$(".link").click(function() {
    $(".notifictions").removeClass("active");
    $(".popup").addClass("active");
})
$(".close").click(function() {

    $(".popup").removeClass("active");
})