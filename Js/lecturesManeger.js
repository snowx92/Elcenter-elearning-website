var id = "";
var yearid = "";
var userid = '';


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user);
        userid = user.uid;
        // User is signed in.
        getpersonalInfo();
    } else {
       // document.location.href = "index.html";
    }
});

function importlesson() {

    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var m = String(date.getMonth() + 1).padStart(2, '0');
    var h = String(date.getHours()).padStart(2, '0');
    var mu = String(date.getMinutes()).padStart(2, '0');
    var yyyy = date.getFullYear();
    var d = yyyy + "-" + m + "-" + dd + "T" + h + ":" + mu;


    var ref = firebase.database().ref().child(yearid).child(yearid + id).child("lectures").on("value", function(snapshot) {

        snapshot.forEach(function(childs) {



            if (childs.child("enable").val() == true) {



                if (parseInt(yyyy) >= parseInt(childs.child("year").val()) ||(
                    parseInt(m) >= parseInt(childs.child("month").val()) &&
                    parseInt(dd) >= parseInt(childs.child("day").val()))) {




                    if (parseInt(yyyy) == parseInt(childs.child("year").val()) &&
                        parseInt(m) == parseInt(childs.child("month").val()) &&
                        parseInt(dd) == parseInt(childs.child("day").val())) {

                        console.log("lol what ");
                        if (parseInt(h) > parseInt(childs.child("houre").val()) || (parseInt(h) == parseInt(childs.child("houre").val()) && parseInt(mu) >= parseInt(childs.child("minutes").val()))) {


                            let li = document.createElement("li");
                            let div = document.createElement("div");
                            li.appendChild(div);

                            let div2 = document.createElement("div");
                            div2.className = "rc-WeekCard card-rich-interaction";
                            div.appendChild(div2);

                            let div3 = document.createElement("div");
                            div3.className = "rc-WeekCardHeader";
                            div2.appendChild(div3)

                            let div4 = document.createElement("div");
                            div4.className = "_1m60kc1p content";
                            div3.appendChild(div4)

                            let div5 = document.createElement("div");
                            div5.className = "_1m60kc1p";
                            div4.appendChild(div5);

                            let div6 = document.createElement("div");
                            div6.className = "week-number body-2-text";
                            div5.appendChild(div6)



                            let div7 = document.createElement("div");
                            div7.className = "_1w1osgwu";
                            div4.appendChild(div7);

                            let p2 = document.createElement("p");
                            p2.style = "padding-left: 15px; font-weight: bold";

                            let span2 = document.createElement("span");
                            span2.innerText = childs.child("lecname").val();
                            p2.appendChild(span2);
                            div7.appendChild(p2);


                            let div8 = document.createElement("div");
                            div8.className = "_1ip4vj7r rc-WeekCardBody";
                            div2.appendChild(div8);

                            let div9 = document.createElement("div");
                            div9.className = "_msg5sa";
                            div8.appendChild(div9);

                            let div10 = document.createElement("div");
                            div9.appendChild(div10);


                            let div11 = document.createElement("div");
                            div11.className = "body-content";
                            div10.appendChild(div11);


                            let section1 = document.createElement("section");
                            section1.className = "module-section";
                            div11.appendChild(section1);

                            let h41 = document.createElement("h4");
                            h41.className = "headline-1-text moudle-title";
                            h41.innerText = childs.child("discription").val();
                            section1.appendChild(h41);


                            let div12 = document.createElement("div");
                            div12.className = "card-body";
                            section1.appendChild(div12);

                            let h51 = document.createElement("h5");
                            h51.className = "card-title";
                            h51.innerText = childs.child("lecdiscription").val();
                            div12.appendChild(h51);

                            let a1 = document.createElement("a");
                            a1.className = "btn btn-primary";
                            a1.innerText = "الذهاب الى المحاضره";

                            a1.id = childs.child("lecid").val();
                            //a1.href= "Lecture.html";
                            a1.setAttribute("onclick", "savelecinfo(this.id)");
                            div12.appendChild(a1);


                            var x = document.getElementById("con");
                            x.appendChild(li);

                            let li2 = document.createElement("li");
                            li2.className = "nav-item dropdown";


                            let a2 = document.createElement('a');
                            a2.innerText = childs.child("lecname").val();
                            a2.className = "linkk";
                            //a2.href = "Lecture.html";
                            a2.id = childs.child("lecid").val();
                            a2.setAttribute("onclick", "savelecinfo(this.id)");
                            li2.appendChild(a2);
                            var y = document.getElementById("lec12");
                            y.appendChild(li2);

                        }

                    } else {

                        let li = document.createElement("li");
                        let div = document.createElement("div");
                        li.appendChild(div);

                        let div2 = document.createElement("div");
                        div2.className = "rc-WeekCard card-rich-interaction";
                        div.appendChild(div2);

                        let div3 = document.createElement("div");
                        div3.className = "rc-WeekCardHeader";
                        div2.appendChild(div3)

                        let div4 = document.createElement("div");
                        div4.className = "_1m60kc1p content";
                        div3.appendChild(div4)

                        let div5 = document.createElement("div");
                        div5.className = "_1m60kc1p";
                        div4.appendChild(div5);

                        let div6 = document.createElement("div");
                        div6.className = "week-number body-2-text";
                        div5.appendChild(div6)




                        let div7 = document.createElement("div");
                        div7.className = "_1w1osgwu";
                        div4.appendChild(div7);

                        let p2 = document.createElement("p");
                        p2.style = "padding-left: 15px; font-weight: bold";

                        let span2 = document.createElement("span");
                        span2.innerText = childs.child("discription").val();
                        p2.appendChild(span2);
                        div7.appendChild(p2);


                        let div8 = document.createElement("div");
                        div8.className = "_1ip4vj7r rc-WeekCardBody";
                        div2.appendChild(div8);

                        let div9 = document.createElement("div");
                        div9.className = "_msg5sa";
                        div8.appendChild(div9);

                        let div10 = document.createElement("div");
                        div9.appendChild(div10);


                        let div11 = document.createElement("div");
                        div11.className = "body-content";
                        div10.appendChild(div11);


                        let section1 = document.createElement("section");
                        section1.className = "module-section";
                        div11.appendChild(section1);

                        let h41 = document.createElement("h4");
                        h41.className = "headline-1-text moudle-title";
                        h41.innerText = childs.child("lecname").val();
                        section1.appendChild(h41);


                        let div12 = document.createElement("div");
                        div12.className = "card-body";
                        section1.appendChild(div12);

                        let h51 = document.createElement("h5");
                        h51.className = "card-title";
                        h51.innerText = childs.child("lecdiscription").val();
                        div12.appendChild(h51);

                        let a1 = document.createElement("a");
                        a1.className = "btn btn-primary";
                        a1.innerText = "الذهاب الى المحاضره";

                        a1.id = childs.child("lecid").val();
                        //a1.href= "Lecture.html";
                        a1.setAttribute("onclick", "savelecinfo(this.id)");
                        div12.appendChild(a1);


                        var x = document.getElementById("con");
                        x.appendChild(li);

                        let li2 = document.createElement("li");
                        li2.className = "nav-item dropdown";


                        let a2 = document.createElement('a');
                        a2.innerText = childs.child("lecname").val();
                        //a2.href = "Lecture.html";
                        a2.id = childs.child("lecid").val();
                        a2.setAttribute("onclick", "savelecinfo(this.id)");
                        li2.appendChild(a2);
                        var y = document.getElementById("lec12");
                        y.appendChild(li2);


                    }

                }

            } else {
                console.log("fijfq");
            }
        })


    })

}

