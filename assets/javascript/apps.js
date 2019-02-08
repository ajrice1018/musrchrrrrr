//Click function for youtube
$(function(){
    $('#search-form').submit(function(e){
      e.preventDefault();
      search();
    });
  
});
  
  
  function search(){
    //clear results
    $('#results').html('');
    $('#buttons').html('');
  
    //Get Form Input
    q = $('#query').val();
  
    // TODO 
    // getRelatedArtists()

    getVideos(q);
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
      'https://www.googleapis.com/youtube/v3/search',{
        part:'snippet , id',
        q: query,
        type: 'video',
        key: 'AIzaSyBiX1fkoNR6cDb_QYJmjXDkU5A2zp1S3A4'},
        function(data){
   
         // TODO - clear previous results
   
         console.log(data);
   
         $.each(data.items, function(i, item){
   
           var output = getOutput(item);
   
           $('#results').prepend(output);
         });
   
       } 
     );
  }
  
  //Build Output
  function getOutput(item){
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;
  
    // Build Output String
    var output = '<li>' +
    '<div class="list-right">'+ `<h3>${title}</h3>` +
    `<iframe id="player" type="text/html" width="640" height="390"
    src="https://www.youtube.com/embed/${videoId}"> frameborder="0"></iframe>` +
    '</div>'+
    '</li>'+
    '<div class="clearfix"></div>'+
    '';
  
    return output;
  } 