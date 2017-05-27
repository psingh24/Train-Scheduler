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

// fetch each child in the database and append them on the page
ref.on("child_added", function(snapshot) {
    var data = snapshot.val()
        $("table").append("<tr class='train' id='hello'><td>"+data.trainName+"</td><td>"+data.destination+"</td><td>"+data.frequency+"</td><td>"+data.nextArrival +"</td><td>"+data.nextTrain +"</td><td><button class='removeTrain btn btn-info'>Remove Train</button></td></tr>")
});

//On submit click....
$("#submit").on("click", function(event) {
     event.preventDefault();

    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim()
    firstTrain = $("#fristTrain").val().trim();
    frequency =  parseInt($("#frequency").val().trim())

    //Time conversion
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
// Remove train fuction, need to figure out how to remove from database as well
function removeTrain() {
    
     $(this).closest('tr').remove();
     getKey = $(this).parent().parent().attr("id");
     console.log(getKey)
     ref.child(getKey).remove();

}

//need to work on this
$(document).on("click", ".removeTrain", removeTrain)

//Sign In Area=======================================================================//

var provider = new firebase.auth.GoogleAuthProvider();
var user = firebase.auth().currentUser;
function googleSignIn() {
firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user.displayName)
           if (user) {
                // User is signed in.
                loadMainPage()
                } else {
                // No user is signed in.
                console.log("no one signed in")
                }
            
            // ...
            }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
  // ...
});
}

// Login page, click sign up
$(".signin").on("click", function(){
    // sign in via google
    googleSignIn();

})
//load main page after login
 function loadMainPage() {
     window.location = 'main.html';
 }

  

})