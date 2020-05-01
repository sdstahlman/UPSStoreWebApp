$(document).ready( function() {

    $('#amz_submit').click( function (evt) {
        evt.preventDefault();
        //alert("hello");
        carton_work();

    });

    // $("amz_submit").onclick = carton_work;
});

var carton_work = function () {
    window.alert("UNDER CONSTRUCTION");

    $.ajax({

        beforeSend: function() {
            $("#amazon_result").html("Loading...");
        },
        timeout: 10000,

        //Make sure everything builds correctly
        error: function(xhr, status, error) {
            alert("Error: " + xhr.status + " - " + error);
        },

        //On success
        success: function(data) {
            $("#amazon_result").html("");
            $.getJSON("json/amazonmaster.json", function(data) {
                $.each(data, function () {
                    $.each(this, function (key, value) {
                        $("#amazon_result").append(
                            "<h2>" + value.month + " " + value.year + "</h2>" +
                            "<h3>" + value.manager + "</h3>" +
                            "<p>" + value.payload + "</p>"
                        );

                        //NOTE:
                        //Payload variable will eventually be a string representation of a csv file.
                        //This string will need to be parsed and specific data needs found before being displayed.
                        //This call in the ajax function for the payload is temporary until I am finished with the parsing logic.

                    });
                });
            });

        }
    });
 };