//divs load upon search
$(function () {
    $('#searchFormEvent').on('click', function (e) {
        e.preventDefault();
        console.log('#searchFormEvent preventDefault\'d')
    })
    $('#search-btn').on('click', function (e) {
        e.preventDefault();
        console.log('#search-btn clicked!!!')
        $("#entire, .card-panel, .card-horizontal").fadeIn(2000);

    })

    // onKEY EVENT 
    $(document).on('keyup', function (event) {
        console.log(event.which);
        if (event.which == 13) {
            event.preventDefault();
            $('#search-btn').click();
            console.log('#search-btn click()');
        }
        return false;
    });
})



//////API KEY///////////

var API_KEY = "SrukemE16v6dIJlj"

///////////On-Click to trigger API query////////

$("#search-btn").on("click", function (event) {
    $("#entire, .card-panel, .card-horizontal").fadeIn(2000);
    event.preventDefault();

    $("#appendtome").empty();


    var bandQuery = $("#query").val().trim();

    ///////GETTING LINK TO ARTIST BIO/////////////        

    var queryURL = "https://api.songkick.com/api/3.0/search/artists.json?apikey=" + API_KEY + "&query=" + bandQuery;
    $.ajax({
            url: queryURL,
            method: "GET",
        })
        .done(function (response) {
            var uri = response.resultsPage.results.artist[0].uri;
            $('#bandURL').attr("href", uri);
        });

    ////////EVENTS TABLE API CALL//////////////
    var queryURLEventSearch = "https://api.songkick.com/api/3.0/events.json?apikey=" + API_KEY + "&per_page=10&artist_name=" + bandQuery;
    $.ajax({
            url: queryURLEventSearch,
            method: "GET",
        })
        .done(function (response) {

            console.log(response);
            var events = response.resultsPage.results.event;

            //For loop to populate table
            for (var i = 0; i < events.length; i++) {
                var venue = events[i].venue.displayName;
                var location = events[i].location.city;
                var date = events[i].start.date;
                var newTableRow = $("<tr>");
                var venueTab = $("<td>").text(venue);
                var locationTab = $("<td>").text(location);
                var dateTab = $("<td>").text(date);
                $(newTableRow).append(venueTab, locationTab, dateTab)
                $("#appendtome").append(newTableRow);
            }
        });

});