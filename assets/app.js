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
var ref = database.ref("train");
var trainName; 
var destination; 
var firstTrain;
var frequency; 
var firstTimeConverted; 
var diffTime; 
var Remainder; 
var minTillNextTrain; 
var nextTrain; 
var nextTrainFormatted; 


ref.on("child_added", function(snapshot) {
    var data = snapshot.val()
    console.log(data)
    console.log(Object.key)
    
    var key = ref.key
 console.log(key)
        $("table").append("<tr class='train' id='hello'><td>"+data.trainName+"</td><td>"+data.destination+"</td><td>"+data.frequency+"</td><td>"+data.nextArrival +"</td><td>"+data.nextTrain +"</td><td><button class='removeTrain btn btn-info'>Remove Train</button></td></tr>")
});

$("#submit").on("click", function(event) {

    event.preventDefault();

    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim()
    firstTrain = $("#fristTrain").val().trim();
    frequency =  parseInt($("#frequency").val().trim())


    firstTimeConverted = moment(firstTrain, "hh:mm");
    diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    Remainder = diffTime % frequency;
    minTillNextTrain = frequency - Remainder;
    nextTrain = moment().add(minTillNextTrain, "minutes");
    nextTrainFormatted = moment(nextTrain).format("hh:mm A");
          

        database.ref("train").push( {
            trainName: trainName,
            destination: destination,
            fristTrain: firstTrain,
            frequency: frequency,
            nextTrain: minTillNextTrain,
            nextArrival: nextTrainFormatted

        })

       $("#trainName").val('')
        $("#destination").val('')
        $("#fristTrain").val('')
        $("#frequency").val('')

    })

function removeTrain() {
    
     $(this).closest('tr').remove();
     getKey = $(this).parent().parent().attr("id");
     console.log(getKey)
     ref.child(getKey).remove();

}


$(document).on("click", ".removeTrain", removeTrain)



function signIn() {
    $("#main").hide()
}     
signIn()
})