function getpersonalInfo() {
    console.log(id);
    var ref = firebase.database().ref().child(yearid).child(yearid + id).once("value").then((snapshpt)=>{


        console.log(snapshpt.child("name").val());
        document.getElementById("username").innerHTML = snapshpt.child("name").val();
        document.getElementById("name").innerHTML = snapshpt.child("subject").val();

        document.getElementById("pic").src = snapshpt.child("img").val();

        let div = document.createElement("div");
        div.className = "Teacher-name";
        let p = document.createElement('p');
        p.innerText = "بواسطه  ";
        div.appendChild(p);
        let span = document.createElement("span");
        span.innerText = snapshpt.child("name").val();

        p.appendChild(span);
        let z = document.getElementById("Header");
        z.appendChild(div);

    })



}

function importTeacherInfo() {

    var sessionstring = sessionStorage.getItem('teachersinfo');
    id = JSON.parse(sessionstring);
    var yearselected = sessionStorage.getItem("yearinfo");
    yearid = JSON.parse(yearselected);
    console.log(yearid);

    importlesson();

}

function purchase_lecture() {
    var f = false;
    var code1 = document.getElementById("code").value;
    var lecidv = document.getElementById("code").name;

    let refff = firebase.database().ref().child(yearid).child(yearid + id).child("codes").once("value").then((snap) => {

        snap.forEach(function(code) {

            if (code.child("code").val() == code1 && code.child("used").val() == false) {
                alert("تم شراء المحاضرة بنجاح");
                firebase.database().ref().child(yearid).child(yearid + id).child("codes").child(code.child("code").val()).set({

                    code: code.child("code").val(),
                    used: true
                });


                f = true;

                //-MPpSWO2H2I8Msb_wwH6
                var add = firebase.database().ref().child(yearid).child(yearid + id).child("lectures").child(lecidv).once("value").then((snapshot) => {

                    firebase.database().ref().child(yearid).child(yearid + id).once("value").then((snapp) => {
                        var v = parseInt(snapp.child("views").val());
                        v++;
                        console.log(v);
                        firebase.database().ref().child(yearid).child(yearid + id).child("views").set(v);

                    });

                    var v2 = parseInt(snapshot.child("views").val());
                    v2++;
                    firebase.database().ref().child(yearid).child(yearid + id).child("lectures").child(lecidv).child("views").set(v2);

                    var map = {
                        yearid: yearid,
                        teacherid: id,
                        quiz: snapshot.child("Quiz").val(),
                        LVL: snapshot.child("LVL").val(),
                        PDF: snapshot.child("PDF").val(),
                        LVLname: snapshot.child("LVLname").val(),
                        PDFname: snapshot.child("PDFname").val(),
                        discription: snapshot.child("discription").val(),
                        lecname: snapshot.child("lecname").val(),
                        lecid: snapshot.child("lecid").val(),
                        teachername: snapshot.child("teachername").val(),
                        img: "data:image/svg+xml;base64,PD93bWwgdmVyc2lvbj0iMS4wIj8+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNjAiIGhlaWdodD0iMzYwIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2IoMTc4LCAxOTAsIDE5NSkiIC8+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2RkZCIgc3R5bGU9Im9wYWNpdHk6MC4xMjQ7c3Ryb2tlLXdpZHRoOjEwcHg7IiAvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEyLjUiIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4xNSIgLz48Y2lyY2xlIGN4PSI5MCIgY3k9IjMwIiByPSIyNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZGRkIiBzdHlsZT0ib3BhY2l0eTowLjEyNDtzdHJva2Utd2lkdGg6MTBweDsiIC8+PGNpcmNsZSBjeD0iOTAiIGN5PSIzMCIgcj0iMTIuNSIgZmlsbD0iIzIyMiIgZmlsbC1vcGFjaXR5PSIwLjExNTMzMzMzMzMzMzMzIiAvPjxjaXJjbGUgY3g9IjE1MCIgY3k9IjMwIiByPSIyNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZGRkIiBzdHlsZT0ib3BhY2l0eTowLjA4OTMzMzMzMzMzMzMzMztzdHJva2Utd2lkdGg6MTBweDsiIC8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iMzAiIHI9IjEyLjUiIGZpbGw9IiNkZGQiIGZpbGwtb3BhY2l0eT0iMC4xMjQiIC8+PGNpcmNsZSBjeD0iMjEwIiBjeT0iMzAiIHI9IjI1IiBmaWxsPSJub25lIiBzdHJva2U9IiNkZGQiIHN0eWxlPSJvcGFjaXR5OjAuMTI0O3N0cm9rZS13aWR0aDoxMHB4OyIgLz48Y2lyY2xlIGN4PSIyMTAiIGN5PSIzMCIgcj0iMTIuNSIgZmlsbD0iIzIyMiIgZmlsbC1vcGFjaXR5PSIwLjAyODY2NjY2NjY2NjY2NyIgLz48Y2lyY2xlIGN4PSIyNzAiIGN5PSIzMCIgcj0iMjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzIyMiIgc3R5bGU9Im9wYWNpdHk6MC4xMzI2NjY2NjY2NjY2NztzdHJva2Utd2lkdGg6MTBweDsiIC8+PGNpcmNsZSBjeD0iMjcwIiBjeT0iMzAiIHI9IjEyLjUiIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNjMzMzMzMzMzMzMzMzMiIC8+PGNpcmNsZSBjeD0iMzMwIiBjeT0iMzAiIHI9IjI1IiBmaWxsPSJub25lIiBzdHJva2U9IiMyMjIiIHN0eWxlPSJvcGFjaXR5OjAuMDI4NjY2NjY2NjY2NjY3O3N0cm9rZS13aWR0aDoxMHB4OyIgLz48Y2lyY2xlIGN4PSIzMzAiIGN5PSIzMCIgcj0iMTIuNSIgZmlsbD0iIzIyMiIgZmlsbC1vcGFjaXR5PSIwLjA4MDY2NjY2NjY2NjY2NyIgLz48Y2lyY2xlIGN4PSIzMCIgY3k9IjkwIiByPSIyNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZGRkIiBzdHlsZT0ib3BhY2l0eTowLjEyNDtzdHJva2Utd2lkdGg6MTBweDsiIC8+PGNpcmNsZSBjeD0iMzAiIGN5PSI5MCIgcj0iMTIuNSIgZmlsbD0iI2RkZCIgZmlsbC1vcGFjaXR5PSIwLjA1NDY2NjY2NjY2NjY2NyIgLz48Y2lyY2xlIGN4PSI5MCIgY3k9IjkwIiByPSIyNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZGRkIiBzdHlsZT0ib3BhY2l0eTowLjE0MTMzMzMzMzMzMzMzO3N0cm9rZS13aWR0aDoxMHB4OyIgLz48Y2lyY2xlIGN4PSI5MCIgY3k9IjkwIiByPSIxMi41IiBmaWxsPSIjZGRkIiBmaWxsLW9wYWNpdHk9IjAuMTQxMzMzMzMzMzMzMzMiIC8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iOTAiIHI9IjI1IiBmaWxsPSJub25lIiBzdHJva2U9IiNkZGQiIHN0eWxlPSJvcGFjaXR5OjAuMTQxMzMzMzMzMzMzMzM7c3Ryb2tlLXdpZHRoOjEwcHg7IiAvPjxjaXJjbGUgY3g9IjE1MCIgY3k9IjkwIiByPSIxMi41IiBmaWxsPSIjZGRkIiBmaWxsLW9wYWNpdHk9IjAuMTA2NjY2NjY2NjY2NjciIC8+PGNpcmNsZSBjeD0iMjEwIiBjeT0iOTAiIHI9IjI1IiBmaWxsPSJub25lIiBzdHJva2U9IiMyMjIiIHN0eWxlPSJvcGFjaXR5OjAuMTMyNjY2NjY2NjY2Njc7c3Ryb2tlLXdpZHRoOjEwcHg7IiAvPjxjaXJjbGUgY3g9IjIxMCIgY3k9IjkwIiByPSIxMi41IiBmaWxsPSIjZGRkIiBmaWxsLW9wYWNpdHk9IjAuMDIiIC8+PGNpcmNsZSBjeD0iMjcwIiBjeT0iOTAiIHI9IjI1IiBmaWxsPSJub25lIiBzdHJva2U9IiMyMjIiIHN0eWxlPSJvcGFjaXR5OjAuMDYzMzMzMzMzMzMzMzMzO3N0cm9rZS13aWR0aDoxMHB4OyIgLz48Y2lyY2xlIGN4PSIyNzAiIGN5PSI5MCIgcj0iMTIuNSIgZmlsbD0iIzIyMiIgZmlsbC1vcGFjaXR5PSIwLjEzMjY2NjY2NjY2NjY3IiAvPjxjaXJjbGUgY3g9IjMzMCIgY3k9IjkwIiByPSIyNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZGRkIiBzdHlsZT0ib3BhY2l0eTowLjA4OTMzMzMzMzMzMzMzMztzdHJva2Utd2lkdGg6MTBweDsiIC8+PGNpcmNsZSBjeD0iMzMwIiBjeT0iOTAiIHI9IjEyLjUiIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNDYiIC8+PGNpcmNsZSBjeD0iMzAiIGN5PSIxNTAiIHI9IjI1IiBmaWxsPSJub25lIiBzdHJva2U9IiNkZGQiIHN0eWxlPSJvcGFjaXR5OjAuMTQxMzMzMzMzMzMzMzM7c3Ryb2tlLXdpZHRoOjEwcHg7IiAvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMTUwIiByPSIxMi41IiBmaWxsPSIjZGRkIiBmaWxsLW9wYWNpdHk9IjAuMTI0IiAvPjxjaXJjbGUgY3g9IjkwIiBjeT0iMTUwIiByPSIyNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjIyIiBzdHlsZT0ib3BhY2l0eTowLjAyODY2NjY2NjY2NjY2NztzdHJva2Utd2lkdGg6MTBweDsiIC8+PGNpcmNsZSBjeD0iOTAiIGN5PSIxNTAiIHI9IjEyLjUiIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNjMzMzMzMzMzMzMzMzMiIC8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iMTUwIiByPSIyNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjIyIiBzdHlsZT0ib3BhY2l0eTowLjA4MDY2NjY2NjY2NjY2NztzdHJva2Utd2lkdGg6MTBweDsiIC8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iMTUwIiByPSIxMi41IiBmaWxsPSIjZGRkIiBmaWxsLW9wYWNpdHk9IjAuMDU0NjY2NjY2NjY2NjY3IiAvPjxjaXJjbGUgY3g9IjIxMCIgY3k9IjE1MCIgcj0iMjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzIyMiIgc3R5bGU9Im9wYWNpdHk6MC4wNjMzMzMzMzMzMzMzMzM7c3Ryb2tlLXdpZHRoOjEwcHg7IiAvPjxjaXJjbGUgY3g9IjIxMCIgY3k9IjE1MCIgcj0iMTIuNSIgZmlsbD0iI2RkZCIgZmlsbC1vcGFjaXR5PSIwLjEwNjY2NjY2NjY2NjY3IiAvPjxjaXJjbGUgY3g9IjI3MCIgY3k9IjE1MCIgcj0iMjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzIyMiIgc3R5bGU9Im9wYWNpdHk6MC4wNjMzMzMzMzMzMzMzMzM7c3Ryb2tlLXdpZHRoOjEwcHg7IiAvPjxjaXJjbGUgY3g9IjI3MCIgY3k9IjE1MCIgcj0iMTIuNSIgZmlsbD0iIzIyMiIgZmlsbC1vcGFjaXR5PSIwLjE1IiAvPjxjaXJjbGUgY3g9IjMzMCIgY3k9IjE1MCIgcj0iMjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzIyMiIgc3R5bGU9Im9wYWNpdHk6MC4xMTUzMzMzMzMzMzMzMztzdHJva2Utd2lkdGg6MTBweDsiIC8+PGNpcmNsZSBjeD0iMzMwIiBjeT0iMTUwIiByPSIxMi41IiBmaWxsPSIjMjIyIiBmaWxsLW9wYWNpdHk9IjAuMTUiIC8+PGNpcmNsZSBjeD0iMzAiIGN5PSIyMTAiIHI9IjI1IiBmaWxsPSJub25lIiBzdHJva2U9IiNkZGQiIHN0eWxlPSJvcGFjaXR5OjAuMDM3MzMzMzMzMzMzMzMzO3N0cm9rZS13aWR0aDoxMHB4OyIgLz48Y2lyY2xlIGN4PSIzMCIgY3k9IjIxMCIgcj0iMTIuNSIgZmlsbD0iI2RkZCIgZmlsbC1vcGFjaXR5PSIwLjEyNCIgLz48Y2lyY2xlIGN4PSI5MCIgY3k9IjIxMCIgcj0iMjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2RkZCIgc3R5bGU9Im9wYWNpdHk6MC4wODkzMzMzMzMzMzMzMzM7c3Ryb2tlLXdpZHRoOjEwcHg7IiAvPjxjaXJjbGUgY3g9IjkwIiBjeT0iMjEwIiByPSIxMi41IiBmaWxsPSIjZGRkIiBmaWxsLW9wYWNpdHk9IjAuMTA2NjY2NjY2NjY2NjciIC8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iMjEwIiByPSIyNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZGRkIiBzdHlsZT0ib3BhY2l0eTowLjEwNjY2NjY2NjY2NjY3O3N0cm9rZS13aWR0aDoxMHB4OyIgLz48Y2lyY2xlIGN4PSIxNTAiIGN5PSIyMTAiIHI9IjEyLjUiIGZpbGw9IiNkZGQiIGZpbGwtb3BhY2l0eT0iMC4wODkzMzMzMzMzMzMzMzMiIC8+PGNpcmNsZSBjeD0iMjEwIiBjeT0iMjEwIiByPSIyNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZGRkIiBzdHlsZT0ib3BhY2l0eTowLjEyNDtzdHJva2Utd2lkdGg6MTBweDsiIC8+PGNpcmNsZSBjeD0iMjEwIiBjeT0iMjEwIiByPSIxMi41IiBmaWxsPSIjZGRkIiBmaWxsLW9wYWNpdHk9IjAuMDM3MzMzMzMzMzMzMzMzIiAvPjxjaXJjbGUgY3g9IjI3MCIgY3k9IjIxMCIgcj0iMjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzIyMiIgc3R5bGU9Im9wYWNpdHk6MC4xNTtzdHJva2Utd2lkdGg6MTBweDsiIC8+PGNpcmNsZSBjeD0iMjcwIiBjeT0iMjEwIiByPSIxMi41IiBmaWxsPSIjMjIyIiBmaWxsLW9wYWNpdHk9IjAuMTE1MzMzMzMzMzMzMzMiIC8+PGNpcmNsZSBjeD0iMzMwIiBjeT0iMjEwIiByPSIyNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjIyIiBzdHlsZT0ib3BhY2l0eTowLjE1O3N0cm9rZS13aWR0aDoxMHB4OyIgLz48Y2lyY2xlIGN4PSIzMzAiIGN5PSIyMTAiIHI9IjEyLjUiIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNjMzMzMzMzMzMzMzMzMiIC8+PGNpcmNsZSBjeD0iMzAiIGN5PSIyNzAiIHI9IjI1IiBmaWxsPSJub25lIiBzdHJva2U9IiNkZGQiIHN0eWxlPSJvcGFjaXR5OjAuMTA2NjY2NjY2NjY2Njc7c3Ryb2tlLXdpZHRoOjEwcHg7IiAvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMjcwIiByPSIxMi41IiBmaWxsPSIjMjIyIiBmaWxsLW9wYWNpdHk9IjAuMDYzMzMzMzMzMzMzMzMzIiAvPjxjaXJjbGUgY3g9IjkwIiBjeT0iMjcwIiByPSIyNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZGRkIiBzdHlsZT0ib3BhY2l0eTowLjA1NDY2NjY2NjY2NjY2NztzdHJva2Utd2lkdGg6MTBweDsiIC8+PGNpcmNsZSBjeD0iOTAiIGN5PSIyNzAiIHI9IjEyLjUiIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wODA2NjY2NjY2NjY2NjciIC8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iMjcwIiByPSIyNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjIyIiBzdHlsZT0ib3BhY2l0eTowLjA2MzMzMzMzMzMzMzMzMztzdHJva2Utd2lkdGg6MTBweDsiIC8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iMjcwIiByPSIxMi41IiBmaWxsPSIjMjIyIiBmaWxsLW9wYWNpdHk9IjAuMDI4NjY2NjY2NjY2NjY3IiAvPjxjaXJjbGUgY3g9IjIxMCIgY3k9IjI3MCIgcj0iMjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2RkZCIgc3R5bGU9Im9wYWNpdHk6MC4xMjQ7c3Ryb2tlLXdpZHRoOjEwcHg7IiAvPjxjaXJjbGUgY3g9IjIxMCIgY3k9IjI3MCIgcj0iMTIuNSIgZmlsbD0iI2RkZCIgZmlsbC1vcGFjaXR5PSIwLjE0MTMzMzMzMzMzMzMzIiAvPjxjaXJjbGUgY3g9IjI3MCIgY3k9IjI3MCIgcj0iMjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzIyMiIgc3R5bGU9Im9wYWNpdHk6MC4wNDY7c3Ryb2tlLXdpZHRoOjEwcHg7IiAvPjxjaXJjbGUgY3g9IjI3MCIgY3k9IjI3MCIgcj0iMTIuNSIgZmlsbD0iI2RkZCIgZmlsbC1vcGFjaXR5PSIwLjA4OTMzMzMzMzMzMzMzMyIgLz48Y2lyY2xlIGN4PSIzMzAiIGN5PSIyNzAiIHI9IjI1IiBmaWxsPSJub25lIiBzdHJva2U9IiMyMjIiIHN0eWxlPSJvcGFjaXR5OjAuMTMyNjY2NjY2NjY2Njc7c3Ryb2tlLXdpZHRoOjEwcHg7IiAvPjxjaXJjbGUgY3g9IjMzMCIgY3k9IjI3MCIgcj0iMTIuNSIgZmlsbD0iIzIyMiIgZmlsbC1vcGFjaXR5PSIwLjA2MzMzMzMzMzMzMzMzMyIgLz48Y2lyY2xlIGN4PSIzMCIgY3k9IjMzMCIgcj0iMjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2RkZCIgc3R5bGU9Im9wYWNpdHk6MC4wMjtzdHJva2Utd2lkdGg6MTBweDsiIC8+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMzAiIHI9IjEyLjUiIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4xMzI2NjY2NjY2NjY2NyIgLz48Y2lyY2xlIGN4PSI5MCIgY3k9IjMzMCIgcj0iMjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2RkZCIgc3R5bGU9Im9wYWNpdHk6MC4xMDY2NjY2NjY2NjY2NztzdHJva2Utd2lkdGg6MTBweDsiIC8+PGNpcmNsZSBjeD0iOTAiIGN5PSIzMzAiIHI9IjEyLjUiIGZpbGw9IiNkZGQiIGZpbGwtb3BhY2l0eT0iMC4xNDEzMzMzMzMzMzMzMyIgLz48Y2lyY2xlIGN4PSIxNTAiIGN5PSIzMzAiIHI9IjI1IiBmaWxsPSJub25lIiBzdHJva2U9IiNkZGQiIHN0eWxlPSJvcGFjaXR5OjAuMTQxMzMzMzMzMzMzMzM7c3Ryb2tlLXdpZHRoOjEwcHg7IiAvPjxjaXJjbGUgY3g9IjE1MCIgY3k9IjMzMCIgcj0iMTIuNSIgZmlsbD0iI2RkZCIgZmlsbC1vcGFjaXR5PSIwLjE0MTMzMzMzMzMzMzMzIiAvPjxjaXJjbGUgY3g9IjIxMCIgY3k9IjMzMCIgcj0iMjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2RkZCIgc3R5bGU9Im9wYWNpdHk6MC4wNTQ2NjY2NjY2NjY2Njc7c3Ryb2tlLXdpZHRoOjEwcHg7IiAvPjxjaXJjbGUgY3g9IjIxMCIgY3k9IjMzMCIgcj0iMTIuNSIgZmlsbD0iI2RkZCIgZmlsbC1vcGFjaXR5PSIwLjEyNCIgLz48Y2lyY2xlIGN4PSIyNzAiIGN5PSIzMzAiIHI9IjI1IiBmaWxsPSJub25lIiBzdHJva2U9IiMyMjIiIHN0eWxlPSJvcGFjaXR5OjAuMDgwNjY2NjY2NjY2NjY3O3N0cm9rZS13aWR0aDoxMHB4OyIgLz48Y2lyY2xlIGN4PSIyNzAiIGN5PSIzMzAiIHI9IjEyLjUiIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wMjg2NjY2NjY2NjY2NjciIC8+PGNpcmNsZSBjeD0iMzMwIiBjeT0iMzMwIiByPSIyNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjIyIiBzdHlsZT0ib3BhY2l0eTowLjA2MzMzMzMzMzMzMzMzMztzdHJva2Utd2lkdGg6MTBweDsiIC8+PGNpcmNsZSBjeD0iMzMwIiBjeT0iMzMwIiByPSIxMi41IiBmaWxsPSIjMjIyIiBmaWxsLW9wYWNpdHk9IjAuMTMyNjY2NjY2NjY2NjciIC8+PC9zdmc+",
                        enable: true
                    };

                    firebase.database().ref().child("Student").child(userid).child("purchasedlectures").child(lecidv).set(map);
                    window.location.href = "Lecture.html";

                })

            }

        })

        if (!f) {

            alert("الكود الذي ادخلتة غير صحيح");
        }

    });
}

