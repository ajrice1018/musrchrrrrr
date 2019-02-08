var API_KEY = "SrukemE16v6dIJlj"

        
        $("#search-form").submit("click", function(event){
        event.preventDefault();
        $("#eventsGoHere").empty();

            
            var bandQuery = $("#query").val().trim();
        
            
            
            var queryURLEventSearch = "https://api.songkick.com/api/3.0/events.json?apikey=" + API_KEY +"&per_page=10&artist_name=" + bandQuery;
            $.ajax({
                    url: queryURLEventSearch,
                    method: "GET",
                    
                })
                .done(function (response) {
                    console.log(response);
                    var events = response.resultsPage.results.event;
                    for (var i = 0; i < events.length; i++) {
                        var displayName = events[i].displayName;
                        var venue = events[i].venue.displayName;
                        var location = events[i].location.city;
                        var date = events[i].start.date;
                        var eventDiv = $('<div>');
                        var p = $('<p>').text("Event Info:  " + displayName);
                        var pVenue = $('<p>').text("Venue: " + venue);
                        var pLocation = $('<p>').text("Location: " + location);
                        var pDate = $('<p>').text("Date: " + date);
                        eventDiv.append(p, pVenue, pLocation, pDate);

                        
                        $('#eventsGoHere').append(eventDiv);
                        $('#eventsGoHere').append($('<br>'));

                        var tr = $('<tr>');
        var td1 = $('<td>').html(p);
        var td2 = $('<td>').html(pVenue);
        var td3 = $('<td>').html(pLocation);
        var td4 = $('<td>').html(pDate);

        tr.append(td1, td2, td3, td4);
        $('#loadResults').append(tr);

        
                        
                    }
                });

                
        // <a href="bandURL">Click here for Band Info</a>        

          var queryURL = "https://api.songkick.com/api/3.0/search/artists.json?apikey=" + API_KEY + "&query=" + encodeURIComponent(bandQuery);
                $.ajax({
                        url: queryURL,
                        method: "GET", 
                        //xhrFields: {
                         //   withCredentials: true
                       // }
                    })
                    .done(function (response) {
                        var artist = response.resultsPage.results.artist[0];
                        var tourUntil = artist.onTourUntil;
                        var uri = artist.uri;
                        var displayName = artist.displayName;  

                     $('#bandURL').html('<a href="' + uri + '">Click here for Band Info</a>');
        });
    });