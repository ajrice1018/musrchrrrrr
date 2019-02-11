//Click function for youtube
$(function () {
  $('#search-btn').click(function (e) {
    e.preventDefault();
    search();
  });

});


function search() {
  //clear results
  $('#results').html('');
  $('#buttons').html('');

  //Get Form Input
  q = $('#query').val();

  // TODO 
  // getRelatedArtists()

  getVideos(q);
  wikiSearch(q);
  wikiImages(q);
};

// $('button.related-artist').on('click', function() {
//   // TODO get artist name
//   var artist = '';
//   // getRelatedArtists(artist);
//   getVideos(artist);
// })

function getVideos(query) {

  //Run GET Request on API
  $.get(
    'https://www.googleapis.com/youtube/v3/search', {
      part: 'snippet , id',
      q: query,
      type: 'video',
      key: 'AIzaSyD-NdDziv7xe_alZgIBCkE2DeYZRTZPfYo'
    },
    function (data) {

      // TODO - clear previous results

      console.log(data);

      $.each(data.items, function (i, item) {

        var output = getOutput(item);

        $('#results').prepend(output);
      });

    }
  );
}

//Build Output
function getOutput(item) {
  var videoId = item.id.videoId;
  var title = item.snippet.title;
  var description = item.snippet.description;
  var thumb = item.snippet.thumbnails.high.url;
  var channelTitle = item.snippet.channelTitle;
  var videoDate = item.snippet.publishedAt;

  // Build Output String
  var output = '<li>' +
    '<div class="list-right">' + `<h5>${title}</h5>` +
    `<iframe id="player" type="text/html" width="100%" height="390px"
    src="https://www.youtube.com/embed/${videoId}"> frameborder="0"></iframe>` +
    '</div>' +
    '</li>' +
    '<div class="clearfix"></div>' +
    '';

  return output;
}

// This function pulls the main thumbnail from wikipedia

function wikiImages(txt) {

  $.ajax({
    url: `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=20&wbptterms=description&gpssearch=${txt}&gpslimit=20`,
    method: "GET",
    dataType: "jsonp",
    success: function (newData) {

      $("#bandPic").html(`<img src='${newData.query.pages[0].thumbnail.source}' class='responsive-img valign'>`);

    }
  })
};

// This function pulls the first paragraph from wikipedia

function wikiSearch(txt) {

  $.ajax({
    type: "GET",
    url: "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search=" + txt + "&limit=1&format=json",
    contentType: "application/json; charset=utf-8",
    async: false,
    dataType: "json",
    success: function (data, textStatus, jqXHR) {
      var firstText = data[2][0];
      console.log(firstText);
      $("#bandInfo").html(firstText);

    },
    error: function (errorMessage) {
      alert(errorMessage);
    }
  });
}