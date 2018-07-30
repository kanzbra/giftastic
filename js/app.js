

//animals of the artic
var topics = [
    "penguin", "walrus", "seal", "snowy owl", "arctic fox",
    "polarbear", "snowshoe hare"];

//create buttons for each animal

function makeButtons() {

    $('#animalButtons').empty();

    for (var i = 0; i < topics.length; i++) {

        var x = $('<button>')
        x.addClass('animalTopic');
        x.attr('data-name', topics[i]);
        x.text(topics[i]);
        $('#animalButtons').append(x);

    }
}


// for user to add an animal 
$("#addAnimal").on("click", function () {

    var topic = $("#animal-input").val().trim();
    topics.push(topic);
    makeButtons();
    return false;
})

//function to display the gifs
function displayGifs() {
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=10&api_key=15147yUPC72ycCrrggC6aKyPWJaAId9E";

    // creates ajax call
    $.ajax({ url: queryURL, method: "GET" }).done(function (response) {
        console.log(response.data);
        // save results as a variable
        var results = response.data;


        // for loop goes through each gif and adds these variables
        for (var i = 0; i < results.length; i++) {
            // creates a generic div to hold the results
            var gifDiv = $('<div class=gifs>');
            var showGif = $('<img>');
            showGif.attr('src', results[i].images.fixed_height_still.url);
            // shows the rating on hover
            showGif.attr('title', "Rating: " + results[i].rating);
            showGif.attr('data-still', results[i].images.fixed_height_still.url);
            showGif.attr('data-state', 'still');
            showGif.addClass('gif');
            showGif.attr('data-animate', results[i].images.fixed_height.url);
            // var rating = results[i].rating;
            // var p = $('<p>').text('Rating: ' + rating);
            gifDiv.append(showGif)
            // gifDiv.append(p)

            $("#animals").prepend(gifDiv);
        }

    });


}
//fix positioning for gifs
$(document).on('click', '.gif', function () {
    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    };
});



// function for displaying show gifs
$(document).on("click", ".animalTopic", displayGifs);

// initially calls the makeButtons function
makeButtons();












