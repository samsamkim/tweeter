

  // takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet
  var createTweetElement = function(data){
  var $tweet = $("<article>");
  /*var header = $("<header>");
  header.append(imgr);
  $tweet.append(header);*/
  var $header = $("<header>");
  var $div = $("<div>");
  var $footer = $("<footer>");

  $tweet.append($header, $div, $footer);

  var dataImg = $("<img>").attr("src", data["user"]["avatars"]["small"]);
  var $spanName = $("<span class='name'>").append(data.user.name);
  var $spanHandle = $("<span class='side'>").append(data.user.handle);
  $header.append(dataImg, $spanName, $spanHandle);

  $div.text(data.content.text);

  var flag = $("<i class='fas fa-flag'>");
  var retweet = $("<i class='fas fa-retweet'>");
  var heart = $("<i class='fas fa-heart'>");
  $footer.append(data.created_at, heart, retweet, flag);

  // $tweet.html("<header>" + imgr.prop("outerHTML") +
  //               "<span class='name'>" + data.user.name + "</span>" +
  //               "<span class='side'>" + data.user.handle + "</span>" +
  //             "</header>" +

  //             "<div>".text(data["content"]["text"]) + "</div>" +

  //             "<footer>" + data["created_at"] +
  //               "<i class='fas fa-flag'></i>" +
  //               "<i class='fas fa-retweet'></i>" +
  //               "<i class='fas fa-flag'></i>" +
  //             "</footer>");

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

// when the user submits a new tweet, it should show up on the page without having to refresh the page.

//gets tweet and sends it to renderTweet

  var loadTweets = function(){
    $.ajax({
          url: '/tweets',
          method: 'GET',
          success: renderTweets
        });
  };

$(document).ready(function() {
loadTweets();

//clicking tweet button sends tweet to loadTweet function
  $(".tweetButton").click(function( event ) {
      event.preventDefault();
      var tweet = $('#inputText').serialize();

      if(($(".counter").html()) < 0){
        alert("tweet is not 140 character!");
      }else if(($(".counter").html()) == 140){
        alert("You didn't enter a tweet!");
      }
      else{
          $.ajax({
              url: '/tweets',
              method: 'POST',
              data: $('#inputText').serialize(),
              success: loadTweets
        });
      }
    });


//button slides up and down and focuses on textarea by default
  $(".composeButton").click(function() {
    $(".new-tweet").slideToggle(200, function(){
      $("#inputText").focus();
    });
  });



});


