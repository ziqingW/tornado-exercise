$(document).ready(function() {
    $("button").click(function() {
        var value = $("#search").val();
        var loc = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + value + "&callback=?";
        if (value == "") {
            $("#items").html("<h4 class='text-center' style='color:white'><i><strong>Try something</i></strong></h4>");
        }
        else {
            $('#items').empty();
            $.ajax({
                url: loc,
                type: "GET",
                dataType: "json",
                success: function(data) {
                    console.log(data);
                    var len = data[1].length;
                    for (var i = 0; i < len; i++) {
                        $("#items").append("<div class='result'><a href=" + "'" + data[3][i] + "'>" + "<h4 class='title'>" + data[1][i] + "</h4>" + "<p class='content'>" + data[2][i] + "</p>" + "</a></div>");
                    }
                }
            });
        }
    });
});