function savelecinfo(lol) {
    var f = false;
    console.log(userid);
    let reff = firebase.database().ref().child("Student").child(userid).once("value").then((snap) => {

        snap.child("purchasedlectures").forEach(function(lecid) {
            if (lecid.child("lecid").val() == lol) {
                f = true;

            }

        });

        if (f) {

            //var money = snap.child("money").val();
            //if (money >= 5) {
            //	money -= 5;
            //firebase.database().ref().child("Student").child(userid).child("money").set(money);
            //alert("تم خصم خمسة جنية")
            //console.log("lele");
            window.location.href = "Lecture.html";
            //}
            //else{
            //	alert("لا يوجد لديك رصيد كافي الرجاء الذهاب الي المحفظة");
            //}

        }

        if (f == false) {

            console.log("ijfwljfwe");
            var d = document.getElementById("code");
            d.name = lol;
            $("#exampleModal").modal();
        }

    });
    sessionStorage.setItem("lecid", JSON.stringify(lol));
    sessionStorage.setItem("yearid", JSON.stringify(yearid));
    sessionStorage.setItem("teacherid", JSON.stringify(yearid + id));

}

function chat() {

    var fff = false;
    firebase.database().ref().child("Student").child(userid).child("chat").once("value").then((snap) => {

        snap.forEach(function(chat) {


            if (chat.child("id").val() == id) {
                sessionStorage.setItem("chatid", JSON.stringify(chat.child("chatid").val()));
                fff = true;
                console.log(id, " " + chat.child("id").val());
                sessionStorage.setItem("id", JSON.stringify(chat.child("id").val()));
                //sessionStorage.setItem("chatid", JSON.stringify(key.key));
                sessionStorage.setItem("id", JSON.stringify(id));
                sessionStorage.setItem("from", JSON.stringify("Student"));
                sessionStorage.setItem("to", JSON.stringify("teachers"));
                window.location.href = 'chat.html';
            }


        });


        if (!fff) {

            var date = new Date();
            var h = String(date.getHours()).padStart(2, '0');
            var mu = String(date.getMinutes()).padStart(2, '0');
            var houres = h + ":" + mu;

            var dd = String(date.getDate()).padStart(2, '0');
            var m = String(date.getMonth() + 1).padStart(2, '0');



            var key = firebase.database().ref().child(userid).child("chat").push();
            firebase.database().ref().child("Student").child(userid).child("chat").child(key.key).set({

                chatid: key.key,
                id: id
            })


            firebase.database().ref().child("teachers").child(id).child("chat").child(key.key).set({

                chatid: key.key,
                id: userid
            })



            firebase.database().ref().child("chat").child(key.key).child(userid).push().set({

                sentfrom: "Admin",
                Message: "Now you can connect with this person",
                time_sent: houres,
                date: dd + "/" + m,
                read: true
            })

            firebase.database().ref().child("chat").child(key.key).child(id).push().set({

                sentfrom: "Admin",
                Message: "Now you can connect with this person",
                time_sent: houres,
                date: dd + "/" + m,
                read: true
            })
            console.log("piwhfpijf");
            sessionStorage.setItem("chatid", JSON.stringify(key.key));
            sessionStorage.setItem("id", JSON.stringify(id));
            sessionStorage.setItem("from", JSON.stringify("Student"));
            sessionStorage.setItem("to", JSON.stringify("teachers"));
            window.location.href = 'chat.html';
            console.log("done babe");
        }


    });





}