$(document).ready(function() {




  $('#inputText').on('input', function() {
    let tweetLength = 140 - $(this).val().length;


    if(tweetLength < 0){
      $(this).siblings('span.counter').text(tweetLength).css('color', 'red');
    }else{
      $(this).siblings('span.counter').text(tweetLength).css('color', 'black');
    }
  });










});