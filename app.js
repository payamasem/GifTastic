
topics = ['kanye west', 'kim kardashian', 'donald trump', 'justin bieber', 'kylie jenner', 'beyonce', 'oprah winfrey', 'jay z', 'travis scott', 'drake'];


var topicImage;


function displayGifs() {

	var APIKey = "432HzlwijziY4lOejK6Ug8vkj557512E";
	var topic = $(this).attr("data-name");

	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=432HzlwijziY4lOejK6Ug8vkj557512E&q=" + topic + "&limit=10&offset=0&rating=G&lang=en" + APIKey;

	$.ajax({
	      url: queryURL,
	      method: 'GET' 
	    }).done(function(response){
	

	        console.log(response);

	        $('#gif-view').empty();

	        for(var j=0; j<response.data.length; j++){

	      		var gifHolder = $('<div class="gifHolder"></div>');
            	$('#gif-view').append(gifHolder);

            	gifHolder.append('<div><b>Gif Rating: </b>' + response.data[j].rating);

	      		topicImage = $('<img>');
	      		
          		gifHolder.append(topicImage);
          		topicImage.addClass('clickable');
          		topicImage.attr('src', response.data[j].images.fixed_height_still.url);
          		topicImage.attr('data-still', response.data[j].images.fixed_height_still.url);
          		topicImage.attr('data-moving', response.data[j].images.fixed_height.url);	
          		topicImage.attr('data-state', 'still');	
	        }   
    	});
	}

	$(document).on("click", '.clickable', function(){


		var still = $(this).attr('data-still');
		var moving = $(this).attr('data-moving');
		var state = $(this).attr('data-state');
	
		if(state === 'still'){
		
			$(this).attr('src', moving);
			$(this).attr('data-state', 'moving');
			
		} else{

			$(this).attr('src', still);
			$(this).attr('data-state', 'still');
			
		}
	});

function renderButtons() {


  $("#buttons-view").empty();

  for (var i = 0; i < topics.length; i++) {

    var newTopic = $("<button>");
    newTopic.addClass("topic btn btn-primary");

 
    newTopic.attr("data-name", topics[i]);


    newTopic.text(topics[i]);

    $("#buttons-view").append(newTopic);
  }
}


      $("#add-topic").on("click", function(event) {
        event.preventDefault();
   



        var topic = $("#topic-input").val().trim();


        topics.push(topic);


        renderButtons();
      });


      $(document).on("click", ".topic", displayGifs);
      renderButtons();
