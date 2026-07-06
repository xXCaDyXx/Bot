/* =====================================================================
   KÖLN GUIDE – Seiten-Renderer
   Listenseiten mit Filter/Suche, Home-Sektionen, Touren, Detail, FAQ.
   ===================================================================== */
(function () {
  const A = window.APP, K = window.KOELN;
  const { esc, imgURL, mapsURL, catInfo, byId, placeCard, wireCards, observeNew } = A;

  /* ============ Generische Listenseite mit Filter + Suche ============ */
  function listPage(cfg) {
    // cfg: { mount, categories:[..] | null, subFilter:bool, extraFilters:[{key,label,options}] }
    const mount = document.getElementById(cfg.mount);
    if (!mount) return;
    let pool = K.places.filter(p => cfg.categories ? cfg.categories.indexOf(p.category) !== -1 : true);

    // Sub-Kategorien / Chips
    const subs = cfg.chipField
      ? Array.from(new Set(pool.map(p => p[cfg.chipField]).filter(Boolean)))
      : [];
    const districts = Array.from(new Set(pool.map(p => p.district))).sort();

    const state = { q: "", chip: "alle", district: "alle", price: "alle", extra: {} };

    mount.innerHTML = `
      <div class="toolbar">
        <div class="search-box">
          <input type="search" id="lp-search" placeholder="Ort, Stadtteil oder Stichwort suchen…" aria-label="Suche">
        </div>
        <select class="select" id="lp-district" aria-label="Stadtteil">
          <option value="alle">Alle Stadtteile</option>
          ${districts.map(d => `<option value="${esc(d)}">${esc(d)}</option>`).join("")}
        </select>
        <select class="select" id="lp-price" aria-label="Preis">
          <option value="alle">Preis: egal</option>
          <option value="frei">Kostenlos</option>
          <option value="€">€ günstig</option>
          <option value="€€">€€ mittel</option>
          <option value="€€€">€€€ gehoben</option>
        </select>
        ${(cfg.extraFilters || []).map(f => `
          <select class="select" data-extra="${f.key}" aria-label="${esc(f.label)}">
            <option value="alle">${esc(f.label)}: alle</option>
            ${f.options.map(o => `<option value="${esc(o.value)}">${esc(o.label)}</option>`).join("")}
          </select>`).join("")}
      </div>
      ${subs.length ? `<div class="chips" id="lp-chips">
        <button class="chip is-active" data-chip="alle">Alle</button>
        ${subs.map(s => `<button class="chip" data-chip="${esc(s)}">${esc(s)}</button>`).join("")}
      </div>` : ""}
      <p class="result-count" id="lp-count"></p>
      <div class="grid grid--3" id="lp-grid"></div>`;

    const grid = mount.querySelector("#lp-grid");
    const count = mount.querySelector("#lp-count");

    function matchPrice(p) {
      if (state.price === "alle") return true;
      const pr = (p.price || "").toLowerCase();
      if (state.price === "frei") return pr.indexOf("kostenlos") !== -1;
      // count € symbols in the price band portion
      const band = (p.price || "").split("·")[0];
      const euros = (band.match(/€/g) || []).length;
      if (state.price === "€") return euros === 1;
      if (state.price === "€€") return euros === 2;
      if (state.price === "€€€") return euros >= 3;
      return true;
    }

    function apply() {
      const q = state.q.trim().toLowerCase();
      const list = pool.filter(p => {
        if (state.chip !== "alle" && cfg.chipField && p[cfg.chipField] !== state.chip) return false;
        if (state.district !== "alle" && p.district !== state.district) return false;
        if (!matchPrice(p)) return false;
        for (const key in state.extra) {
          if (state.extra[key] === "alle") continue;
          const fdef = (cfg.extraFilters || []).find(f => f.key === key);
          if (fdef && fdef.test && !fdef.test(p, state.extra[key])) return false;
        }
        if (q) {
          const hay = [p.name, p.district, p.description, p.subCategory, (p.tags || []).join(" ")].join(" ").toLowerCase();
          if (hay.indexOf(q) === -1) return false;
        }
        return true;
      });
      count.textContent = list.length + (list.length === 1 ? " Ort gefunden" : " Orte gefunden");
      if (!list.length) {
        grid.innerHTML = "";
        grid.insertAdjacentHTML("beforeend", `<div class="empty-state" style="grid-column:1/-1"><div class="big">🔎</div><p>Keine Treffer. Versuch einen anderen Filter oder Suchbegriff.</p></div>`);
        return;
      }
      grid.innerHTML = list.map(p => placeCard(p)).join("");
      wireCards(grid); observeNew(grid);
    }

    mount.querySelector("#lp-search").addEventListener("input", e => { state.q = e.target.value; apply(); });
    mount.querySelector("#lp-district").addEventListener("change", e => { state.district = e.target.value; apply(); });
    mount.querySelector("#lp-price").addEventListener("change", e => { state.price = e.target.value; apply(); });
    mount.querySelectorAll("[data-extra]").forEach(sel => {
      state.extra[sel.getAttribute("data-extra")] = "alle";
      sel.addEventListener("change", e => { state.extra[sel.getAttribute("data-extra")] = e.target.value; apply(); });
    });
    if (subs.length) {
      mount.querySelector("#lp-chips").addEventListener("click", e => {
        const b = e.target.closest("[data-chip]"); if (!b) return;
        mount.querySelectorAll("[data-chip]").forEach(c => c.classList.remove("is-active"));
        b.classList.add("is-active"); state.chip = b.getAttribute("data-chip"); apply();
      });
    }
    apply();
  }

  /* ==================== Home-Sektionen ==================== */
  function homeCategories(mountId) {
    const mount = document.getElementById(mountId);
    if (!mount) return;
    const cats = [
      { href: "sehenswuerdigkeiten.html", icon: "🏛️", t: "Sehenswürdigkeiten", d: "Dom, Brücken, Aussichten & mehr" },
      { href: "foodspots.html", icon: "🍽️", t: "Foodspots", d: "Brauhäuser, Cafés & Streetfood" },
      { href: "aktivitaeten.html", icon: "🎯", t: "Aktivitäten", d: "Von Seilbahn bis Therme" },
      { href: "entspannte-locations.html", icon: "🌿", t: "Entspannte Orte", d: "Chill-Spots am Wasser" },
      { href: "parks.html", icon: "🌳", t: "Parks", d: "Kölns grüne Seiten" },
      { href: "touren.html", icon: "🗓️", t: "Tagespläne", d: "Fertige Touren für jeden Typ" },
      { href: "karte.html", icon: "🗺️", t: "Karte", d: "Alle Orte auf einen Blick" },
      { href: "faq.html", icon: "💬", t: "FAQ & Tipps", d: "Antworten für deinen Besuch" }
    ];
    mount.innerHTML = cats.map(c => `
      <a class="cat-card reveal" href="${c.href}">
        <div class="cat-card__arrow">→</div>
        <div class="cat-card__icon">${c.icon}</div>
        <div><h3>${c.t}</h3><p>${c.d}</p></div>
      </a>`).join("");
  }

  function homeHighlights(mountId) {
    const mount = document.getElementById(mountId);
    if (!mount) return;
    const ids = ["koelner-dom", "rheinboulevard", "rheinauhafen-kranhaeuser", "ehrenfeld-streetart", "flora"];
    const items = ids.map(byId).filter(Boolean);
    mount.innerHTML = items.map((p, i) => `
      <a class="hl reveal ${i === 0 ? "hl--tall" : ""}" href="ort.html?id=${p.id}">
        <img src="${imgURL(p.image, i === 0 ? 900 : 600)}" alt="${esc(p.name)}, Köln" loading="lazy">
        <div class="hl__body">
          <h3>${esc(p.name)}</h3>
          <span>${catInfo(p.category).icon} ${esc(p.district)}</span>
        </div>
      </a>`).join("");
  }

  function homePerfectDay(mountId) {
    const mount = document.getElementById(mountId);
    if (!mount) return;
    const tour = K.tours.find(t => t.id === "koeln-klassiker");
    mount.innerHTML = `<div class="timeline">` + tour.stops.map(s => {
      const p = byId(s.placeId) || {};
      return `<div class="tl-item reveal">
        <div class="tl-time">${s.time} Uhr</div>
        <h4><a href="ort.html?id=${p.id}">${esc(p.name || "")}</a></h4>
        <p>${esc(s.note)}</p>
      </div>`;
    }).join("") + `</div>`;
  }

  function homeMoods(mountId) {
    const mount = document.getElementById(mountId);
    if (!mount) return;
    const moods = [
      { emo: "💕", t: "Romantisch", d: "Sonnenuntergang, Rhein & zu zweit", href: "entspannte-locations.html" },
      { emo: "👟", t: "Aktiv", d: "Rad, Seilbahn, Bootstour", href: "aktivitaeten.html" },
      { emo: "☔", t: "Bei Regen", d: "Museen, Therme, Cafés", href: "aktivitaeten.html" },
      { emo: "👨‍👩‍👧", t: "Mit Familie", d: "Zoo, Flora, Schokolade", href: "aktivitaeten.html" },
      { emo: "🍺", t: "Kölsch & Food", d: "Brauhäuser & Streetfood", href: "foodspots.html" },
      { emo: "🎨", t: "Jung & kreativ", d: "Ehrenfeld & Street Art", href: "sehenswuerdigkeiten.html" },
      { emo: "🌳", t: "Ruhig & grün", d: "Parks & stille Ecken", href: "parks.html" },
      { emo: "📸", t: "Foto-Spots", d: "Die besten Motive", href: "sehenswuerdigkeiten.html" }
    ];
    mount.innerHTML = moods.map(m => `
      <a class="mood reveal" href="${m.href}">
        <div class="emo">${m.emo}</div>
        <h3>${m.t}</h3><p>${m.d}</p>
      </a>`).join("");
  }

  function homeTeaser(mountId, ids) {
    const mount = document.getElementById(mountId);
    if (!mount) return;
    mount.innerHTML = ids.map(byId).filter(Boolean).map(p => placeCard(p)).join("");
    wireCards(mount); observeNew(mount);
  }

  /* ==================== Touren-Seite ==================== */
  function toursPage(mountId) {
    const mount = document.getElementById(mountId);
    if (!mount) return;
    mount.innerHTML = K.tours.map((t, i) => {
      const first = byId(t.stops[0].placeId);
      const last = byId(t.stops[t.stops.length - 1].placeId);
      const routeUrl = "https://www.google.com/maps/dir/" +
        t.stops.map(s => { const p = byId(s.placeId); return p ? p.coordinates.lat + "," + p.coordinates.lng : ""; }).filter(Boolean).join("/");
      return `
      <article class="tour-card reveal" style="margin-bottom:26px">
        <div class="tour-card__media">
          <div class="tour-card__num">${i + 1}</div>
          <img src="${imgURL(t.image, 640)}" alt="${esc(t.title)}" loading="lazy">
        </div>
        <div class="tour-card__body">
          <span class="eyebrow">${esc(t.tags.join(" · "))}</span>
          <h3>${esc(t.title)}</h3>
          <p style="color:var(--muted);margin:0 0 4px">${esc(t.subtitle)}</p>
          <div class="tour-meta">
            <span>⏱️ <b>${esc(t.duration)}</b></span>
            <span>🚩 Start: <b>${esc(t.start)}</b></span>
            <span>🏁 Ende: <b>${esc(t.end)}</b></span>
            <span>💶 <b>${esc(t.cost)}</b></span>
            <span>👥 ${esc(t.forWhom)}</span>
          </div>
          <ul class="tour-stops">
            ${t.stops.map(s => { const p = byId(s.placeId) || {}; return `
              <li>
                <span class="t">${s.time}</span>
                <span><a href="ort.html?id=${p.id}"><b>${esc(p.name || "")}</b></a> — <span class="n">${esc(s.note)}</span></span>
              </li>`; }).join("")}
          </ul>
          <a class="btn btn--primary" href="${routeUrl}" target="_blank" rel="noopener">🗺️ Route in Google Maps öffnen</a>
        </div>
      </article>`;
    }).join("");
    observeNew(mount);
  }

  /* ==================== Detailseite ==================== */
  function detailPage(mountId) {
    const mount = document.getElementById(mountId);
    if (!mount) return;
    const p = byId(A.qs("id"));
    if (!p) {
      mount.innerHTML = `<div class="container section"><div class="empty-state"><div class="big">🤷</div><h2>Ort nicht gefunden</h2><p>Diesen Ort gibt es (noch) nicht in unserem Guide.</p><a class="btn btn--primary" href="index.html">Zur Startseite</a></div></div>`;
      return;
    }
    document.title = p.name + " – KölnGuide";
    const c = catInfo(p.category);
    const fav = A.isFav(p.id);

    // ähnliche & in der Nähe
    const others = K.places.filter(o => o.id !== p.id);
    const similar = others.filter(o => o.category === p.category).slice(0, 3);
    const near = others.map(o => ({ o, d: dist(p.coordinates, o.coordinates) }))
      .sort((a, b) => a.d - b.d).slice(0, 3).map(x => x.o);

    const infoRows = [
      ["Kategorie", c.icon + " " + c.label],
      ["Stadtteil", p.district],
      ["Adresse", p.address],
      ["Beste Zeit", p.bestTime],
      ["Dauer", p.duration],
      ["Kosten", p.price],
      p.weather ? ["Wetter", ({ indoor: "🏠 Indoor", outdoor: "☀️ Outdoor", beides: "🔄 Indoor & Outdoor" })[p.weather] || p.weather] : null,
      p.meta ? ["Picknick", p.meta.picnic ? "✅ Ja" : "—"] : null,
      p.meta ? ["Spaziergang", p.meta.walk ? "✅ Ja" : "—"] : null,
      p.meta ? ["Wasser/Rhein", p.meta.water ? "✅ Ja" : "—"] : null
    ].filter(Boolean);

    mount.innerHTML = `
      <section class="detail-hero">
        <img src="${imgURL(p.image, 1400)}" alt="${esc(p.name)}, ${esc(p.district)}, Köln">
        <div class="container detail-hero__inner">
          <div class="breadcrumb"><a href="index.html">Start</a> › <a href="${catPage(p.category)}">${esc(c.label)}en</a> › ${esc(p.name)}</div>
          <span class="hero__badge">${c.icon} ${esc(p.subCategory || c.label)} · ${esc(p.district)}</span>
          <h1>${esc(p.name)}</h1>
        </div>
      </section>
      <div class="container section">
        <div class="detail-layout">
          <div class="detail-body">
            <div class="tags" style="margin-bottom:22px">${(p.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>
            <h2>Über diesen Ort</h2>
            <p class="intro-copy">${esc(p.description)}</p>
            <h2>Warum es sich lohnt</h2>
            <p class="intro-copy">${esc(p.whyVisit)}</p>
            ${p.tips && p.tips.length ? `<h2>Insider-Tipps</h2><ul class="tip-list">${p.tips.map(t => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
            ${p.goodFor && p.goodFor.length ? `<h2>Ideal für</h2><div class="tags">${p.goodFor.map(g => `<span class="tag">👍 ${esc(g)}</span>`).join("")}</div>` : ""}
            <h2>Lage & Karte</h2>
            <div class="map-embed"><iframe title="Karte ${esc(p.name)}" src="${A.osmEmbed(p)}" loading="lazy"></iframe></div>
            <p style="margin-top:10px"><a class="btn btn--ghost btn--sm" href="${mapsURL(p)}" target="_blank" rel="noopener">🗺️ In Google Maps öffnen</a></p>
          </div>
          <aside>
            <div class="info-card">
              <div class="info-row"><span class="k">📍 Adresse</span><span class="v">${esc(p.address)}</span></div>
              ${infoRows.filter(r => r[0] !== "Adresse").map(r => `<div class="info-row"><span class="k">${esc(r[0])}</span><span class="v">${esc(r[1])}</span></div>`).join("")}
              <a class="btn btn--primary" href="${mapsURL(p)}" target="_blank" rel="noopener">🗺️ Route planen</a>
              <button class="btn btn--ghost" data-fav="${p.id}" aria-pressed="${fav}">${fav ? "❤️ Gespeichert" : "🤍 Zu Favoriten"}</button>
            </div>
          </aside>
        </div>
      </div>
      <section class="section section--cream">
        <div class="container">
          <div class="section-head"><span class="eyebrow">In der Nähe</span><h2>Gleich um die Ecke</h2></div>
          <div class="grid grid--3">${near.map(o => placeCard(o)).join("")}</div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="section-head"><span class="eyebrow">Ähnliche Orte</span><h2>Das könnte dir auch gefallen</h2></div>
          <div class="grid grid--3">${similar.map(o => placeCard(o)).join("")}</div>
        </div>
      </section>`;

    wireCards(mount); observeNew(mount);
    // fav button in sidebar special label
    mount.querySelectorAll('.info-card [data-fav]').forEach(b => {
      b.addEventListener("click", () => {
        const on = A.isFav(p.id);
        b.textContent = on ? "❤️ Gespeichert" : "🤍 Zu Favoriten";
      });
    });
  }

  function catPage(cat) {
    return ({
      sehenswuerdigkeit: "sehenswuerdigkeiten.html",
      food: "foodspots.html",
      aktivitaet: "aktivitaeten.html",
      entspannt: "entspannte-locations.html",
      park: "parks.html"
    })[cat] || "index.html";
  }
  function dist(a, b) {
    if (!a || !b) return 9999;
    const dx = a.lat - b.lat, dy = a.lng - b.lng;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /* ==================== FAQ ==================== */
  function faqPage(mountId) {
    const mount = document.getElementById(mountId);
    if (!mount) return;
    mount.innerHTML = K.faqs.map((f, i) => `
      <div class="faq-item ${i === 0 ? "open" : ""}">
        <button class="faq-q" aria-expanded="${i === 0}">${esc(f.q)}</button>
        <div class="faq-a"><p>${esc(f.a)}</p></div>
      </div>`).join("");
    mount.addEventListener("click", e => {
      const q = e.target.closest(".faq-q"); if (!q) return;
      const item = q.parentElement;
      const open = item.classList.toggle("open");
      q.setAttribute("aria-expanded", open);
    });
  }

  /* ==================== Bildnachweise ==================== */
  function creditsPage(mountId) {
    const mount = document.getElementById(mountId);
    if (!mount) return;
    const files = Array.from(new Set(K.places.map(p => p.image).concat(K.tours.map(t => t.image)))).sort();
    mount.innerHTML = `<ul class="credit-list">` + files.map(f => `
      <li>„${esc(f)}“ — <a href="${A.commonsPage(f)}" target="_blank" rel="noopener" style="display:inline;color:var(--red)">Wikimedia Commons</a></li>`
    ).join("") + `</ul>`;
  }

  window.PAGES = {
    listPage, homeCategories, homeHighlights, homePerfectDay, homeMoods, homeTeaser,
    toursPage, detailPage, faqPage, creditsPage
  };
})();
