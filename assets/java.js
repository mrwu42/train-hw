var firebaseConfig = {
    apiKey: "AIzaSyCXlF-_hixBYTI0rSzOVqcS2K4a8SlABAg",
    authDomain: "train-6f27e.firebaseapp.com",
    databaseURL: "https://train-6f27e.firebaseio.com",
    projectId: "train-6f27e",
    storageBucket: "train-6f27e.appspot.com",
    messagingSenderId: "198859784844",
    appId: "1:198859784844:web:109e25f2177ef0aeb771a9",
    measurementId: "G-09SW3HXB7T"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var trainData = firebase.database();

$("#addTrainBtn").on("click", function(){
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequencyInput").val().trim();
    console.log("firsttrain " + firstTrain);
    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    trainData.ref().push(newTrain)

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    return false;
})

trainData.ref().on("child_added", function(snapshot){
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain), "minutes") %frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, "m").format("hh:mm");

    console.log(firstTrain);
    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

    

    

    $("#traintable").append("<tr><td>" + name + "</td><td>" + destination +"</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");
    
})