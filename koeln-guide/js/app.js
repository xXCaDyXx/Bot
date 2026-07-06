/* =====================================================================
   KÖLN GUIDE – App-Kern
   Header/Footer-Injektion, Helper, Favoriten, Suche, Karten-Links.
   ===================================================================== */
(function () {
  const K = window.KOELN;

  /* ---------------- Helpers ---------------- */
  // Bild-URL aus Wikimedia-Commons-Dateiname (Special:FilePath) erzeugen
  function imgURL(file, width) {
    if (!file) return "";
    return "https://commons.wikimedia.org/wiki/Special:FilePath/" +
      encodeURIComponent(file) + "?width=" + (width || 900);
  }
  function commonsPage(file) {
    return "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(file);
  }
  function mapsURL(p) {
    const c = p.coordinates || {};
    if (c.lat && c.lng) {
      return "https://www.google.com/maps/search/?api=1&query=" + c.lat + "," + c.lng;
    }
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(p.name + " Köln");
  }
  function osmEmbed(p) {
    const c = p.coordinates;
    const d = 0.008;
    const bbox = [c.lng - d, c.lat - d, c.lng + d, c.lat + d].join("%2C");
    return "https://www.openstreetmap.org/export/embed.html?bbox=" + bbox +
      "&layer=mapnik&marker=" + c.lat + "%2C" + c.lng;
  }
  function catInfo(cat) { return K.CAT[cat] || { label: cat, color: "#888", icon: "📍" }; }
  function byId(id) { return K.places.find(p => p.id === id); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
  function qs(name) { return new URLSearchParams(location.search).get(name); }

  /* ---------------- Favoriten (localStorage) ---------------- */
  const FAV_KEY = "koeln_favs";
  function getFavs() { try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; } catch (e) { return []; } }
  function isFav(id) { return getFavs().indexOf(id) !== -1; }
  function toggleFav(id) {
    const f = getFavs(); const i = f.indexOf(id);
    if (i === -1) f.push(id); else f.splice(i, 1);
    localStorage.setItem(FAV_KEY, JSON.stringify(f));
    updateFavBadge(); renderFavDrawer();
    document.querySelectorAll('[data-fav="' + id + '"]').forEach(b => {
      const on = isFav(id); b.classList.toggle("is-fav", on); b.textContent = on ? "❤️" : "🤍";
      b.setAttribute("aria-pressed", on);
    });
    return isFav(id);
  }
  function updateFavBadge() {
    const n = getFavs().length;
    document.querySelectorAll(".fav-badge").forEach(b => {
      b.textContent = n; b.classList.toggle("show", n > 0);
    });
  }

  /* ---------------- Navigation ---------------- */
  const NAV = [
    { href: "index.html", label: "Start", match: ["index.html", ""] },
    { href: "sehenswuerdigkeiten.html", label: "Sehenswürdigkeiten" },
    { href: "foodspots.html", label: "Foodspots" },
    { href: "aktivitaeten.html", label: "Aktivitäten" },
    { href: "entspannte-locations.html", label: "Entspannt" },
    { href: "parks.html", label: "Parks" },
    { href: "touren.html", label: "Touren" },
    { href: "karte.html", label: "Karte" },
    { href: "faq.html", label: "FAQ" }
  ];
  function currentPage() {
    const p = location.pathname.split("/").pop();
    return p || "index.html";
  }
  function isActive(item) {
    const cur = currentPage();
    if (item.match) return item.match.indexOf(cur) !== -1;
    return item.href === cur;
  }

  function renderHeader() {
    const mount = document.getElementById("site-header");
    if (!mount) return;
    const links = NAV.map(i => `<a href="${i.href}" class="${isActive(i) ? "is-active" : ""}">${i.label}</a>`).join("");
    mount.innerHTML = `
      <header class="site-header">
        <div class="container site-header__inner">
          <a class="brand" href="index.html" aria-label="Köln Guide Startseite">
            <span class="brand__mark"><span>▲</span></span> Köln<span style="color:var(--red)">Guide</span>
          </a>
          <nav class="nav" aria-label="Hauptnavigation">${links}</nav>
          <div class="header-actions">
            <button class="icon-btn fav-open" aria-label="Favoriten öffnen" data-open-favs>
              ❤️<span class="badge fav-badge">0</span>
            </button>
            <button class="icon-btn burger" aria-label="Menü öffnen" data-open-menu>☰</button>
          </div>
        </div>
      </header>
      <div class="mobile-menu" data-menu>
        <div class="mobile-menu__panel">
          <button class="btn btn--ghost btn--sm mobile-menu__close" data-close-menu>Schließen ✕</button>
          ${NAV.map(i => `<a href="${i.href}" class="${isActive(i) ? "is-active" : ""}">${i.label}</a>`).join("")}
        </div>
      </div>`;

    mount.querySelector("[data-open-menu]").addEventListener("click", () => mount.querySelector("[data-menu]").classList.add("open"));
    mount.querySelector("[data-close-menu]").addEventListener("click", () => mount.querySelector("[data-menu]").classList.remove("open"));
    mount.querySelector("[data-menu]").addEventListener("click", e => { if (e.target.classList.contains("mobile-menu")) e.target.classList.remove("open"); });
    mount.querySelector("[data-open-favs]").addEventListener("click", openFavDrawer);
    updateFavBadge();
  }

  function renderFooter() {
    const mount = document.getElementById("site-footer");
    if (!mount) return;
    const catLinks = [
      ["sehenswuerdigkeiten.html", "Sehenswürdigkeiten"],
      ["foodspots.html", "Foodspots"],
      ["aktivitaeten.html", "Aktivitäten"],
      ["entspannte-locations.html", "Entspannte Orte"],
      ["parks.html", "Beste Parks"]
    ];
    mount.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <a class="brand" href="index.html"><span class="brand__mark"><span>▲</span></span> KölnGuide</a>
              <p>Dein kompletter, unabhängiger Reiseführer für Köln – Sehenswürdigkeiten, Foodspots, Parks, Aktivitäten und die entspanntesten Orte am Rhein.</p>
            </div>
            <div>
              <h4>Kategorien</h4>
              ${catLinks.map(l => `<a href="${l[0]}">${l[1]}</a>`).join("")}
            </div>
            <div>
              <h4>Entdecken</h4>
              <a href="touren.html">Tagespläne &amp; Touren</a>
              <a href="karte.html">Interaktive Karte</a>
              <a href="faq.html">FAQ &amp; Tipps</a>
              <a href="bildnachweise.html">Bildnachweise</a>
            </div>
            <div>
              <h4>Köln in Zahlen</h4>
              <a href="sehenswuerdigkeiten.html">${K.places.filter(p=>p.category==="sehenswuerdigkeit").length} Sehenswürdigkeiten</a>
              <a href="foodspots.html">${K.places.filter(p=>p.category==="food").length} Foodspots</a>
              <a href="parks.html">${K.places.filter(p=>p.category==="park").length} Parks</a>
              <a href="touren.html">${K.tours.length} fertige Touren</a>
            </div>
          </div>
          <div class="footer-note">
            ⚠️ Alle Angaben ohne Gewähr. Öffnungszeiten und Preise können sich ändern – bitte vor dem Besuch aktuell prüfen.
          </div>
          <div class="footer-bottom">
            <span>© ${new Date().getFullYear()} KölnGuide · Ein digitaler Stadtführer für Köln.</span>
            <span>Bilder: Wikimedia Commons (freie Lizenzen) · <a href="bildnachweise.html" style="display:inline">Bildnachweise</a></span>
          </div>
        </div>
      </footer>`;
  }

  /* ---------------- Karte für Ort-Card ---------------- */
  function placeCard(p, opts) {
    opts = opts || {};
    const c = catInfo(p.category);
    const tags = (p.tags || []).slice(0, 3).map(t => `<span class="tag">${esc(t)}</span>`).join("");
    const fav = isFav(p.id);
    return `
      <article class="card reveal" data-place="${p.id}">
        <div class="card__media">
          <button class="fav-btn ${fav ? "is-fav" : ""}" data-fav="${p.id}" aria-label="Zu Favoriten" aria-pressed="${fav}">${fav ? "❤️" : "🤍"}</button>
          <span class="card__cat">${c.icon} ${esc(p.subCategory || c.label)}</span>
          <a href="ort.html?id=${p.id}">
            <img src="${imgURL(p.image, 640)}" alt="${esc(p.name)} – ${esc(p.district)}, Köln" loading="lazy">
          </a>
        </div>
        <div class="card__body">
          <div class="card__district">📍 ${esc(p.district)}</div>
          <h3><a href="ort.html?id=${p.id}">${esc(p.name)}</a></h3>
          <p class="card__desc">${esc(p.description)}</p>
          <div class="card__meta">
            ${p.duration ? `<span>⏱️ ${esc(p.duration)}</span>` : ""}
            ${p.price ? `<span class="price-pill">${esc(String(p.price).split("·")[0].trim())}</span>` : ""}
          </div>
          <div class="tags">${tags}</div>
          <div class="card__foot">
            <a class="btn btn--primary btn--sm" href="ort.html?id=${p.id}">Details</a>
            <a class="btn btn--ghost btn--sm" href="${mapsURL(p)}" target="_blank" rel="noopener" aria-label="${esc(p.name)} in Google Maps">🗺️ Maps</a>
          </div>
        </div>
      </article>`;
  }

  function wireCards(root) {
    (root || document).querySelectorAll("[data-fav]").forEach(btn => {
      if (btn.__wired) return; btn.__wired = true;
      btn.addEventListener("click", e => { e.preventDefault(); e.stopPropagation(); toggleFav(btn.getAttribute("data-fav")); });
    });
  }

  /* ---------------- Favoriten-Drawer ---------------- */
  function ensureDrawer() {
    if (document.getElementById("fav-drawer")) return;
    const d = document.createElement("div");
    d.id = "fav-drawer"; d.className = "drawer";
    d.innerHTML = `
      <div class="drawer__scrim" data-close-drawer></div>
      <div class="drawer__panel">
        <div class="drawer__head">
          <h3 style="margin:0">❤️ Deine Favoriten</h3>
          <button class="btn btn--ghost btn--sm" data-close-drawer>Schließen ✕</button>
        </div>
        <div class="drawer__body" id="fav-drawer-body"></div>
      </div>`;
    document.body.appendChild(d);
    d.querySelectorAll("[data-close-drawer]").forEach(b => b.addEventListener("click", closeFavDrawer));
  }
  function renderFavDrawer() {
    const body = document.getElementById("fav-drawer-body");
    if (!body) return;
    const favs = getFavs().map(byId).filter(Boolean);
    if (!favs.length) {
      body.innerHTML = `<div class="empty-state"><div class="big">🤍</div><p>Noch keine Favoriten.<br>Tippe auf das Herz an einem Ort, um ihn hier zu speichern.</p></div>`;
      return;
    }
    body.innerHTML = favs.map(p => `
      <div class="fav-row">
        <img src="${imgURL(p.image, 160)}" alt="${esc(p.name)}">
        <div>
          <h4><a href="ort.html?id=${p.id}">${esc(p.name)}</a></h4>
          <p>${catInfo(p.category).icon} ${esc(p.district)}</p>
        </div>
        <button class="x" data-fav="${p.id}" aria-label="Entfernen">✕</button>
      </div>`).join("");
    wireCards(body);
  }
  function openFavDrawer() { ensureDrawer(); renderFavDrawer(); document.getElementById("fav-drawer").classList.add("open"); }
  function closeFavDrawer() { const d = document.getElementById("fav-drawer"); if (d) d.classList.remove("open"); }

  /* ---------------- Reveal on scroll ---------------- */
  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    els.forEach(e => io.observe(e));
  }
  // Re-observe dynamically added cards
  function observeNew(root) {
    (root || document).querySelectorAll(".reveal:not(.in)").forEach(e => e.classList.add("in"));
  }

  /* ---------------- Public API ---------------- */
  window.APP = {
    K, imgURL, commonsPage, mapsURL, osmEmbed, catInfo, byId, esc, qs,
    placeCard, wireCards, getFavs, isFav, toggleFav, renderFavDrawer,
    initReveal, observeNew
  };

  // Fülle <img data-file="..."> (z.B. Hero-Bilder) mit der Commons-URL
  function fillDataImages() {
    document.querySelectorAll("img[data-file]").forEach(img => {
      const w = parseInt(img.getAttribute("data-w"), 10) || 1600;
      img.src = imgURL(img.getAttribute("data-file"), w);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderHeader();
    renderFooter();
    ensureDrawer();
    fillDataImages();
    initReveal();
    wireCards(document);
  });
})();
