document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================================
       MOBILE NAVIGATION SYSTEM
       ========================================================================== */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  const toggleMenu = () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.classList.toggle("overflow-hidden"); // Stops background scrolling
  };

  const closeMenu = () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.classList.remove("overflow-hidden");
  };

  hamburger.addEventListener("click", toggleMenu);
  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  /* ==========================================================================
       NAVBAR SCROLL CHANGE STYLING
       ========================================================================== */
  const navbar = document.getElementById("navbar");

  const handleNavbarScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleNavbarScroll);

  /* ==========================================================================
       HERO PARALLAX SCROLL EFFECT
       ========================================================================== */
  const heroBg = document.getElementById("hero-bg");

  const handleParallax = () => {
    if (window.scrollY <= window.innerHeight) {
      const scrollOffset = window.scrollY;
      // Shifting layout fractionally down creates parallax depth look
      heroBg.style.transform = `translateY(${scrollOffset * 0.4}px)`;
    }
  };

  window.addEventListener("scroll", handleParallax);

  /* ==========================================================================
       ACTIVE LINK HIGHLIGHTING ON SCROLL
       ========================================================================== */
  const sections = document.querySelectorAll("section, header, main");

  const highlightNavigation = () => {
    let currentSectionId = "";
    const scrollPosition = window.scrollY + 150; // Dynamic offset coordinates

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", highlightNavigation);

  /* ==========================================================================
       SCROLL REVEAL ANIMATIONS (Intersection Observer API)
       ========================================================================== */
  const revealItems = document.querySelectorAll(".scroll-reveal");

  const revealObserverOptions = {
    root: null,
    threshold: 0.15, // Triggers when 15% of element frame is frame-visible
    rootMargin: "0px 0px -20px 0px",
  };

  const revealCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target); // Prevents executing calculation twice
      }
    });
  };

  const revealObserver = new IntersectionObserver(
    revealCallback,
    revealObserverOptions,
  );
  revealItems.forEach((item) => revealObserver.observe(item));

  /* ==========================================================================
       LIGHTBOX MODAL FRAME WORK FOR GALLERY
       ========================================================================== */
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  let currentImageIndex = 0;
  const imagesArray = [];

  // Extract images references inside the document collection loop
  galleryItems.forEach((item, index) => {
    const img = item.querySelector(".gallery-img");
    imagesArray.push({ src: img.src, alt: img.alt });

    item.addEventListener("click", () => {
      currentImageIndex = index;
      openLightbox();
    });
  });

  const openLightbox = () => {
    updateLightboxContent();
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  };

  const updateLightboxContent = () => {
    const currentData = imagesArray[currentImageIndex];
    lightboxImg.src = currentData.src;
    lightboxImg.alt = currentData.alt;
  };

  const showNextImage = (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
    updateLightboxContent();
  };

  const showPrevImage = (e) => {
    e.stopPropagation();
    currentImageIndex =
      (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
    updateLightboxContent();
  };

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxNext.addEventListener("click", showNextImage);
  lightboxPrev.addEventListener("click", showPrevImage);
  lightbox.addEventListener("click", closeLightbox); // Close clicking overlay context

  // Keyboard Shortcuts Navigation for Lightbox
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNextImage(e);
    if (e.key === "ArrowLeft") showPrevImage(e);
  });

  /* ==========================================================================
       BACK TO TOP BUTTON
       ========================================================================== */
  const backToTopBtn = document.getElementById("backToTop");

  const handleBackToTopVisibility = () => {
    if (window.scrollY > 600) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  };

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("scroll", handleBackToTopVisibility);

  /* ==========================================================================
       CONTACT FORM SUBMISSION HANDLER (Frontend validation)
       ========================================================================== */
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Mock processing state indicator
    const nameInput = document.getElementById("name").value;
    alert(
      `Thank you, ${nameInput}! Your message has been sent successfully. (Frontend Simulation)`,
    );

    contactForm.reset();
  });
});

// Footer
document.getElementById("year").textContent = new Date().getFullYear();
