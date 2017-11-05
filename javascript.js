var url= "https://trainschedule-77f17.firebaseio.com";

 var config = {
    apiKey: "AIzaSyBpAGSgLVaoq8wqzSxV66ZRCHY9I85HSB8",
    authDomain: "trainschedule-77f17.firebaseapp.com",
    databaseURL: "https://trainschedule-77f17.firebaseio.com",

    storageBucket: "",

  };
  firebase.initializeApp(config);

  var database= firebase.database();


  var name= '';
  var destination=''
  var firstTrainTime= ' '
  var frequency = ''
  var nextTrain = '';
  var nextTrainTime= ''
  var timeAway = '';
  var timeConverted='';
  var currentTime= '';
  var diffTime= '';
  var remainder= '';
  var timeTillTrain= '';
 var getKey= '';


  $(document).ready(function(){

  	$("#add-train").on("click", function(event){
        event.preventDefault();


  	var	name= $("#name-input").val().trim();
      destination= $("#destination-input").val().trim();
  	

      firstTrainTime= $("#first-train-time-input").val().trim();

      frequency= $("#frequency-input").val().trim();
  console.log (name)
  console.log (destination);
  console.log (firstTrainTime)
  console.log (frequency)
      timeConverted= moment(firstTrainTime, "hh:mm").subtract(1, "years");
      currentTime= moment();
      diffTime= moment().diff(moment(timeConverted), "minutes");
      remainder= diffTime % frequency;
      timeTillTrain= frequency - remainder;
      nextTrain= moment().add(timeTillTrain, "minutes");
      nextTrainTime= moment(nextTrain).format("hh:mm")

  console.log(timeConverted)
   console.log(diffTime)
    console.log(currentTime)
     console.log(timeTillTrain)

      var newTrain = {
           name: name,
          destination: destination,
          firstTrainTime: firstTrainTime,
          frequency: frequency,
          nextTrainTime: nextTrainTime,
         timeTillTrain: timeTillTrain
        };


      database.ref().push(newTrain)





      });

      $("#name-input").val('');
      $("#destination-input").val('');
      $("#first-train-time-input").val('');
      $("#frequency-input").val('');

      return false;


  	});

 database.ref().on("child_added", function(snapshot) {


    $('.train-schedule').append("<tr class='table-row' id=" + "'" + snapshot.val() + "'" + ">" +
               "<td class='col-xs-3'>" + snapshot.val().name +
               "</td>" +
               "<td class='col-xs-2'>" + snapshot.val().destination +
               "</td>" +
               "<td class='col-xs-2'>" + snapshot.val().frequency +
               "</td>" +
               "<td class='col-xs-2'>" + snapshot.val().nextTrainTime + // Next Arrival Formula ()
               "</td>" +
               "<td class='col-xs-2'>" + snapshot.val().timeTillTrain + // Minutes Away Formula
               "</td>" +
               "<td class='col-xs-1'>" + "<input type='submit' value='remove train' class='remove-train btn btn-primary btn-sm'>" + "</td>" +
          "</tr>");

}, function(errorObject){

});

$("body").on("click", ".remove-train", function(){
     $(this).closest ('tr').remove();

});

 