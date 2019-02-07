//Click function for youtube
$(function(){
    $('#channel-data').click(function(){
        $(this).parent().hide('slow');
        $('.'+$(this).attr('id')).show('slow');
   });


    $('#search-form').submit(function(e){
      e.preventDefault();
    });
  
  });
  
  
  function search(){
    //clear results
    $('#results').html('');
    $('#buttons').html('');
  
    //Get Form Input
    q = $('#query').val();
  
    //Run GET Request on API
    $.get(
     'https://www.googleapis.com/youtube/v3/search',{
       part:'snippet , id',
       q: q,
       type: 'video',
       key: 'AIzaSyBiX1fkoNR6cDb_QYJmjXDkU5A2zp1S3A4'},
       function(data){
  
  
        console.log(data);
  
        $.each(data.items, function(i, item){
  
          var output = getOutput(item);
  
          $('#results').prepend(output);
        });
  
      } 
    );
  };
  
  //Build Output
  function getOutput(item){
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;
  
    //Build Output String
    var output = '<li>' +
    '<div class="responsive-img">' + 
    '<img height="auto" width="100%" src="'+thumb+'">' +
    '</div>' +
    '<div class="list-right">'+
    '<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/watch?v='+videoId+'&t=3s">' +title+'</h3>' +
    '<small>By <span class= "cTitle">' + channelTitle + '</span> on ' +videoDate+'</small>' +
    '<p>'+description+'</p>'+
    '</div>'+
    '</li>'+
    '<div class="clearfix"></div>'+
    '';
  
    return output;
  } 