$(document).ready( function() {

    $('#amz_submit').click( function (evt) {
        evt.preventDefault();
        //alert("hello");
        carton_work();

    });

    // $("amz_submit").onclick = carton_work;
});

var carton_work = function () {
    //window.alert("UNDER CONSTRUCTION");

    var month_in;
    var year_in;
    var manager_in;
    var payload_in;

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
                        //payload_in = value.payload;
                        payload_in = $("#amz_string").val();

                        // $("#amazon_result").append(
                        //     "<h2>" + value.month + " " + value.year + "</h2>" +
                        //     "<h3>Manager: " + value.manager + "</h3>"
                        // );

                        //Do work on payload
                        var tracking = [];
                        var tracking_index = 0;
                        var work = payload_in.split(",");

                        //alert(work.length);

                        for(var i = 0; i < work.length; i++) {
                            if(work[i] === "$0.00") {
                                if(work[i - 4] === "ARSC") {
                                    tracking[tracking_index] = work[i - 2];
                                    tracking_index++;
                                }
                            }
                        }

                        //alert(tracking.length);

                        $("#amazon_result").append("<h2>Tracking Report:</h2>");


                        $("#amazon_result").append("<p>");

                        var format_count = 0;

                        for(i = 0; i < tracking.length; i++) {
                            $("#amazon_result").append(
                                tracking[i] + "<br>"
                            );

                            format_count++;

                            if(format_count === 5) {
                                $("#amazon_result").append("<br>");
                                format_count = 0;
                            }
                        }

                        $("#amazon_result").append("<br><br><br><br><br><br><p>");

                    });
                });
            });

        }//end success function
    }); //end ajax function

 }; //end carton work function