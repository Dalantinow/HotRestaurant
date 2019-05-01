var express = require("express");
var path = require("path");

var app = express()
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reservations = [];

var waitlist = [];


app.get("/view", function (req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/make", function (req, res) {
    res.sendFile(path.join(__dirname, "make.html"))
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"))
});

app.get("/api/reservations", function (req, res) {
    return res.json(reservations);
});

app.get("/api/waitlist", function(req, res){
    return res.json(waitlist);
});

app.post("/api/reservations", function (req, res) {
    var newReservation = req.body;

    newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

    console.log(newReservation);

    if (reservations.length < 5) {
        reservations.push(newReservation);
    }
    else if (reservations.length >= 5) {
        waitlist.push(newReservation)
    }

    res.json(newReservation)

});

app.listen(PORT, function () {
    console.log("IM IN THE MAINFRAME " + PORT)
});
