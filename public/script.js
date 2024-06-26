const hiddenMenues = document.querySelectorAll(".sec");
const menuLists = document.querySelectorAll(".nav-menu a");
const hiddenMenueAll = document.querySelector(".hidden-menu");
const menuBtn = document.querySelector(".menu-btn");
const libraryOpen = document.querySelector(".top-sec img");
const libraryClose = document.querySelector(".close-btn");
const libraryModal = document.querySelector(".library-modal");
const bannerWrap = document.querySelector(".link-right");
const bannerBox = document.querySelector(".bannerAll");
const banner = document.querySelectorAll(".banner");
const playBanner = document.querySelector(".play");
const leftBanner = document.querySelector(".buttons img:first-child");
const rightBanner = document.querySelector(".buttons img:last-child");

//nav-bar

menuLists.forEach((list, i) => {
  list.addEventListener("mouseenter", () => {
    hiddenMenues[i].classList.add("active");
    hiddenMenueAll.classList.add("active");
    menuBtn.classList.add("active");
  });
  list.addEventListener("mouseleave", () => {
    hiddenMenues[i].classList.remove("active");
    hiddenMenueAll.classList.remove("active");
    menuBtn.classList.remove("active");
  });
});

hiddenMenues.forEach((menu, i) => {
  menu.addEventListener("mouseenter", () => {
    menuLists[i].classList.add("active");
    hiddenMenueAll.classList.add("active");
    menuBtn.classList.add("active");
  });
  menu.addEventListener("mouseleave", () => {
    menuLists[i].classList.remove("active");
    hiddenMenueAll.classList.remove("active");
    menuBtn.classList.remove("active");
  });
});

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  hiddenMenueAll.classList.toggle("active");
});

libraryOpen.addEventListener("click", () => {
  libraryModal.classList.add("active");
});
libraryClose.addEventListener("click", () => {
  libraryModal.classList.remove("active");
});

//banner-slide
const makeClone = bannerBox.cloneNode(true);
makeClone.className = "bannerClone";
bannerWrap.appendChild(makeClone);
bannerBox.style.left = "0px";
makeClone.style.left = bannerBox.offsetWidth + 4 + "px";
bannerBox.classList.add("active");
makeClone.classList.add("active");

const playStop = () => {
  bannerBox.style.animationPlayState = "paused";
  makeClone.style.animationPlayState = "paused";
  playBanner.classList.add("active");
};
const rePlay = () => {
  bannerBox.style.animationPlayState = "running";
  makeClone.style.animationPlayState = "running";
  playBanner.classList.remove("active");
};

bannerWrap.addEventListener("mouseenter", () => {
  playStop();
});
bannerWrap.addEventListener("mouseleave", () => {
  rePlay();
});

playBanner.addEventListener("click", (e) => {
  playBanner.classList.toggle("active");
  if (e.target.classList.length === 2) {
    playStop();
  } else {
    rePlay();
  }
});

leftBanner.addEventListener("click", () => {
  bannerBox.style.animationDirection = "normal";
  makeClone.style.animationDirection = "normal";
});
rightBanner.addEventListener("click", () => {
  bannerBox.style.animationDirection = "reverse";
  makeClone.style.animationDirection = "reverse";
});

//book-slide

const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");
const slideContent = document.querySelectorAll(".slide-inner");
const pagers = document.querySelectorAll(".pager");
const slideTitle = document.querySelectorAll(".slide-title h2");

let currentIndex = 0;
const slideWidth = 600;

slideTitle.forEach((title, i) => {
  title.addEventListener("click", () => {
    slideTitle.forEach((it, index) => {
      if (it !== title) {
        it.classList.remove("active");
        slideContent[index].classList.remove("active");
      }
    });
    title.classList.add("active");
    slideContent[i].classList.add("active");
    currentIndex = 0;
    moveSlide();
  });
});

const moveSlide = () => {
  const newPosition = -slideWidth * currentIndex;
  slideContent[0].style.left = `${newPosition}px`;
  slideContent[1].style.left = `${newPosition}px`;
  slideContent[2].style.left = `${newPosition}px`;

  pagers.forEach((pager, index) => {
    if (index === currentIndex) {
      pager.classList.add("active");
    } else {
      pager.classList.remove("active");
    }
  });
};

const nextSlide = () => {
  currentIndex++;
  if (currentIndex >= pagers.length) {
    currentIndex = 0;
  }
  moveSlide();
};

const prevSlide = () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = pagers.length - 1;
  }
  moveSlide();
};

nextButton.addEventListener("click", () => {
  nextSlide();
});

prevButton.addEventListener("click", () => {
  prevSlide();
});

pagers.forEach((pager, index) => {
  pager.addEventListener("click", () => {
    currentIndex = index;
    moveSlide();
  });
});
