//the topic is condiments.. don't judge
var condiments = ["peanut butter", "jelly", "jam", "ketchup", "butter", "salt", "pepper"];
var imageValue = "";
//==============================//
$(document).ready(function() {
	// This .on("click") function will trigger the AJAX Call
	$('#findCondi').on('click', function(){
		// Here we grab the text from the input box 
		var daGoods = $('#condiment-input').val().trim();
		condiments.push(daGoods);
		renderButtons();
		return false;
	});	
	function displayCondiments(){
		$("#imageContainer").empty();
		var condimentName = ($(this).attr('data-name'));
			// Here we assemble our URL 
			var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + condimentName + "&api_key=dc6zaTOxFJmzC&lang=US&limit=10&fmt=json";
		$.ajax({url: queryURL, method: "GET"}).done(function(response){
			console.log(response);
			$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
			// Retrieves the Rating data
			for (var j = 0;j<10;j++){
				// Creates a generic div to hold the images
				var condDiv = $('<div class="condimentsContainer">');
				var rating = response.data[j].rating;
				var superRatings = rating.toUpperCase();
				// Creates an element to have the rating displayed uppercase
				var pOne = $('<p>').text( "Rated: " + superRatings);
				// Displays the rating
				condDiv.append(pOne);
				imageValue = response.data[j].id;
				console.log(imageValue);
				// Creates an element to hold the image 
				var image = $('<img class="ajaxImages">').attr({src: response.data[j].images.original_still.url, state: "static"});
			//	image.addClass("gifStarter");
				// Appends the image
				console.log(image);
				condDiv.append(image);
				$('#imageContainer').prepend(condDiv);
			}	
			});
		});		
	}
	// Generic function for capturing the movie name from the data-attribute
	function alertCondiment(){
	//var condimentName = $(this).data("name");
	var condimentName = $(this).data("name");
			alert(condimentName);
	}
	function renderButtons(){ 
			$("#topButtons").empty();
			//preventdefault also works
			for(var i = 0; i<condiments.length; i++){
				var a = $('<button>');
				a.addClass('theSpread');
				a.attr('data-name', condiments[i]);
				a.text(condiments[i]);
				$("#topButtons").append(a);
			}
		}
	/*$(".condimentsContainer").on("click", ".ajaxImages", function() {
		alert($(this).find("ajaxImages").attr("data-state"));
		if ($(this).find("ajaxImages").attr("data-state") == "static") {
			$(this).find("ajaxImages").attr("src", "http://media.giphy.com/media/" + imageValue + "/giphy-loop.mp4");
		} else {
			$(this).find("ajaxImages").attr("src", "http://media.giphy.com/media/" + imageValue + "/giphy_s.gif");
		}
	});*/

	function changeGifState(){
		alert($(this).find("ajaxImages").attr("data-state"));
		console.log((this));
		console.log(this.state);
		console.log($(this).find("img").attr("data-state"));
		console.log($(this).find("ajaxImages"));
		if ($(this).find("ajaxImages").attr("data-state") == "static") {
			$(this).find("ajaxImages").attr("src", "http://media.giphy.com/media/" + imageValue + "/giphy-loop.mp4");
		} else {
			$(this).find("ajaxImages").attr("src", "http://media.giphy.com/media/" + imageValue + "/giphy_s.gif");
		}
	}
	$(document).on('click', '.ajaxImages', changeGifState);
	$(document).on('click', '.theSpread', displayCondiments);
	//Start off with some button examples
	renderButtons();
});