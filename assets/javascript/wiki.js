
        

//Click function for youtube
$(function(){
    $('#search-btn').click(function(e){
      e.preventDefault();
      search();
    });
  
});
  
  
function search(){
    //clear results
    $('#results').html('');
    $('#buttons').html('');
    $('#bandPic').html('');

  
    //Get Form Input
    q = $('#query').val();
  
    wikiSearch(q);
    
    wikiImages(q);

};

// This function pulls the main thumbnail from wikipedia

function wikiImages (txt) {

    $.ajax({
      url: `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=20&wbptterms=description&gpssearch=${txt}&gpslimit=20`,
      method: "GET",
      dataType: "jsonp",
      success: function(newData) {

            $("#bandPic").html(`<img src='${newData.query.pages[0].thumbnail.source}' class='responsive-img valign'>`);

        }
      }
    )
  };

// This function pulls the first paragraph from wikipedia

function wikiSearch (txt) {

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
