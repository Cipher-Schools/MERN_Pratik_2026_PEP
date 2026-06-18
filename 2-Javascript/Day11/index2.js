let timer;

addEventListener("input", function (event) {
    clearTimeout(timer);
  timer = setTimeout(() => {
    console.log("The user has called api for thsi number of times");
      searchMovie(event.target.value);
  }, 5000);
});

function searchMovie(query) {
  console.log("Api request for " + query);
}
