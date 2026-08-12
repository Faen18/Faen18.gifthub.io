/* .js files add interaction to your website */

var title = document.getElementById("story-title");
var displayName = document.getElementById("display-name");
var story = document.getElementById("story");

var submitButton = document.getElementById("submit-button");

var showButton = document.getElementById("show-stories");
var storyContainer = document.getElementById("story-container");


/* Share My Story button */

if (submitButton && title && displayName && story) {

  submitButton.addEventListener("click", success);

  function success() {

    console.log("Your story has been shared");

/* Store the topics selected */

    var selectedTopics = [];

    var topicOptions = document.querySelectorAll(
      'input[name="topic"]:checked'
    );

    for (var i = 0; i < topicOptions.length; i++) {
      selectedTopics.push(topicOptions[i].value);
    }


/* Get all previous stories */

    var stories = JSON.parse(localStorage.getItem("stories")) || [];


/* Add the new story to the collection */

    stories.push({
      title: title.value,
      story: story.value,
      displayName: displayName.value,
      topics: selectedTopics
    });


/* Save all stories */

    localStorage.setItem("stories", JSON.stringify(stories));

  }

}


/* Show Me Stories button */

if (showButton && storyContainer) {

  showButton.addEventListener("click", findStories);

  function findStories() {

    /* Store the filters selected on the Discover page */

    var selectedFilters = [];

    var filterOptions = document.querySelectorAll(
      'input[name="filter"]:checked'
    );

    for (var i = 0; i < filterOptions.length; i++) {
      selectedFilters.push(filterOptions[i].value);
    }


/* Get all saved stories */

    var stories = JSON.parse(localStorage.getItem("stories")) || [];


/* Clear the previous results */

    storyContainer.innerHTML = "";


/* Check every saved story */

    for (var i = 0; i < stories.length; i++) {

      var currentStory = stories[i];

      var match = false;


/* Compare the story's topics with the selected filters */

      for (var j = 0; j < selectedFilters.length; j++) {

        if (currentStory.topics.includes(selectedFilters[j])) {
          match = true;
        }

      }


/* Show the story if it matches */

      if (match) {

        var storyBox = document.createElement("div");

        storyBox.innerHTML =
          "<h3>" + currentStory.title + "</h3>" +
          "<p>" + currentStory.story + "</p>" +
          "<p>Shared by: " + currentStory.displayName + "</p>";

        storyContainer.appendChild(storyBox);

      } else {

        console.log("This story does not match.");

      }

    }

  }

}
