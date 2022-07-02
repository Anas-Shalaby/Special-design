"use strict";

// Select landing page element
const lanPageEl = document.querySelector(".landing-page");

// Get array of images
const imgsArray = [
  "img-1.jpg",
  "img-2.jpg",
  "02-min-1-1024x683.jpg",
  "img-4.jpg",
  "04.jpg",
];

// Settings box
document.querySelector(".toggle-settings i").onclick = function () {
  this.classList.toggle("fa-spin");

  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch colors

const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    // console.log(e.target.dataset.color);
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color-option", e.target.dataset.color);

    handeActive(e);
  });
});

// Save to local Storage

const mainColors = localStorage.getItem("color-option");

if (mainColors) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color-option")
  );

  // Remove active calss from all childrens
  document.querySelectorAll(".colors-list li").forEach((e) => {
    e.classList.remove("active");

    if (e.dataset.color === mainColors) {
      e.classList.add("active");
    }
  });
}

// Switch background option

const randomBG = document.querySelectorAll(".random-backgrounds span");

// Loop on all spans
randomBG.forEach((span) => {
  span.addEventListener("click", (e) => {
    // Remove active calss from all childrens
    handeActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImg();

      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backGroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

// Random background option

let backgroundOption = true;
// Control randomiz

let backGroundInterval;

// Check if there is local storage random background item

const backgroundLoclaItem = localStorage.getItem("background_option");

// Check if there is background in localstorage

if (backgroundLoclaItem) {
  if (backgroundLoclaItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  document.querySelectorAll(".random-backgrounds span").forEach((el) => {
    el.classList.remove("active");
  });

  if (backgroundLoclaItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

function randomizeImg() {
  if (backgroundOption) {
    backGroundInterval = setInterval(() => {
      lanPageEl.style.backgroundImage = `url('images/${
        imgsArray[Math.floor(Math.random() * imgsArray.length)]
      }')`;
    }, 10000);
  }
}
randomizeImg();

// Skills Section

// SELECTORS
const ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills offset top
  let skillsOffSetTop = ourSkills.offsetTop;

  // OUTER HEIGHT
  const outerHeight = ourSkills.offsetHeight;

  // Window Height

  const windowHeight = this.innerHeight;

  // Window Scroll Top
  const woindowScrollTop = this.pageYOffset;

  if (woindowScrollTop > skillsOffSetTop + outerHeight - windowHeight - 10) {
    let allSkills = document.querySelectorAll(".skill-box .progress span");

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Create Popup with the image

const ourGallary = document.querySelectorAll(".gallary img");

ourGallary.forEach((img) => {
  img.addEventListener("click", function (e) {
    // Create Overlay Elemnent
    const overLay = document.createElement("div");

    // Add Class to overlay
    overLay.className = "popup-overlay";

    document.body.appendChild(overLay);

    // Create Popup
    const popupBox = document.createElement("div");

    // Add class
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Create Heading

      const imgHeading = document.createElement("h3");

      // Create text for heading

      const imgText = document.createTextNode(img.alt);

      // Append text
      imgHeading.appendChild(imgText);

      // Append to popup
      popupBox.appendChild(imgHeading);

      imgText.className = "align-text";
    }

    // Create Image
    const popupImage = document.createElement("img");
    popupImage.src = img.src;

    // Add image to popupbox
    popupBox.appendChild(popupImage);

    // Append popupbox to body
    document.body.appendChild(popupBox);

    // Create close span
    const closeBtn = document.createElement("span");

    // Create text close btn
    const closeBtnText = document.createTextNode("X");

    // Append text to close btn
    closeBtn.appendChild(closeBtnText);

    // Close btn add class
    closeBtn.className = "close-btn";

    // Add close btn to the Popup box
    popupBox.appendChild(closeBtn);
  });
});

// Close Popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-btn") {
    // Remove the current Popup
    e.target.parentNode.remove();

    // Remove overLay
    document.querySelector(".popup-overlay").remove();
  }
});

// Select all bullets
const allLinks = document.querySelectorAll(".links a");
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

function scrollToSection(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSection(allLinks);
scrollToSection(allBullets);

function handeActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((e) => {
    e.classList.remove("active");
  });

  ev.target.classList.add("active");
}

// Select spans
const bulletsSpan = document.querySelectorAll(".bullets-option span");

const bulletsContainer = document.querySelector(".nav-bullets");

// Local storage

const bulletLocal = localStorage.getItem("bulletOption");

if (bulletLocal) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocal === "block") {
    bulletsContainer.style.display = "block";

    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bulletOption", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bulletOption", "none");
    }
    handeActive(e);
  });
});

// Reset button
document.querySelector(".reset-options").onclick = function () {
  localStorage.clear();
  window.location.reload();
};

// Toggle Menu

const toggleBtn = document.querySelector(".toggle-menu");
const tlinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  this.classList.toggle("menu-active");
  tlinks.classList.toggle("open");
  e.stopPropagation();
};

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tlinks) {
    if (tlinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      tlinks.classList.toggle("open");
    }
  }
});

tlinks.onclick = function (e) {
  e.stopPropagation();
};
