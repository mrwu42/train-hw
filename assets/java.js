const firebaseConfig = {
    apiKey: "AIzaSyB0MGhQhLb8ZM2M4qlqvGHUcq30KRMh-UE",
    authDomain: "project1-60852.firebaseapp.com",
    databaseURL: "https://project1-60852.firebaseio.com",
    projectId: "project1-60852",
    storageBucket: "project1-60852.appspot.com",
    messagingSenderId: "850163236643",
    appId: "1:850163236643:web:27e59e0c9bbb8f3bf39696"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var trainData = firebase.database();

$("#addTrainBtn").on("click", function(){
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:MM").subtract(10, "years").format("X");
    var frequency = $("#frequencyInput").val().trim();
    return false;
})

trainData.ref().on("child_added", function(snapshot){
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain), "minutes") %frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, "m").format("hh:mm A");

    $("trainTable > tBody").append("<tr><td>" + name + "<td><td>" + destination +"<tr><td>" + frequency + "<td><td>" + arrival + "<td><td>" + minutes + "<td><tr>");
    
})