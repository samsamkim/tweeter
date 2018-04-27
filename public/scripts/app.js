//Takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet


var createTweetElement = function(data){
  var $tweet = $("<article>");
  var $header = $("<header>");
  var $div = $("<div>");
  var $footer = $("<footer>");

  //Append header, body, footer to article
  $tweet.append($header, $div, $footer);

  //header
  var dataImg = $("<img>").attr("src", data["user"]["avatars"]["small"]);
  var $spanName = $("<span class='name'>").append(data.user.name);
  var $spanHandle = $("<span class='side'>").append(data.user.handle);
  $header.append(dataImg, $spanName, $spanHandle);

  //body
  $div.text(data.content.text);

  //footer
  var flag = $("<i class='fas fa-flag'>");
  var retweet = $("<i class='fas fa-retweet'>");
  var heart = $("<i class='fas fa-heart'>");
  var time = Math.round((Date.now() - data.created_at) / (1000*60*60*24)) + " Days Ago";
  $footer.append(time, heart, retweet, flag);

  return $tweet;
};


// Responsible for taking in an array of tweet objects and then appending each one to the #tweets-container
function renderTweets(arrayOfTweets) {
  $("#tweetContainer").empty();
  arrayOfTweets.reverse().forEach(function(tweet){
    var $tweet = createTweetElement(tweet);
    $('#tweetContainer').append($tweet);
  });
  return $('#tweetContainer');
}

//Gets tweet and sends it to renderTweet
var loadTweets = function(){
  $.ajax({
        url: '/tweets',
        method: 'GET',
        success: function(result){
          //display those tweets here.
            renderTweets(result);
          },
        error: function(err){
          console.log("there was an error ",err);
        }
      });
};



$(document).ready(function() {
  loadTweets();

//Clicking tweet button sends tweet to loadTweet function
  $(".tweetButton").click(function( event ) {
      event.preventDefault();
      var tweet = $('#inputText').serialize();

      if(($(".counter").html()) < 0){
        alert("Sorry! Tweet must be less than 140 character!");
      }else if(($(".counter").html()) == 140){
        alert("Oops! There's nothing to tweet!");
      }
      else{
          $.ajax({
              url: '/tweets',
              method: 'POST',
              data: $('#inputText').serialize(),
              success: loadTweets
              });
          $("#inputText").val("");
        }
      });


//Button slides up and down and focuses on textarea by default
  $(".composeButton").click(function() {
    $(".new-tweet").slideToggle(200, function(){
      $('#inputText').focus();
    });
  });

});