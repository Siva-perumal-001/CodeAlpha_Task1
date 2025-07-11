const lightbox = document.querySelector(".light-box");
const lightboxImg = document.querySelector(".lyt-cnt img");
const images = document.querySelectorAll(".image-card img");

const leftBtn = document.querySelector(".lyt-lft");
const rightBtn = document.querySelector(".lyt-ryt");
const closeBtn = document.querySelector(".close");

let currentIndex = 0;

// Show lightbox with clicked image
images.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    updateLightbox();
    lightbox.style.display = "flex";
    closeBtn.style.display = "block";
    document.body.classList.add("noscroll");
  });
});

// Update the image in lightbox
function updateLightbox() {
  const src = images[currentIndex].src;
  lightboxImg.src = src;
}

// Prev
leftBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateLightbox();
  }
});

// Next
rightBtn.addEventListener("click", () => {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    updateLightbox();
  }
});

// Close
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
  closeBtn.style.display = "none";
  document.body.classList.remove("noscroll");
});

const filterButtons = document.querySelectorAll(".tag");
const searchInput = document.querySelector(".search-bar");
const imageCards = document.querySelectorAll(".image-card");

let activeCategory = "All";

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeCategory = button.textContent.trim(); // Get the button text

    // If "All" is clicked, also clear the search bar
    if (activeCategory === "All") {
      searchInput.value = ""; // Clear the input
    }

    filterImages(); // Call the main filter function
  });
});

// Search Input Logic
searchInput.addEventListener("input", () => {
  filterImages(); // Filter while typing
});

// Core Filtering Function: Handles both category + search
function filterImages() {
  const searchText = searchInput.value.toLowerCase(); // Normalize text

  imageCards.forEach(card => {
    const category = card.getAttribute("data-category"); // e.g., "Nature"
    const title = card.getAttribute("data-title").toLowerCase(); // e.g., "forest"

    const matchCategory = activeCategory === "All" || category === activeCategory;
    const matchSearch = title.includes(searchText); // Match text

    // Show only if both match
    if (matchCategory && matchSearch) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

