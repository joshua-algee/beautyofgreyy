// Single source of truth for the site's pages. Add new pages here.
export const pages = [
  {
    path: "/index.html",
    title: "Beautyofgreyy Photography",
    nav: "index.html",
  },
  { path: "/about.html", title: "About", nav: "about.html" },
  { path: "/pricing.html", title: "Pricing", nav: "pricing.html" },
  {
    path: "/commercial.html",
    title: "Commercial Photography",
    nav: "commercial.html",
  },
  { path: "/portfolio.html", title: "Portfolio", nav: "portfolio.html" },
  { path: "/booking.html", title: "Book a Session", nav: "booking.html" },
  {
    path: "/thank-you.html",
    title: "Thank You",
    nav: null,
    footer: false,
    noindex: true,
  },
];

// Formspree is an external service; tests must never hit it for real.
export const FORMSPREE = /https:\/\/formspree\.io\/.*/;
