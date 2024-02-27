  <script>
    function searchAnime() {
      var animeName = document.getElementById("animeName").value;
      if (animeName.trim() === "") {
        alert("Please enter the name of an anime.");
      } else {
        // Redirect user to Google search for the anime
        var searchQuery = "https://www.google.com/search?q=" + encodeURIComponent(animeName + " anime");
        window.location.href = searchQuery;
      }
    }

    document.getElementById("animeName").addEventListener("input", function() {
      var input = this.value.toLowerCase();
      var suggestions = document.getElementById("suggestionList");
      suggestions.innerHTML = "";

      if (input.trim() !== "") {
        fetch("https://api.jikan.moe/v4/search/anime?q=" + input)
          .then(response => response.json())
          .then(data => {
            data.results.forEach(anime => {
              var suggestion = document.createElement("div");
              suggestion.textContent = anime.title;
              suggestion.className = "suggestion-item";
              suggestion.addEventListener("click", function() {
                document.getElementById("animeName").value = anime.title;
                suggestions.innerHTML = "";
              });
              suggestions.appendChild(suggestion);
            });
          })
          .catch(error => {
            console.error('Error fetching anime data:', error);
          });
      }
    });
  </script>

