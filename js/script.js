//defines an array with preset buttons
var animalList = ["Cat", "Bunny", "Duck", "Otter", "Bird", "Penguin", "Kitten", "Parrot", "Bees", "Bears", "Battlestar Galactica"]

//TODO: submit will take the input and run it through a function to create a button
//the input will be added to the animal list array
//the animal list array should update to include the new input & button and run through the api get function to return results

//
$("#submitButton").on("click", function(){
    var input = $("#submission").val().trim()
    animalList.push(input);
    buildButton(input);
}) 

function buildButton(animal){
//for every element on the list

//create a button stored within the animalButton variable
    var animalButton = $("<button>");
//adds the corresponding text based on i to each button
    $(animalButton).text(animal);
//gives the attribute "data-animal" which is equivalent to the animal chosen by i in the array (ex animalList[0]=cat) 
    $(animalButton).attr("data-animal", animal);
//adds styling from bootstrap
    $(animalButton).attr("class", "btn btn-info");

//appends the info (text, attributes) to the actual button
    $("#buttons").append(animalButton);

    $(animalButton).on("click", doClick);


}
// for (i=0; i<animalList.length; i++) {
//     buildButton(animalList[i]);
// }

for( animal of animalList) buildButton(animal);

  
function doClick() {
//grabs the attribute "data-animal" from whichever button was pressed and stores it in the animal variable
    var animal = $(this).attr("data-animal");
//set querlyURL that will be called by ajax to the api, plus the animal to be selected, plus the api key
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      console.log(response);
//creates a variable called results equivalent to all the data pulled by response in the giphy api
      var results = response.data
//for loop for the results going up to 10 (which is specified by limit=10 in the query url)
// for( r of  response.data)
// for (var i = 0; i < results.length; i++)
var s = '';
      for(r of results) {
//creates a div

s = s+`<div class="images"> ${r.title.toUpperCase()} (${r.rating})
    <br>Download: <a href='${r.images.original.url}' download class='fas fa-download'></a><br>
    <img src='${r.images.fixed_height_still.url}' data-state='still' data-animate='${r.images.fixed_height.url}'
    data-still='${r.images.fixed_height_still.url}' class='gif'>
</div>`
    // $("#gifs-appear-here").prepend($(s))
        // var animalDiv = $("<div class='images'>");
        // $(animalDiv).attr("class", "images");
//creates a paragraph that includes the text "rating" plus the data for rating retrieved from the api for each i 
        // var p = $("<p>").html("Rating: " + results[i].rating + "<br>" + "Download: ");
        // var download = ("<a href='"+results[i].images.original.url + "'download class='fas fa-download'></a>");
        
    
//creates an image tag tied to the variable animalImage
//         var animalImage = $("<img>");
// //applies attributes to the img tag contained within the variable animal image; src, data-state, url for data-animae/still, adds a class
//         animalImage.attr({
//             "src": results[i].images.fixed_height_still.url,
//             "data-state": "still",
//             "data-animate": results[i].images.fixed_height.url,
//             "data-still": results[i].images.fixed_height_still.url,
//             "class": "gif",
//              });
//         p.append(download);
// //appends the paragraph including the rating to the animal div
//         animalDiv.append(p);
// //appends(adds) the info contained within animalImage, which includes the img tag with the source, data-state/animate/still, and class
//         animalDiv.append(animalImage);
//prepends the new information to the div with the gifs-appear-here id
        // $("#gifs-appear-here").prepend(animalDiv)

      }
    $("#gifs-appear-here").html(s)

      


    });
  };


//changes the state and url of images
$("#gifs-appear-here").on("click", "img", function() {
var state = $(this).attr("data-state");
if (state === "still") {
  $(this).attr("src", $(this).attr("data-animate"));
  $(this).attr("data-state", "animate");
} else {
  $(this).attr("src", $(this).attr("data-still"));
  $(this).attr("data-state", "still");
}
});