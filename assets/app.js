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
    // console.log(data)
    // console.log(Object.key)
    
    var key = ref.key
//  console.log(key)
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

//need to work on this
$(document).on("click", ".removeTrain", removeTrain)

//Sign In Area=======================================================================//

var provider = new firebase.auth.GoogleAuthProvider();
function googleSignIn() {
firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user.displayName)
           
            
            // ...
        }).then(function(){
             loadMainPage()
        
        
        
        
//         .catch(function(error) {
//             // Handle Errors here.
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             // The email of the user's account used.
//             var email = error.email;
//             // The firebase.auth.AuthCredential type that was used.
//             var credential = error.credential;
//   // ...
});
}

var user = firebase.auth().currentUser;
console.log(user)
if (user) {
  // User is signed in.
  console.log(user.displayName)
  loadMainPage()

} else {
  // No user is signed in.
}

// $(document).on("click", ".signin", googleSignIn)

$(".signin").on("click", function(){
     
    console.log("hello")
    googleSignIn();
   
//  setTimeout(loadMainPage, 10000)

})

 function loadMainPage() {
     window.location = 'main.html';
 }

  

})