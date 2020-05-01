$(document).ready(function() {
    $("#accordion").accordion({
        event: "click",
        heightStyle: "content",
        collapsible: true

    });

    $.ajax({

        beforeSend: function() {
            $("#design_contact").html("Loading...");
            $("#store_contact").html("Loading...");
        },
        timeout: 10000,

        //Make sure everything builds correctly
        error: function(xhr, status, error) {
            alert("Error: " + xhr.status + " - " + error);
        },

        //On success
        success: function(data) {
            $("#design_contact").html("");
            $("#store_contact").html("");

            $.getJSON("json/designcontact.json", function(data) {
                $.each(data, function () {
                    $.each(this, function (key, value) {
                        $("#design_contact").append(
                            "<p>" +
                            value.name + "<br>" +
                            value.school + "<br>" +
                            "<a href=\"mailto: " + value.email + "\">" + value.email + "</a><br>" +
                            "</p>"
                        );

                    });
                });
            });

            $.getJSON("json/storecontact.json", function(data) {
                $.each(data, function () {
                    $.each(this, function (key, value) {
                        $("#store_contact").append(
                            "<p>" +
                            value.name + "<br>" +
                            value.store + "<br>" +
                            value.address + "<br>" +
                            value.city + "<br>" +
                            "<a href=\"mailto: " + value.email + "\">" + value.email + "</a><br>" +
                            value.phone +
                            "</p>"
                        );

                    });
                });
            });

        }
    });


});