// ALL SELECTORS
const btnLearnMore = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const navLinks = document.querySelector(".nav__links");
const navLink = document.querySelectorAll(".nav__link");
const modal = document.querySelector(".modal ");
const btnShowModal = document.querySelectorAll(".btn--show-modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const nav = document.querySelector(".nav");
const allSections = document.querySelectorAll(".section");
const allImages = document.querySelectorAll("img[data-src]");
const operationsTabs = document.querySelectorAll(".operations__tab");
const operationTabContainer = document.querySelector(
  ".operations__tab-container"
);
const operationsContent = document.querySelectorAll(".operations__content");
const slides = document.querySelectorAll(".slide");
const sliderBtnLeft = document.querySelector(".slider__btn--left");
const sliderBtnRight = document.querySelector(".slider__btn--right");

// LEARN MORE LINK
btnLearnMore.addEventListener("click", (e) => {
  section1.scrollIntoView({ behavior: "smooth" });
});

// WHEN A BUTTON CLICKED , PAGE SCROLL TO SPECIFIC SECTION
navLinks.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// SHOW MODAL BUTTON
btnShowModal.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });
});

// CLOSE MODAL BUTTON
const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnCloseModal.addEventListener("click", closeModal);

// WHEN YOU PRESS ESCAPE MODAL WIL CLOSE
document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") closeModal();
});

// FOR SET OPACITY TO NAVBAR
const showLinks = (e, opacity) => {
  if (e.target.classList.contains("nav__link")) {
    navLink.forEach((link) => {
      if (e.target != link) link.style.opacity = opacity;
    });
  }
};

navLinks.addEventListener("mouseover", (e) => {
  showLinks(e, 0.5);
});

navLinks.addEventListener("mouseout", (e) => {
  showLinks(e, 1);
});

// OBSERVER STICKY
const navObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      nav.classList.add("sticky");
      observer.unobserve(entry.target);
    });
  },
  {
    root: null,
    threshold: 0.2,
  }
);

navObserver.observe(section1);

// SETTING IMAGES OF SECTONS
const allImagesObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.src = entry.target.dataset.src;
      entry.target.addEventListener("load", () => {
        entry.target.classList.remove("lazy-img");
      });
    });
  },
  {
    root: null,
    threshold: 0.6,
  }
);

allImages.forEach((image) => {
  allImagesObserver.observe(image);
});

operationTabContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("operations__tab")) {
    // REMOVE ALL ACTIONS TABS
    operationsTabs.forEach((tab) => {
      tab.classList.remove("operations__tab--active");
    });
    // ACTIVE ACTION TAB
    e.target.classList.add("operations__tab--active");

    // REMOVE ALL ACTIONS CONTENT
    operationsContent.forEach((content) => {
      content.classList.remove("operations__content--active");
    });

    // SHOW CONTENT
    const dataTab = e.target.dataset.tab;

    document
      .querySelector(`.operations__content--${dataTab}`)
      .classList.add("operations__content--active");
  }
});

const allSectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove("section--hidden");
    });
  },
  {
    root: null,
    threshold: 0.3,
  }
);

// ALL SELECTIONS HIDDEN AND OBSERVE
allSections.forEach((section) => {
  section.classList.add("section--hidden");
  allSectionObserver.observe(section);
});

slides.forEach((slide, index) => {
  slide.style.transform = `translateX(${index * 100}%)`;
});

let currentSlide = 0;

// SHOW SLIDES
const showSlides = (currentSlide) => {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
  });
};

// NEXT SLIDE
const nextSlide = () => {
  if (currentSlide == 2) currentSlide = 0;
  else currentSlide++;
  showSlides(currentSlide);
};

// PREVIOUS SLIDE
const prevSlide = () => {
  if (currentSlide == 0) currentSlide = 2;
  else currentSlide--;
  showSlides(currentSlide);
};

// BTN RIGHT SLIDER
sliderBtnRight.addEventListener("click", () => {
  nextSlide();
});

// BTN LEFT SLIDER
sliderBtnLeft.addEventListener("click", () => {
  prevSlide();
});

// FOR LEFT AND RIGHT KEYS KEYBORD
document.addEventListener("keydown", (e) => {
  if (e.key == "ArrowRight") nextSlide();
  else if (e.key == "ArrowLeft") prevSlide();
});
