/* Devin Zarate — portfolio interactions */
(function () {
  "use strict";

  /* ---- Sticky header ---- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    header.classList.toggle("is-stuck", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---- Scroll spy ---- */
  var links = Array.prototype.slice.call(nav.querySelectorAll("a"));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });

    /* ---- One quiet reveal pass per section ---- */
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      var targets = document.querySelectorAll(".band .eyebrow, .band .band-head, .band .about-grid, .band .projects, .band .skills, .band .timeline, .band .contact-grid");
      targets.forEach(function (el) { el.classList.add("reveal"); });
      var revealer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      targets.forEach(function (el) { revealer.observe(el); });
    }
  }

  /* ---- Contact form ----
     Static hosting has no server, so this opens the visitor's mail client
     with the message prefilled. To collect submissions instead, see README. */
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
  var EMAIL = "dez0805@gmail.com";

  function setError(field, on) {
    field.closest(".field").classList.toggle("has-error", on);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = form.name;
    var email = form.email;
    var message = form.message;
    var valid = true;

    [name, email, message].forEach(function (f) {
      var bad = !f.value.trim();
      if (f === email && f.value.trim()) bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim());
      setError(f, bad);
      if (bad) valid = false;
    });

    if (!valid) {
      status.textContent = "Fill in your name, a valid email, and a message.";
      status.classList.add("is-error");
      return;
    }

    var subject = form.subject.value.trim() || "Portfolio enquiry from " + name.value.trim();
    var body = message.value.trim() + "\n\n— " + name.value.trim() + " (" + email.value.trim() + ")";

    window.location.href =
      "mailto:" + EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    status.classList.remove("is-error");
    status.textContent = "Opening your email app with the message ready to send.";
    form.reset();
  });

  /* ---- Footer year ---- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
