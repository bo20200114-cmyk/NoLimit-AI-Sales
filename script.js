// Stryde — scroll-driven product story
// Crossfades: lifestyle hero -> floating product -> macro detail w/ spec labels.

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // Gracefully fall back if an image fails to load — keep the gradient bg.
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      img.style.opacity = "0";
    });
  });

  const heroLayer = document.querySelector('[data-layer="hero"]');
  const productLayer = document.querySelector('[data-layer="product"]');
  const macroLayer = document.querySelector('[data-layer="macro"]');

  const heroImg = heroLayer.querySelector("img");
  const heroContent = heroLayer.querySelector(".hero-content");
  const heroInfo = heroLayer.querySelector(".hero-info");
  const scrollHint = heroLayer.querySelector(".scroll-hint");

  const productShot = productLayer.querySelector(".product-shot");
  const macroImg = macroLayer.querySelector("img");
  const specLabels = gsap.utils.toArray(".spec-label");

  gsap.set(productLayer, { opacity: 0 });
  gsap.set(macroLayer, { opacity: 0 });
  gsap.set(specLabels, { opacity: 0, y: 12 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".story",
      start: "top top",
      end: "+=300%",
      scrub: 1,
      pin: ".story__pin",
      anticipatePin: 1,
    },
  });

  tl
    // fade out hero copy + subtle zoom on the lifestyle photo
    .to(scrollHint, { opacity: 0, duration: 0.25 }, 0)
    .to([heroContent, heroInfo], { opacity: 0, y: -30, duration: 0.7 }, 0.15)
    .to(heroImg, { scale: 1.12, duration: 1 }, 0)
    .to(heroLayer, { opacity: 0, duration: 0.6 }, 0.75)

    // reveal floating product (starts once hero has mostly cleared)
    .fromTo(productLayer, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.15)
    .fromTo(productShot, { scale: 0.82, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7 }, 1.2)
    .to({}, { duration: 0.8 }, 1.9) // hold — product fully settled and readable
    .to(productShot, { scale: 1.35, opacity: 0, duration: 0.7 }, 2.7)
    .to(productLayer, { opacity: 0, duration: 0.5 }, 3.0)

    // macro detail + spec callouts
    .fromTo(macroLayer, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 2.9)
    .fromTo(macroImg, { scale: 1.3 }, { scale: 1, duration: 1.1 }, 2.9)
    .to(specLabels, { opacity: 1, y: 0, duration: 0.5, stagger: 0.13 }, 3.4);

  // Gentle magnetic hover on the newsletter button, purely decorative.
  const submitBtn = document.querySelector(".footer__form button");
  if (submitBtn) {
    submitBtn.addEventListener("mousemove", (e) => {
      const rect = submitBtn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(submitBtn, { x: x * 0.25, y: y * 0.4, duration: 0.3, ease: "power2.out" });
    });
    submitBtn.addEventListener("mouseleave", () => {
      gsap.to(submitBtn, { x: 0, y: 0, duration: 0.4, ease: "power3.out" });
    });
  }
});
