//the topic is condiments.. don't judge

//========Variables=============//
var condiments = ["peanut butter", "jelly", "jam", "ketchup", "butter", "salt", "pepper"];
//==========Methods=============//
$(document).ready(function() {
	// This .on("click") function will trigger the AJAX Call
	$('#findCondi').on('click', function(){
		// Here we grab the text from the input box and trim trailing spaces
		var daGoods = $('#condiment-input').val().trim();
		// Push the text into the condiments array
		condiments.push(daGoods);
		// Call render button function to dynamically create a button
		renderButtons();
		return false;
	});	
	// Function to generate 10 gifs with the search term
	function displayCondiments(){
		// Empty the image container to make sure that exactly 10 gifs are displayed
		$("#imageContainer").empty();
		// Create a variable to hold the name of the button/input
		var condimentName = ($(this).attr('data-name'));
		// Here we assemble our URL 
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + condimentName + "&api_key=dc6zaTOxFJmzC&lang=US&limit=10&fmt=json";
		// Call to ajax with the GET method
		$.ajax({url: queryURL, method: "GET"}).done(function(response){
			// For loop iterating 10 times to create images
			for (var j = 0; j < 10; j++){
				// Creates a generic div to hold the images
				var condDiv = $('<div class="condimentsContainer">');
				// Stores the rating in a variable
				var rating = response.data[j].rating;
				// Changes the rating to uppercase
				var superRatings = rating.toUpperCase();
				// Create a paragraph variable with text to show the rating
				var pOne = $('<p>').text( "Rated: " + superRatings);
				// Append the rating to the generic div
				condDiv.append(pOne);
				// Creates an element to hold the image, holds four attributes: src, data-still, data-animate, and data-state
				var image = $('<img class="ajaxImages">').attr({src: response.data[j].images.original_still.url, still: response.data[j].images.original_still.url, animate: response.data[j].images.original.url, state: "still"});
				// Appends the image to the generic div
				condDiv.append(image);
				// Prepend the generic div to the image container on the html
				$('#imageContainer').prepend(condDiv);
			}	
		});		
	}
	// Function to render the buttons on the top after submitting
	function renderButtons(){ 
			// Empty the top buttons container
			$("#topButtons").empty();
			// For loop iterating array length number of times. A button for each item in the array
			for(var i = 0; i<condiments.length; i++){
				// Dynamically create a button using jQuery
				var a = $('<button>');
				// Give the button a class called theSpread
				a.addClass('theSpread');
				// Give the button an attribute data-name with the property of the array item
				a.attr('data-name', condiments[i]);
				// Give the button the text of the array item to display on the button
				a.text(condiments[i]);
				// Append the buttons to have the most recent on the end
				$("#topButtons").append(a);
			}
		}
	// Function to change the gif state to animated or still
	function changeGifState(){
		// Stores the data state into a variable
		var state = $(this).attr("state");
		// Stores the data animate into a variable
		var animation = $(this).attr("animate");
		// Stores the data still into a variable
		var still = $(this).attr("still");
		// Check if the image is still or animate
		if(state == "still"){
			// Change the attribute of src into the animation url to make the gif animated
            $(this).attr("src", animation);
            // Change the data state to animate
            $(this).attr("state", "animate");
        } else {
        	// Change the attribute of src into the still url to make the gif still
            $(this).attr("src", still);
            // Change the data state to still
            $(this).attr("state", "still");
        }
	}
	// On sandwichCat click, pull up 10 images of the Lord Sandwich Cat, similar to displayCondiments()
	$("#sandwichCat").on("click", function() {
		// URL to pull up 10 gifs of Lord Sandwich cat
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=sandwich-cat&api_key=dc6zaTOxFJmzC&lang=US&limit=10&fmt=json";
		$.ajax({url: queryURL, method: "GET"}).done(function(response){
			for (var j = 0;j<10;j++){
				// Creates a generic div to hold the images
				var condDiv = $('<div class="condimentsContainer">');
				var rating = response.data[j].rating;
				// Creates an element to have the rating displayed uppercase
				var superRatings = rating.toUpperCase();
				// Displays the rating
				var pOne = $('<p>').text( "Rated: " + superRatings);
				condDiv.append(pOne);
				// Creates an element to hold the image 
				var image = $('<img class="ajaxImages">').attr({src: response.data[j].images.original_still.url, still: response.data[j].images.original_still.url, animate: response.data[j].images.original.url, state: "still"});
				// Appends the image
				condDiv.append(image);
				$('#imageContainer').prepend(condDiv);
			}
		});
	});
//====Delegated Event Handlers=====//
	//On click to the dynamically generated gif images, do function changeGifState
	$(document).on('click', '.ajaxImages', changeGifState);
	//On click to dynamically generated buttons, do function displayCondiments
	$(document).on('click', '.theSpread', displayCondiments);
//Start off with some button examples
	renderButtons();
});