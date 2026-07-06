# KölnGuide 🏛️

Ein vollständiger, moderner und mobiloptimierter **Tourguide für die Stadt Köln** –
gebaut als schnelle, statische Website mit sauberem HTML, CSS und JavaScript
(ohne Build-Schritt, sofort lauffähig).

## Features

- **Startseite** mit Hero, Schnellkategorien, Top-Highlights, „Perfekter Tag“, Stimmungen und CTA
- **Kategorieseiten:** Sehenswürdigkeiten, Foodspots, Aktivitäten, Entspannte Orte, Parks
- **Touren / Tagespläne:** 5 fertige Routen inkl. Uhrzeiten und Google-Maps-Route
- **Interaktive Karte** (Leaflet + OpenStreetMap) mit Kategorie-Filter, Seitenliste und Popups
- **Dynamische Detailseiten** (`ort.html?id=…`) mit Karte, Tipps, „In der Nähe“ & „Ähnliche Orte“
- **FAQ-Seite** mit aufklappbaren Antworten
- **Suche & Filter** nach Stichwort, Stadtteil, Preis, Wetter und Stimmung
- **Favoriten** (lokal im Browser via `localStorage`) mit Drawer
- Responsive Navigation mit Mobile-Menü, Sticky Header, Smooth Scroll, Hover-Effekte, Reveal-Animationen
- SEO-Titel/Descriptions und Alt-Texte für alle Bilder

## Projektstruktur

```
koeln-guide/
├── index.html                 Startseite
├── sehenswuerdigkeiten.html   Sehenswürdigkeiten
├── foodspots.html             Foodspots
├── aktivitaeten.html          Aktivitäten
├── entspannte-locations.html  Entspannte Orte
├── parks.html                 Parks
├── touren.html                Tagespläne / Touren
├── karte.html                 Interaktive Leaflet-Karte
├── ort.html                   Dynamische Detailseite
├── faq.html                   FAQ & Tipps
├── bildnachweise.html         Bildnachweise
├── css/styles.css             Design-System
└── js/
    ├── data.js                Zentrale Daten (Orte, Touren, FAQ)
    ├── app.js                 Header/Footer, Favoriten, Suche, Helper
    ├── pages.js               Seiten-Renderer (Listen, Detail, Touren, FAQ)
    └── map.js                 Interaktive Karte
```

## Starten

Einfach `index.html` im Browser öffnen. Für die interaktive Karte (Leaflet)
empfiehlt sich ein kleiner lokaler Server:

```bash
cd koeln-guide
python3 -m http.server 8080
# → http://localhost:8080
```

## Daten erweitern

Alle Inhalte liegen zentral in **`js/data.js`**. Ein neuer Ort ist ein Objekt im
`places`-Array:

```js
{
  id: "koelner-dom",
  name: "Kölner Dom",
  category: "sehenswuerdigkeit",   // sehenswuerdigkeit | food | aktivitaet | entspannt | park
  subCategory: "Wahrzeichen",
  district: "Altstadt-Nord",
  address: "Domkloster 4, 50667 Köln",
  coordinates: { lat: 50.9413, lng: 6.9583 },
  description: "…",
  whyVisit: "…",
  tips: ["…"],
  bestTime: "…",
  duration: "…",
  price: "…",
  image: "Der Kölner Dom von Süden - panoramio.jpg", // Wikimedia-Commons-Dateiname
  imageCredit: "Wikimedia Commons",
  tags: ["Historisch", "Foto-Spot", "Kostenlos"]
}
```

Neue Orte erscheinen automatisch auf den passenden Listenseiten, der Karte,
in Suche/Filter und als Detailseite.

## Bilder & Lizenzen

Alle Bilder stammen von **Wikimedia Commons** und stehen unter freien Lizenzen
(CC BY / CC BY-SA / Public Domain). Sie werden über den offiziellen Dienst
`Special:FilePath` geladen. Eine vollständige Übersicht mit Links zu den
Original-Dateiseiten (inkl. Urheber:in & Lizenz) findet sich unter
`bildnachweise.html`.

## Hinweis

Alle Angaben (Adressen, Öffnungszeiten, Preise) ohne Gewähr – bitte vor dem
Besuch aktuell prüfen.
