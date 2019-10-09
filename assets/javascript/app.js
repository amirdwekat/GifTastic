$(document).ready(function () {
	var animals= ["dog", "cat", "goldfish", "frog", "rabbit", "chicken", "donkey", "gerbil","monkey"];

	// Add buttons for original animal array
	function renderButtons() {
		$("#animal-buttons").empty();
		for (i = 0; i < animals.length; i++) {
			$("#animal-buttons").append("<button class='btn btn-success' data-animal='" + animals[i] + "'>" + animals[i] + "</button>");
		}
	}

	renderButtons();

	// Adding a button for animal entered
	$("#add-animal").on("click", function () {
		event.preventDefault();
		var animal= $("#animal-input").val().trim();
		animals.push(animal);
		renderButtons();
		return;
	});


	// Getting gifs from api... onto html
	$("button").on("click", function () {
		var animal = $(this).attr("data-animal");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=7AHoODoShyUHFSbjBFZRD8QPRHiRwP8z"

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function (response) {
			var results = response.data;
			$("#animals").empty();
			for (var i = 0; i < results.length; i++) {
				var animalDiv = $("<div>");
				var p = $("<p>").text("Rating: " + results[i].rating);
				var animalImg = $("<img>");

				animalImg.attr("src", results[i].images.original_still.url);
				animalImg.attr("data-still", results[i].images.original_still.url);
				animalImg.attr("data-animate", results[i].images.original.url);
				animalImg.attr("data-state", "still");
				animalImg.attr("class", "gif");
				animalDiv.append(p);
				animalDiv.append(animalImg);
				$("#animals").append(animalDiv);
			}
		});
	});

	function changeState(){
		var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
		var stillImage = $(this).attr("data-still");

		if (state == "still") {
			$(this).attr("src", animateImage);
			$(this).attr("data-state", "animate");
		}

		else if (state == "animate") {
			$(this).attr("src", stillImage);
			$(this).attr("data-state", "still");
		}
	}
	$(document).on("click", ".gif", changeState);

}); 

 
