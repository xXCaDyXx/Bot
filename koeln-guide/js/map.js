/* =====================================================================
   KÖLN GUIDE – Interaktive Karte (Leaflet + OpenStreetMap)
   Fällt elegant auf eine reine Listenansicht zurück, falls Leaflet
   (z. B. wegen fehlender Verbindung) nicht geladen werden kann.
   ===================================================================== */
(function () {
  const A = window.APP, K = window.KOELN;
  const { esc, imgURL, mapsURL, catInfo } = A;

  function initMap() {
    const mapEl = document.getElementById("bigmap");
    if (!mapEl) return;

    const hasLeaflet = (typeof L !== "undefined");
    let map = null, group = null, markers = {};
    let activeCat = "alle";

    if (hasLeaflet) {
      map = L.map("bigmap", { scrollWheelZoom: true }).setView([50.9375, 6.9603], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende'
      }).addTo(map);
      group = L.featureGroup().addTo(map);
    } else {
      mapEl.innerHTML = `<div style="height:100%;min-height:400px;display:grid;place-items:center;text-align:center;padding:30px;background:var(--cream)">
        <div><div style="font-size:2.4rem">🗺️</div>
        <p style="max-width:36ch;color:var(--muted)">Die Kartenansicht benötigt eine Internetverbindung. Nutze so lange die Liste links – jeder Ort verlinkt direkt zu Google Maps.</p></div></div>`;
    }

    function makeIcon(cat) {
      const c = catInfo(cat);
      return L.divIcon({
        className: "koeln-pin",
        html: `<div style="background:${c.color};width:30px;height:30px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 3px 8px rgba(0,0,0,.35);border:2px solid #fff;display:grid;place-items:center">
                 <span style="transform:rotate(45deg);font-size:14px">${c.icon}</span></div>`,
        iconSize: [30, 30], iconAnchor: [15, 30], popupAnchor: [0, -30]
      });
    }
    function popupHTML(p) {
      return `<div class="poi-pop">
        <img src="${imgURL(p.image, 320)}" alt="${esc(p.name)}">
        <div class="poi-pop__b">
          <h4>${esc(p.name)}</h4>
          <p>${esc(p.district)} · ${esc(String(p.description).slice(0, 90))}…</p>
          <div class="row">
            <a class="btn btn--primary btn--sm" href="ort.html?id=${p.id}">Details</a>
            <a class="btn btn--ghost btn--sm" href="${mapsURL(p)}" target="_blank" rel="noopener">Maps</a>
          </div>
        </div>
      </div>`;
    }

    if (hasLeaflet) {
      K.places.forEach(p => {
        if (!p.coordinates) return;
        const m = L.marker([p.coordinates.lat, p.coordinates.lng], { icon: makeIcon(p.category) })
          .bindPopup(popupHTML(p), { minWidth: 220, maxWidth: 240 });
        markers[p.id] = m; m.addTo(group);
      });
      if (group.getLayers().length) map.fitBounds(group.getBounds().pad(0.1));
    }

    /* ---- Kategorie-Filter (immer aktiv) ---- */
    const filterMount = document.getElementById("map-filters");
    if (filterMount) {
      const cats = [["alle", "Alle", "📍"]].concat(Object.keys(K.CAT).map(k => [k, K.CAT[k].label, K.CAT[k].icon]));
      filterMount.innerHTML = cats.map((c, i) =>
        `<button class="chip ${i === 0 ? "is-active" : ""}" data-cat="${c[0]}">${c[2]} ${esc(c[1])}</button>`).join("");
      filterMount.addEventListener("click", e => {
        const b = e.target.closest("[data-cat]"); if (!b) return;
        filterMount.querySelectorAll("[data-cat]").forEach(x => x.classList.remove("is-active"));
        b.classList.add("is-active");
        activeCat = b.getAttribute("data-cat");
        applyFilter();
      });
    }

    const side = document.getElementById("map-list");

    function currentList() {
      return K.places.filter(p => activeCat === "alle" || p.category === activeCat);
    }
    function applyFilter() {
      const shown = currentList();
      if (hasLeaflet) {
        group.clearLayers();
        shown.forEach(p => { if (markers[p.id]) markers[p.id].addTo(group); });
        if (shown.length) map.fitBounds(group.getBounds().pad(0.15));
      }
      renderSide(shown);
    }
    function renderSide(list) {
      if (!side) return;
      side.innerHTML = `<p class="result-count">${list.length} Orte</p>` + list.map(p => `
        <div class="map-poi" data-goto="${p.id}">
          <img src="${imgURL(p.image, 140)}" alt="${esc(p.name)}">
          <div>
            <h4>${esc(p.name)}</h4>
            <p>${catInfo(p.category).icon} ${esc(p.district)}</p>
          </div>
        </div>`).join("");
      side.querySelectorAll("[data-goto]").forEach(el => {
        el.addEventListener("click", () => {
          const id = el.getAttribute("data-goto");
          side.querySelectorAll(".map-poi").forEach(x => x.classList.remove("active"));
          el.classList.add("active");
          if (hasLeaflet && markers[id]) {
            map.setView(markers[id].getLatLng(), 15, { animate: true });
            markers[id].openPopup();
          } else {
            location.href = "ort.html?id=" + id;
          }
        });
      });
    }
    renderSide(currentList());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMap);
  } else { initMap(); }
})();
