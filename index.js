document.addEventListener("DOMContentLoaded", () => {
    // Fetch and display featured artworks
    fetchFeaturedArtworks();

    // Event listener for the like button
    const likeButton = document.getElementById("likeButton");
    likeButton.addEventListener("click", increaseLikes);
    likeButton.addEventListener("mouseover", (event) => {
        likeButton.style.backgroundColor = "aqua";
        likeButton.style.color = "blue";
    })


    // Event listener for the comment form submission
    const commentForm = document.getElementById("commentForm");
    commentForm.addEventListener("submit", postComment);
});

// Fetch and display featured artworks
function fetchFeaturedArtworks() {
    fetch("http://localhost:3000/artworks")
        .then(response => response.json())
        .then(artworks => displayFeaturedArtworks(artworks));
}

// Display featured artworks
function displayFeaturedArtworks(artworks) {
    const artworkContainer = document.getElementById("artwork-container");
    artworkContainer.innerHTML = "";
    artworks.forEach(artwork => {
        const artworkElement = createArtworkElement(artwork);
        artworkContainer.appendChild(artworkElement);
    });
}

// Create artwork element
function createArtworkElement(artwork) {
    const artworkElement = document.createElement("div");
    artworkElement.classList.add("artwork");

    const imageElement = document.createElement("img");
    imageElement.src = artwork.image;
    imageElement.alt = artwork.title;

    const titleElement = document.createElement("h3");
    titleElement.textContent = artwork.title;

    artworkElement.appendChild(imageElement);
    artworkElement.appendChild(titleElement);

    return artworkElement;
}

// Increase likes count
function increaseLikes() {
    const likeCountElement = document.getElementById("likeCount");
    let likeCount = parseInt(likeCountElement.textContent);
    likeCount++;
    likeCountElement.textContent = likeCount;
}

// Post a new comment
function postComment(event) {
    event.preventDefault();
    
    const commentInput = document.getElementById("commentInput");
    const commentText = commentInput.value.trim();
    if (commentText === "") return;

    const commentsList = document.getElementById("commentsList");
    const commentElement = document.createElement("li");
    commentElement.textContent = commentText;
    commentsList.appendChild(commentElement);

    commentInput.value = "";
}