$(document).ready(function() {
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBjcBXR9QikG0CnIW6IvQngxb_QkakXsTg",
    authDomain: "train-scheduler-f982f.firebaseapp.com",
    databaseURL: "https://train-scheduler-f982f.firebaseio.com",
    projectId: "train-scheduler-f982f",
    storageBucket: "train-scheduler-f982f.appspot.com",
    messagingSenderId: "450750541783"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// console.log(firebase.database.ServerValue.TIMESTAMP)

var ref = database.ref();

// ref.on('value', getData)

// console.log(database)

var today = moment().format();
// console.log(today)



// var today = moment(new Date()); //todays date
// var end = moment("2015-09-02"); // another date
// var duration = moment.duration(today.diff(end));
var duration;
// console.log(months)


// var data = snapshot.val()
//     console.log("The start date is: " + data.startDate)
//     var start = moment(data.startDate, "MM/DD/YYYY");
//     console.log("Start is: " + start)
//     var durationS = moment.durationS(today.diff(start));






ref.on("child_added", function(snapshot) {


    var data = snapshot.val()
// console.log(fristTrain)
    var dateDiff = 0
    var convertedDate = moment().hour(data.fristTrain);
    // console.log(convertedDate)
    dateDiff = data.fristTrain + data.frequency

    // var now = moment().format("HH:mm A")
    // console.log(now)

    var next = data.fristTrain.add(data.frequency, "m")
    console.log(next)
    // console.log(dateDiff)
    // console.log("Today is: " + moment().format() + " start date is: " + convertedDate + " Date dif is: " + dateDiff);
    // var totalRate = dateDiff * data.frequency

 
 $("table").append("<tr><td>"+data.trainName+"</td><td>"+data.destination+"</td><td>"+data.frequency+"</td><td>"+dateDiff +"</td><td>"+data.fristTrain +"</td></tr>")

  
  // $("table").append("<tr><td>"+data.employeeName+"</td><td>"+data.role+"</td><td>"+data.startDate+"</td><td>"+duration+"</td><td>"+data.monthlyRate +"</td><td>Germany</td></tr>")


  // console.log( data.employeeName, data.role , data.startDate,  );
});










$("#submit").on("click", function(event) {

event.preventDefault();

// var mom = moment('171054', 'HHmmss');
// console.log(mom.format());
// console.log(mom.format('HH:mm:ss'));



var trainName = $("#trainName").val().trim();
var destination = $("#destination").val().trim()
var fristTrain = $("#fristTrain").val().trim();
// console.log(startDate)
var trainTime = moment(fristTrain, "HH:mm A")
var trainPretty = moment(trainTime).format("HH:mm A")

var nextArrival = moment(trainTime).diff(moment(), "minutes")
// var convertedDate = moment(new Date(startDate));
// startDate.format("DD/MM/YYYY")
var frequency =  $("#frequency").val().trim()


database.ref().push( {
    trainName: trainName,
    destination: destination,
    fristTrain: trainPretty,
    frequency: frequency,
    // monthsWorked: duration
    // totalBilled: 

})





})



// console.log(moment().format())


// console.log(moment(1318781876));




})