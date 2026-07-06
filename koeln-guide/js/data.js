/* =====================================================================
   KÖLN GUIDE – Zentrale Datenquelle
   Alle Orte, Touren und FAQ an einem Ort.
   ---------------------------------------------------------------------
   Bildstrategie:
   - `image` enthält den exakten Dateinamen einer Datei auf Wikimedia
     Commons. Die tatsächliche Bild-URL wird in app.js über
     Special:FilePath erzeugt (rechtlich sauber, mit Bildnachweis im
     Footer und auf der Nachweise-Seite).
   - Alle Bilder stehen unter freien Lizenzen (CC BY / CC BY-SA / PD).
   Kategorien: sehenswuerdigkeit | food | aktivitaet | entspannt | park
   ===================================================================== */

window.KOELN = (function () {
  const CAT = {
    sehenswuerdigkeit: { label: "Sehenswürdigkeit", color: "#e2001a", icon: "🏛️" },
    food:             { label: "Foodspot",         color: "#c8102e", icon: "🍽️" },
    aktivitaet:       { label: "Aktivität",         color: "#0a7d5a", icon: "🎯" },
    entspannt:        { label: "Entspannt",         color: "#2563a8", icon: "🌿" },
    park:             { label: "Park",              color: "#3f8f29", icon: "🌳" }
  };

  const places = [
    /* ========================= SEHENSWÜRDIGKEITEN ========================= */
    {
      id: "koelner-dom",
      name: "Kölner Dom",
      category: "sehenswuerdigkeit",
      subCategory: "Wahrzeichen",
      district: "Altstadt-Nord",
      address: "Domkloster 4, 50667 Köln",
      coordinates: { lat: 50.9413, lng: 6.9583 },
      description:
        "Die gotische Kathedrale ist das Wahrzeichen Kölns und UNESCO-Welterbe. 632 Jahre wurde an ihr gebaut, bis sie 1880 vollendet war. Mit ihren zwei 157 Meter hohen Türmen prägt sie die Silhouette der Stadt – und ist meist das Erste, was man beim Ankommen sieht.",
      whyVisit:
        "Kein Ort verkörpert Köln mehr als der Dom. Innen beeindrucken die Buntglasfenster und der Schrein der Heiligen Drei Könige, außen die schiere Größe. Wer die 533 Stufen auf den Südturm steigt, bekommt den besten Rundblick über Stadt und Rhein.",
      tips: [
        "Turmaufstieg früh am Morgen – dann sind die engen Treppen leerer.",
        "Der Dom selbst ist kostenlos; nur Turm, Schatzkammer und Führungen kosten Eintritt.",
        "Gottesdienstzeiten beachten – während der Messe ist keine Besichtigung möglich."
      ],
      bestTime: "Früher Morgen oder blaue Stunde am Abend",
      duration: "1–2 Stunden (mit Turm)",
      price: "Dom kostenlos · Turm ca. 8 € · Bitte aktuell prüfen",
      image: "Der Kölner Dom von Süden - panoramio.jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Historisch", "Foto-Spot", "Kostenlos", "Aussicht", "Familie"]
    },
    {
      id: "hohenzollernbruecke",
      name: "Hohenzollernbrücke",
      category: "sehenswuerdigkeit",
      subCategory: "Brücke",
      district: "Altstadt-Nord / Deutz",
      address: "Hohenzollernbrücke, 50667 Köln",
      coordinates: { lat: 50.9415, lng: 6.9660 },
      description:
        "Die meistbefahrene Eisenbahnbrücke Deutschlands verbindet die Altstadt mit Deutz – direkt hinter dem Dom. Bekannt ist sie vor allem für die zehntausenden Liebesschlösser, die Paare an die Gitter gehängt haben.",
      whyVisit:
        "Von hier hast du den klassischen Postkartenblick auf Dom und Altstadt. Die Brücke ist Fußgänger- und Radweg zugleich und bei Sonnenuntergang einer der schönsten Spots der Stadt.",
      tips: [
        "Für das beste Dom-Foto vom Deutzer Ufer aus fotografieren.",
        "Abends ist die Brücke stimmungsvoll beleuchtet.",
        "Zug-Fans kommen wegen der ständig rollenden Züge auf ihre Kosten."
      ],
      bestTime: "Sonnenuntergang & blaue Stunde",
      duration: "20–40 Minuten",
      price: "Kostenlos",
      image: "Hohenzollernbrücke Köln.jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Foto-Spot", "Kostenlos", "Romantisch", "Aussicht"]
    },
    {
      id: "rheinauhafen-kranhaeuser",
      name: "Rheinauhafen & Kranhäuser",
      category: "sehenswuerdigkeit",
      subCategory: "Moderne Architektur",
      district: "Altstadt-Süd",
      address: "Rheinauhafen, 50678 Köln",
      coordinates: { lat: 50.9295, lng: 6.9640 },
      description:
        "Der ehemalige Handelshafen ist heute Kölns modernstes Viertel. Die drei markanten Kranhäuser, die wie umgekippte Ls über dem Rhein stehen, sind zum neuen Wahrzeichen der Stadt geworden.",
      whyVisit:
        "Ein starker Kontrast zur historischen Altstadt: Glasarchitektur, Promenade am Wasser, schicke Cafés und das Schokoladenmuseum direkt nebenan. Perfekt zum Flanieren.",
      tips: [
        "Die Promenade eignet sich hervorragend für einen entspannten Spaziergang.",
        "Von der Südbrücke aus lassen sich die Kranhäuser gut fotografieren.",
        "Mit dem Schokoladenmuseum und der Altstadt gut kombinierbar."
      ],
      bestTime: "Nachmittag bis Sonnenuntergang",
      duration: "1 Stunde",
      price: "Kostenlos",
      image: "Kranhäuser 2013-06-14-05.JPG",
      imageCredit: "Wikimedia Commons",
      tags: ["Architektur", "Foto-Spot", "Kostenlos", "Modern"]
    },
    {
      id: "altstadt",
      name: "Kölner Altstadt",
      category: "sehenswuerdigkeit",
      subCategory: "Historisches Viertel",
      district: "Altstadt-Nord",
      address: "Fischmarkt & Martinsviertel, 50667 Köln",
      coordinates: { lat: 50.9380, lng: 6.9612 },
      description:
        "Enge Gassen, bunte Giebelhäuser am Fischmarkt, das historische Rathaus und unzählige Brauhäuser: Die Altstadt rund um Groß St. Martin ist das historische Herz Kölns – auch wenn vieles nach dem Krieg wieder aufgebaut wurde.",
      whyVisit:
        "Hier spürt man das rheinische Lebensgefühl am dichtesten: Kölsch im Brauhaus, Musik, Rheinpromenade und Geschichte auf engem Raum. Ideal zum Bummeln ohne Plan.",
      tips: [
        "Der Fischmarkt mit den bunten Häusern ist der Foto-Klassiker.",
        "Abends wird es voll – wer Ruhe will, kommt vormittags.",
        "Vom Rathausturm und der Rheinpromenade hat man schöne Blicke."
      ],
      bestTime: "Später Vormittag oder früher Abend",
      duration: "1–2 Stunden",
      price: "Kostenlos",
      image: "Kölner Dom von Osten.jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Historisch", "Foto-Spot", "Kostenlos", "Familie"]
    },
    {
      id: "gross-st-martin",
      name: "Groß St. Martin",
      category: "sehenswuerdigkeit",
      subCategory: "Romanische Kirche",
      district: "Altstadt-Nord",
      address: "An Groß St. Martin 9, 50667 Köln",
      coordinates: { lat: 50.9382, lng: 6.9606 },
      description:
        "Die romanische Kirche mit ihrem markanten Vierungsturm prägt gemeinsam mit dem Dom die Kölner Skyline vom Rhein aus. Sie ist eine der zwölf großen romanischen Kirchen der Stadt.",
      whyVisit:
        "Ein ruhiger Gegenpol zum trubeligen Fischmarkt direkt davor. Der wuchtige Turm ist eines der schönsten Motive der Altstadt und von der Deutzer Rheinseite besonders eindrucksvoll.",
      tips: [
        "Innen lohnt ein kurzer Blick auf die schlichte romanische Architektur.",
        "Von der Hohenzollernbrücke aus schön mit im Bild.",
        "Gut kombinierbar mit einem Bummel über den Fischmarkt."
      ],
      bestTime: "Vormittag",
      duration: "20–30 Minuten",
      price: "Kostenlos (Spende willkommen)",
      image: "Köln Rhein (51733383229).jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Historisch", "Kostenlos", "Foto-Spot"]
    },
    {
      id: "schokoladenmuseum",
      name: "Schokoladenmuseum",
      category: "sehenswuerdigkeit",
      subCategory: "Museum",
      district: "Altstadt-Süd",
      address: "Am Schokoladenmuseum 1a, 50678 Köln",
      coordinates: { lat: 50.9316, lng: 6.9646 },
      description:
        "Direkt am Rheinauhafen erzählt das Museum die Geschichte der Schokolade von den Maya bis zur modernen Produktion – inklusive gläserner Schauproduktion und dem berühmten drei Meter hohen Schokoladenbrunnen.",
      whyVisit:
        "Eines der beliebtesten Museen Deutschlands und ideal bei Regen. Am Brunnen gibt es eine frische Waffel mit Schokolade – ein Muss, nicht nur für Kinder.",
      tips: [
        "Tickets online kaufen spart Wartezeit an Wochenenden.",
        "Perfekt mit einem Spaziergang durch den Rheinauhafen kombinierbar.",
        "Das Gebäude liegt malerisch auf einer kleinen Halbinsel im Rhein."
      ],
      bestTime: "Vormittag, besonders bei Regen",
      duration: "1,5–2 Stunden",
      price: "€€ · ca. 15 € Erwachsene · Bitte aktuell prüfen",
      image: "Stollwerck-Imhoff-Schokoladenmuseum.JPG",
      imageCredit: "Wikimedia Commons",
      tags: ["Museum", "Familie", "Regen", "Indoor"]
    },
    {
      id: "museum-ludwig",
      name: "Museum Ludwig",
      category: "sehenswuerdigkeit",
      subCategory: "Kunstmuseum",
      district: "Altstadt-Nord",
      address: "Heinrich-Böll-Platz, 50667 Köln",
      coordinates: { lat: 50.9409, lng: 6.9629 },
      description:
        "Direkt neben dem Dom zeigt das Museum Ludwig eine der wichtigsten Sammlungen moderner Kunst weltweit – mit Pop Art, Expressionismus und einer der größten Picasso-Sammlungen Europas.",
      whyVisit:
        "Für Kunstfans ein Pflichtstopp und dank der zentralen Lage perfekt in einen Dom-Besuch integrierbar. Ideal, wenn das Wetter nicht mitspielt.",
      tips: [
        "Donnerstags oft längere Öffnungszeiten – aktuell prüfen.",
        "Am ersten Donnerstag im Monat teils vergünstigt.",
        "Das Café und die Terrasse bieten Blick Richtung Bahnhof und Dom."
      ],
      bestTime: "Nachmittag, besonders bei Regen",
      duration: "1,5–2,5 Stunden",
      price: "€€ · ca. 12 € · Bitte aktuell prüfen",
      image: "Museum Ludwig 002.jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Museum", "Kunst", "Regen", "Indoor"]
    },
    {
      id: "flora",
      name: "Flora & Botanischer Garten",
      category: "sehenswuerdigkeit",
      subCategory: "Garten",
      district: "Riehl",
      address: "Alter Stammheimer Weg 2, 50735 Köln",
      coordinates: { lat: 50.9591, lng: 6.9740 },
      description:
        "Kölns prächtiger botanischer Garten mit dem historischen Festhaus „Flora“, weiten Beeten, Gewächshäusern und Themengärten. Der Eintritt ist kostenlos.",
      whyVisit:
        "Eine grüne Oase direkt neben dem Zoo: kostenlos, wunderschön angelegt und im Frühling ein Blütenmeer. Perfekt für einen ruhigen Spaziergang oder eine Fotosession.",
      tips: [
        "Frühling (Kirschblüte) und Sommer sind am schönsten.",
        "Mit einem Zoo-Besuch ideal zu kombinieren.",
        "Die Gewächshäuser lohnen auch an kühleren Tagen."
      ],
      bestTime: "Frühling & Sommer, Vormittag",
      duration: "1–1,5 Stunden",
      price: "Kostenlos",
      image: "Flora-Köln-Kakteenhaus.JPG",
      imageCredit: "Wikimedia Commons",
      tags: ["Garten", "Kostenlos", "Familie", "Foto-Spot", "Entspannt"]
    },
    {
      id: "seilbahn",
      name: "Kölner Seilbahn",
      category: "sehenswuerdigkeit",
      subCategory: "Aussicht",
      district: "Riehl / Deutz",
      address: "Riehler Straße 180, 50735 Köln",
      coordinates: { lat: 50.9585, lng: 6.9720 },
      description:
        "Deutschlands erste Seilbahn über einen Fluss schwebt seit 1957 zwischen Zoo/Flora und dem Rheinpark über den Rhein. Die Fahrt dauert rund sechs Minuten.",
      whyVisit:
        "Eine kleine, günstige Attraktion mit großem Effekt: Aus der Gondel hat man einen tollen Blick über den Rhein, den Rheinpark und bei klarer Sicht bis zum Dom.",
      tips: [
        "Hin- und Rückfahrt buchen und beide Ufer erkunden.",
        "Betrieb meist nur von Frühjahr bis Herbst – Saison prüfen.",
        "Ideal in Kombination mit Rheinpark und Claudius Therme."
      ],
      bestTime: "Nachmittag bei klarem Wetter",
      duration: "30–45 Minuten",
      price: "€ · ca. 8 € hin/zurück · Bitte aktuell prüfen",
      image: "Rheinseilbahn-Köln-Station-Deutz.JPG",
      imageCredit: "Wikimedia Commons",
      tags: ["Aussicht", "Familie", "Foto-Spot", "Outdoor"]
    },
    {
      id: "rheinboulevard",
      name: "Rheinboulevard",
      category: "sehenswuerdigkeit",
      subCategory: "Aussichtspromenade",
      district: "Deutz",
      address: "Rheinboulevard, 50679 Köln",
      coordinates: { lat: 50.9400, lng: 6.9700 },
      description:
        "Die breite Freitreppe am Deutzer Rheinufer ist Kölns beliebtester Treffpunkt am Wasser. Direkt gegenüber liegen Dom und Altstadt – ein Postkartenpanorama.",
      whyVisit:
        "Der wohl schönste Ort für den Sonnenuntergang in Köln. Bei gutem Wetter sitzen hier abends hunderte Menschen auf den Stufen mit Blick auf die beleuchtete Skyline.",
      tips: [
        "Getränke mitbringen und den Sonnenuntergang genießen.",
        "Am Wochenende früh da sein, um einen guten Platz zu bekommen.",
        "Von hier führt die Hohenzollernbrücke direkt in die Altstadt."
      ],
      bestTime: "Golden Hour & Sonnenuntergang",
      duration: "30–60 Minuten",
      price: "Kostenlos",
      image: "Köln Rhein (51733383229).jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Aussicht", "Kostenlos", "Sonnenuntergang", "Romantisch", "Foto-Spot"]
    },
    {
      id: "koelntriangle",
      name: "KölnTriangle Aussichtsplattform",
      category: "sehenswuerdigkeit",
      subCategory: "Aussicht",
      district: "Deutz",
      address: "Ottoplatz 1, 50679 Köln",
      coordinates: { lat: 50.9407, lng: 6.9720 },
      description:
        "In 100 Metern Höhe bietet die Panoramaplattform des KölnTriangle einen 360-Grad-Rundumblick über die Stadt – mit dem Dom als Hauptdarsteller direkt gegenüber.",
      whyVisit:
        "Der beste bezahlbare Ausblick über Köln. Anders als vom Domturm sieht man hier den Dom selbst in ganzer Pracht. Bei klarer Sicht reicht der Blick bis ins Bergische Land.",
      tips: [
        "Für Sonnenuntergangsfotos ideal – Öffnungszeiten vorher checken.",
        "Deutlich weniger anstrengend als der Domturm (Aufzug!).",
        "Perfekt mit Rheinboulevard und Hohenzollernbrücke kombinierbar."
      ],
      bestTime: "Später Nachmittag / Sonnenuntergang",
      duration: "45–60 Minuten",
      price: "€ · ca. 5 € · Bitte aktuell prüfen",
      image: "Kölner Dom vom KölnTriangle.jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Aussicht", "Foto-Spot", "Romantisch", "Indoor"]
    },
    {
      id: "eigelstein",
      name: "Eigelstein & Eigelsteintorburg",
      category: "sehenswuerdigkeit",
      subCategory: "Veedel",
      district: "Altstadt-Nord",
      address: "Eigelsteintorburg, 50668 Köln",
      coordinates: { lat: 50.9470, lng: 6.9560 },
      description:
        "Das Eigelstein ist ein ursprüngliches, multikulturelles Veedel rund um das mittelalterliche Stadttor. Hier mischen sich alteingesessene Kneipen, orientalische Läden und junge Gastronomie.",
      whyVisit:
        "Wer das echte, ungeschminkte Köln abseits der Touristenpfade sucht, ist hier richtig. Rau, lebendig und authentisch – mit der historischen Torburg als Wahrzeichen.",
      tips: [
        "Gut für einen Spaziergang zwischen Hauptbahnhof und Agnesviertel.",
        "Im „Weißen Holunder“ und Umgebung gibt es urige Kneipen.",
        "Das benachbarte Agnesviertel ist besonders hübsch."
      ],
      bestTime: "Nachmittag & Abend",
      duration: "45–60 Minuten",
      price: "Kostenlos",
      image: "Kölner Dom von Osten.jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Veedel", "Authentisch", "Kostenlos"]
    },
    {
      id: "belgisches-viertel",
      name: "Belgisches Viertel",
      category: "sehenswuerdigkeit",
      subCategory: "Szeneviertel",
      district: "Neustadt-Nord",
      address: "Brüsseler Platz, 50674 Köln",
      coordinates: { lat: 50.9375, lng: 6.9330 },
      description:
        "Das angesagteste Viertel Kölns: Gründerzeithäuser, unabhängige Boutiquen, Concept Stores, Cafés und Bars. Herzstück ist der Brüsseler Platz mit der Kirche St. Michael.",
      whyVisit:
        "Perfekt zum Bummeln, Kaffeetrinken und Leute beobachten. An lauen Sommerabenden trifft sich halb Köln auf dem Brüsseler Platz – lockere, kreative Atmosphäre.",
      tips: [
        "Die Straßennamen sind nach belgischen Städten benannt.",
        "Ideal zum Shoppen abseits der großen Ketten.",
        "Abends beliebt für Drinks in kleinen Bars."
      ],
      bestTime: "Nachmittag bis Abend",
      duration: "1–2 Stunden",
      price: "Kostenlos (Konsum optional)",
      image: "Caffe latte (5665976602).jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Szeneviertel", "Shopping", "Café", "Date-Spot"]
    },
    {
      id: "ehrenfeld-streetart",
      name: "Ehrenfeld & Street Art",
      category: "sehenswuerdigkeit",
      subCategory: "Veedel / Kunst",
      district: "Ehrenfeld",
      address: "Körnerstraße & Umgebung, 50823 Köln",
      coordinates: { lat: 50.9520, lng: 6.9170 },
      description:
        "Ehrenfeld ist Kölns kreatives Herz: ehemaliges Arbeiterviertel, heute voller Bars, Ateliers und der höchsten Dichte großformatiger Murals der Stadt – von internationalen Street-Art-Künstlern.",
      whyVisit:
        "Ein buntes, junges Veedel zum Treiben lassen. Rund um Körner- und Venloer Straße entdeckt man an jeder Ecke Wandkunst, coole Läden und günstiges Streetfood.",
      tips: [
        "Die Körnerstraße ist ideal für eine kleine Street-Art-Runde zu Fuß.",
        "Freitag/Samstag ist das Nachtleben lebendig.",
        "Cargo, Heliosgelände und Venloer Straße lohnen einen Abstecher."
      ],
      bestTime: "Nachmittag; Abend fürs Nachtleben",
      duration: "1–2 Stunden",
      price: "Kostenlos",
      image: "Streetart Kln Ehrenfeld O (258331075).jpeg",
      imageCredit: "Wikimedia Commons",
      tags: ["Street Art", "Veedel", "Kostenlos", "Foto-Spot", "Jung"]
    },
    {
      id: "alter-markt-heumarkt",
      name: "Alter Markt & Heumarkt",
      category: "sehenswuerdigkeit",
      subCategory: "Historische Plätze",
      district: "Altstadt-Nord",
      address: "Alter Markt, 50667 Köln",
      coordinates: { lat: 50.9375, lng: 6.9602 },
      description:
        "Die beiden historischen Plätze im Herzen der Altstadt sind von Brauhäusern und Giebelhäusern gesäumt. Am Heumarkt steht das große Reiterstandbild, am Alten Markt der Jan-von-Werth-Brunnen.",
      whyVisit:
        "Lebendiger Mittelpunkt der Altstadt – Bühne für Karneval, Weihnachtsmarkt und das ganz normale Brauhaus-Treiben. Von hier aus erschließt sich die ganze Altstadt.",
      tips: [
        "Im Winter ist der Heumarkt ein großer Weihnachtsmarkt- und Eisbahn-Standort.",
        "Rund um den Alten Markt reihen sich die traditionsreichen Brauhäuser.",
        "Zu Karneval das Zentrum des Straßentrubels."
      ],
      bestTime: "Nachmittag; saisonal im Winter",
      duration: "30–45 Minuten",
      price: "Kostenlos",
      image: "Kölner Dom von Osten.jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Historisch", "Kostenlos", "Familie"]
    },

    /* ============================== FOODSPOTS ============================== */
    {
      id: "frueh-am-dom",
      name: "Früh am Dom",
      category: "food",
      subCategory: "Brauhäuser & Kölsch",
      district: "Altstadt-Nord",
      address: "Am Hof 12–18, 50667 Köln",
      coordinates: { lat: 50.9400, lng: 6.9575 },
      description:
        "Das wohl bekannteste Brauhaus Kölns, nur einen Steinwurf vom Dom entfernt. Über mehrere Etagen und Gewölbe serviert der Köbes hier das hauseigene Früh Kölsch.",
      whyVisit:
        "Der Klassiker für den ersten Kölsch-Besuch: zentrale Lage, deftige rheinische Küche (Halver Hahn, Himmel un Ääd) und typisches Brauhaus-Flair. Touristisch, aber echt.",
      tips: [
        "Halver Hahn und Rheinischer Sauerbraten sind die Klassiker.",
        "Solange das Glas nicht abgedeckt ist, bringt der Köbes Nachschub.",
        "Mittags oft ruhiger als am Abend."
      ],
      bestTime: "Mittag oder früher Abend",
      duration: "1–1,5 Stunden",
      price: "€€ · Bitte aktuell prüfen",
      image: "Bierkranz Zunft-Kölsch.jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Kölsch", "Klassiker", "Rheinisch", "Familie"]
    },
    {
      id: "paeffgen",
      name: "Päffgen",
      category: "food",
      subCategory: "Brauhäuser & Kölsch",
      district: "Neustadt-Nord",
      address: "Friesenstraße 64–66, 50670 Köln",
      coordinates: { lat: 50.9420, lng: 6.9430 },
      description:
        "Traditionsbrauhaus seit 1883 an der Friesenstraße, in dem das Kölsch noch im eigenen Haus gebraut wird. Urig, laut und herrlich unaufgeregt.",
      whyVisit:
        "Für viele Kölner das „echteste“ Brauhaus: original Päffgen Kölsch, ruppig-charmanter Service und ein wunderschöner Biergarten im Innenhof.",
      tips: [
        "Im Sommer den begrünten Innenhof-Biergarten ansteuern.",
        "Bar zahlen ist gern gesehen.",
        "Weniger touristisch als die Brauhäuser direkt am Dom."
      ],
      bestTime: "Abend; Sommer im Biergarten",
      duration: "1–2 Stunden",
      price: "€€ · Bitte aktuell prüfen",
      image: "Kranz Koelsch.jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Kölsch", "Klassiker", "Biergarten", "Authentisch"]
    },
    {
      id: "lommerzheim",
      name: "Lommerzheim",
      category: "food",
      subCategory: "Brauhäuser & Kölsch",
      district: "Deutz",
      address: "Siegesstraße 18, 50679 Köln",
      coordinates: { lat: 50.9375, lng: 6.9760 },
      description:
        "Das legendäre „Lommi“ in Deutz ist eine Kult-Kneipe mit nikotingelben Wänden, Päffgen Kölsch vom Fass und dem berühmtesten Kotelett der Stadt.",
      whyVisit:
        "Ein echtes Stück Köln: klein, immer voll, keine Reservierung. Das riesige Schweinekotelett ist legendär. Wer Authentizität sucht, ist hier goldrichtig.",
      tips: [
        "Früh kommen oder auf einen Platz gefasst sein – oft lange Schlange.",
        "Das Kotelett ist Pflicht.",
        "Montags Ruhetag – vorher prüfen."
      ],
      bestTime: "Früher Abend",
      duration: "1–1,5 Stunden",
      price: "€€ · Bitte aktuell prüfen",
      image: "Kranz Koelsch.jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Kölsch", "Kult", "Authentisch", "Klassiker"]
    },
    {
      id: "oma-kleinmann",
      name: "Bei Oma Kleinmann",
      category: "food",
      subCategory: "Restaurants",
      district: "Neustadt-Süd",
      address: "Zülpicher Straße 9, 50674 Köln",
      coordinates: { lat: 50.9280, lng: 6.9330 },
      description:
        "Kult-Adresse im Studentenviertel für riesige, hausgemachte Schnitzel in unzähligen Variationen. Seit Jahrzehnten ein fester Begriff in Köln.",
      whyVisit:
        "Schnitzel in XXL, gemütliche Atmosphäre und faire Preise. Ein Klassiker, den Studenten wie Familien lieben – Reservierung empfohlen.",
      tips: [
        "Vorab reservieren, gerade am Wochenende.",
        "Hunger mitbringen – die Portionen sind gewaltig.",
        "Mitten im lebendigen Kwartier Latäng."
      ],
      bestTime: "Abend",
      duration: "1,5 Stunden",
      price: "€€ · Bitte aktuell prüfen",
      image: "Burger and fries (1).jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Klassiker", "Deftig", "Familie"]
    },
    {
      id: "cafe-reichard",
      name: "Café Reichard",
      category: "food",
      subCategory: "Cafés",
      district: "Altstadt-Nord",
      address: "Unter Fettenhennen 11, 50667 Köln",
      coordinates: { lat: 50.9410, lng: 6.9570 },
      description:
        "Traditionskonditorei direkt am Dom mit prächtigem Wintergarten und Blick auf die Kathedrale. Seit 1855 berühmt für Torten, Kuchen und Kölner Kaffeekultur.",
      whyVisit:
        "Kaffee und Kuchen mit dem vielleicht besten Domblick der Stadt. Elegant, klassisch und ideal für eine Pause zwischen den Sehenswürdigkeiten.",
      tips: [
        "Der Wintergarten mit Dom-Blick ist der beste Platz.",
        "Hausgemachte Torten sind das Highlight.",
        "Am Nachmittag gut besucht – etwas Geduld mitbringen."
      ],
      bestTime: "Nachmittag zur Kaffeezeit",
      duration: "45–60 Minuten",
      price: "€€ · Bitte aktuell prüfen",
      image: "Cafe Latte.jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Café", "Kuchen", "Klassiker", "Aussicht"]
    },
    {
      id: "coffee-gang",
      name: "The Coffee Gang",
      category: "food",
      subCategory: "Cafés",
      district: "Neustadt-Nord",
      address: "Friesenwall 68, 50672 Köln",
      coordinates: { lat: 50.9400, lng: 6.9420 },
      description:
        "Ambitioniertes Specialty-Coffee-Café am Friesenwall mit eigener Röstphilosophie, guten Filterkaffees und Flat Whites für Kaffee-Nerds.",
      whyVisit:
        "Wer richtig guten Kaffee sucht, wird hier fündig. Kleines, feines Café mit fokussiertem Angebot – ideal für einen kurzen Qualitäts-Stopp.",
      tips: [
        "Filterkaffee probieren, nicht nur Espresso-Getränke.",
        "Klein und beliebt – zu Stoßzeiten kann es eng werden.",
        "Perfekt vor einem Bummel durchs Belgische Viertel."
      ],
      bestTime: "Vormittag",
      duration: "30–45 Minuten",
      price: "€€ · Bitte aktuell prüfen",
      image: "Caffe Latte.jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Café", "Specialty Coffee", "Vegan", "Date-Spot"]
    },
    {
      id: "bunte-burger",
      name: "Bunte Burger",
      category: "food",
      subCategory: "Streetfood",
      district: "Ehrenfeld",
      address: "Neptunplatz 5, 50823 Köln",
      coordinates: { lat: 50.9500, lng: 6.9200 },
      description:
        "Bio- und veganfreundliches Burger-Lokal in Ehrenfeld mit hausgemachten Patties, auch pflanzlich, und regionalen Zutaten.",
      whyVisit:
        "Burger, die auch Veggies und Veganer glücklich machen – frisch, bio und lecker. Passt perfekt zum kreativen Ehrenfeld-Vibe.",
      tips: [
        "Auch komplett vegane Varianten im Angebot.",
        "Gut für einen unkomplizierten Lunch in Ehrenfeld.",
        "Mit einer Street-Art-Runde kombinieren."
      ],
      bestTime: "Mittag & Abend",
      duration: "45–60 Minuten",
      price: "€€ · Bitte aktuell prüfen",
      image: "Burger and fries (1).jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Streetfood", "Vegan", "Bio", "Günstig", "Jung"]
    },
    {
      id: "mashery",
      name: "Mashery Hummus Kitchen",
      category: "food",
      subCategory: "Streetfood",
      district: "Neustadt-Nord",
      address: "Belgisches Viertel, 50674 Köln",
      coordinates: { lat: 50.9370, lng: 6.9350 },
      description:
        "Modernes Hummus- und Levante-Konzept im Belgischen Viertel: cremiger Hummus, Falafel, Shakshuka und frische Bowls – viel Vegetarisches und Veganes.",
      whyVisit:
        "Frisch, gesund und lecker – eine willkommene Abwechslung zur deftigen Brauhausküche. Ideal für ein leichtes, modernes Mittagessen.",
      tips: [
        "Hummus-Varianten und Shakshuka sind die Renner.",
        "Viele vegetarische und vegane Optionen.",
        "Zentral im Belgischen Viertel gelegen."
      ],
      bestTime: "Mittag",
      duration: "45–60 Minuten",
      price: "€€ · Bitte aktuell prüfen",
      image: "Crown Burger Plus hamburger and fries.jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Streetfood", "Vegan", "Vegetarisch", "Gesund", "Modern"]
    },
    {
      id: "bastians-burger",
      name: "Bastian's Burger",
      category: "food",
      subCategory: "Streetfood",
      district: "Altstadt-Nord",
      address: "Innenstadt, 50667 Köln",
      coordinates: { lat: 50.9370, lng: 6.9490 },
      description:
        "Beliebte Kölner Burger-Adresse mit saftigen Patties, frischen Buns und wechselnden Specials – solide Qualität zum fairen Preis.",
      whyVisit:
        "Wenn es schnell, unkompliziert und lecker sein soll: ehrliche Burger ohne Chichi. Ein guter Stopp beim Shopping in der Innenstadt.",
      tips: [
        "Nach dem Bummel über Schildergasse/Hohe Straße gut erreichbar.",
        "Auch vegetarische Burger im Angebot.",
        "Öffnungszeiten bitte aktuell prüfen."
      ],
      bestTime: "Mittag & Abend",
      duration: "45 Minuten",
      price: "€€ · Bitte aktuell prüfen",
      image: "Crown Burger Plus hamburger and fries.jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Streetfood", "Günstig", "Klassiker"]
    },
    {
      id: "eisdielerin",
      name: "Die Eisdielerin",
      category: "food",
      subCategory: "Süßes & Dessert",
      district: "Ehrenfeld",
      address: "Ehrenfeld, 50823 Köln",
      coordinates: { lat: 50.9490, lng: 6.9200 },
      description:
        "Kleine, feine Eismanufaktur in Ehrenfeld mit hausgemachtem Eis, kreativen Sorten und veganen Varianten aus regionalen Zutaten.",
      whyVisit:
        "Handgemachtes Eis abseits der Massenware – oft mit ungewöhnlichen, saisonalen Sorten. Perfekt für die süße Pause beim Ehrenfeld-Bummel.",
      tips: [
        "Nach veganen Sorten fragen – meist mehrere im Angebot.",
        "Im Sommer kann es eine kleine Schlange geben.",
        "Gut kombinierbar mit Street Art an der Körnerstraße."
      ],
      bestTime: "Nachmittag im Sommer",
      duration: "20–30 Minuten",
      price: "€ · Bitte aktuell prüfen",
      image: "Gelato ice cream.jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Dessert", "Eis", "Vegan", "Günstig", "Jung"]
    },
    {
      id: "lecko-mio",
      name: "Lecko Mio",
      category: "food",
      subCategory: "Süßes & Dessert",
      district: "Innenstadt / Südstadt",
      address: "Südstadt, 50678 Köln",
      coordinates: { lat: 50.9230, lng: 6.9560 },
      description:
        "Beliebte Eisdiele mit italienischem Gelato, cremigen Klassikern und wechselnden Sorten – ein fester Sommer-Treffpunkt.",
      whyVisit:
        "Gutes, günstiges Eis für zwischendurch. Ideal für einen Spaziergang durch die charmante Südstadt.",
      tips: [
        "Mit einem Bummel durch die Südstadt verbinden.",
        "Klassiker wie Pistazie und Stracciatella sind top.",
        "Öffnungszeiten saisonabhängig – aktuell prüfen."
      ],
      bestTime: "Nachmittag im Sommer",
      duration: "20–30 Minuten",
      price: "€ · Bitte aktuell prüfen",
      image: "Ice cream cone (cropped).jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Dessert", "Eis", "Günstig", "Klassiker"]
    },
    {
      id: "bastians-brunch",
      name: "Frühstück im Belgischen Viertel",
      category: "food",
      subCategory: "Frühstück & Brunch",
      district: "Neustadt-Nord",
      address: "Rund um den Brüsseler Platz, 50674 Köln",
      coordinates: { lat: 50.9378, lng: 6.9340 },
      description:
        "Rund um den Brüsseler Platz reiht sich Café an Café. Von ausgiebigem Brunch über Avocado-Toast bis zu Croissants findet man hier die beste Frühstücksdichte der Stadt.",
      whyVisit:
        "Perfekt, um einen entspannten Vormittag zu starten: draußen sitzen, Kaffee trinken, Leute beobachten. Am Wochenende Kölns Brunch-Hotspot.",
      tips: [
        "Am Wochenende früh kommen oder reservieren.",
        "Viele Läden bieten vegane und vegetarische Optionen.",
        "Danach direkt weiter zum Shopping im Viertel."
      ],
      bestTime: "Wochenendvormittag",
      duration: "1–1,5 Stunden",
      price: "€€ · Bitte aktuell prüfen",
      image: "Caffe latte (5665976602).jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Brunch", "Café", "Date-Spot", "Vegan"]
    },

    /* ============================== AKTIVITÄTEN ============================== */
    {
      id: "rhein-spaziergang",
      name: "Spaziergang an der Rheinpromenade",
      category: "aktivitaet",
      subCategory: "Outdoor",
      district: "Altstadt",
      address: "Rheingarten, 50667 Köln",
      coordinates: { lat: 50.9385, lng: 6.9630 },
      description:
        "Vom Rheingarten an der Altstadt entlang bis zum Rheinauhafen führt eine der schönsten Promenaden der Stadt – immer am Wasser, mit Blick auf Schiffe, Brücken und Skyline.",
      whyVisit:
        "Kostenlos, jederzeit möglich und der beste Weg, Kölns Verhältnis zum Rhein zu verstehen. Ideal zum Ankommen und Runterkommen.",
      tips: [
        "Am schönsten Richtung Süden zum Rheinauhafen.",
        "Bei Sonnenuntergang besonders stimmungsvoll.",
        "Unterwegs viele Eis- und Kaffeestopps."
      ],
      bestTime: "Nachmittag & Sonnenuntergang",
      duration: "1–2 Stunden",
      price: "Kostenlos",
      weather: "outdoor",
      goodFor: ["Paare", "Familien", "Freunde"],
      image: "Köln Rhein (51733383229).jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Outdoor", "Kostenlos", "Romantisch", "Sonnenuntergang"]
    },
    {
      id: "fahrradtour-rhein",
      name: "Fahrradtour am Rhein",
      category: "aktivitaet",
      subCategory: "Outdoor",
      district: "Riehl / Rodenkirchen",
      address: "Rheinuferweg, Köln",
      coordinates: { lat: 50.9490, lng: 6.9750 },
      description:
        "Auf gut ausgebauten Uferwegen lässt sich Köln bestens mit dem Rad erkunden – vom Rheinpark im Norden bis zur Rodenkirchener Riviera im Süden.",
      whyVisit:
        "Flach, entspannt und abwechslungsreich: Parks, Strände, Brücken und Aussichtspunkte reihen sich am Rhein aneinander. Leihräder gibt es überall in der Stadt.",
      tips: [
        "Leihrad per App (KVB-Rad) unkompliziert ausleihen.",
        "Beide Rheinseiten lassen sich über die Brücken zu einer Runde verbinden.",
        "Richtung Süden wird es ruhiger und grüner."
      ],
      bestTime: "Vormittag oder Nachmittag",
      duration: "2–3 Stunden",
      price: "€ · Leihrad ca. 1–2 €/30 Min · Bitte aktuell prüfen",
      weather: "outdoor",
      goodFor: ["Freunde", "Paare", "Familien"],
      image: "Cologne rheinpark 20060521.jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Outdoor", "Sport", "Aktiv", "Familie"]
    },
    {
      id: "bootstour-rhein",
      name: "Bootstour auf dem Rhein",
      category: "aktivitaet",
      subCategory: "Outdoor",
      district: "Altstadt",
      address: "Anleger Konrad-Adenauer-Ufer, 50668 Köln",
      coordinates: { lat: 50.9420, lng: 6.9620 },
      description:
        "Vom Anleger an der Altstadt starten Panorama-Rundfahrten auf dem Rhein. In rund einer Stunde sieht man Dom, Brücken, Kranhäuser und Skyline vom Wasser aus.",
      whyVisit:
        "Die entspannteste Art, Kölns Wahrzeichen auf einmal zu sehen. Besonders schön am frühen Abend, wenn die Stadt in warmes Licht getaucht ist.",
      tips: [
        "Panorama-Rundfahrt (ca. 1 Std.) reicht für die Highlights.",
        "Sonnenuntergangsfahrten sind besonders beliebt.",
        "Tickets am Anleger oder online – Zeiten prüfen."
      ],
      bestTime: "Später Nachmittag",
      duration: "1–2 Stunden",
      price: "€€ · ca. 15 € · Bitte aktuell prüfen",
      weather: "outdoor",
      goodFor: ["Paare", "Familien", "Freunde"],
      image: "Köln Rhein (51733383229).jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Outdoor", "Aussicht", "Romantisch", "Familie"]
    },
    {
      id: "zoo-koeln",
      name: "Kölner Zoo",
      category: "aktivitaet",
      subCategory: "Familie",
      district: "Riehl",
      address: "Riehler Straße 173, 50735 Köln",
      coordinates: { lat: 50.9580, lng: 6.9730 },
      description:
        "Einer der ältesten Zoos Deutschlands mit großzügigem Elefantenpark, Regenwaldhaus (Hippodom) und rund 10.000 Tieren – direkt neben der Flora.",
      whyVisit:
        "Ein Klassiker für Familien und ein schöner Halbtagesausflug. Mit Flora und Seilbahn direkt nebenan lässt sich ein ganzer Tag füllen.",
      tips: [
        "Mit Seilbahnstation direkt am Zoo perfekt kombinierbar.",
        "Der Elefantenpark ist einer der größten Europas.",
        "Online-Tickets sparen Wartezeit."
      ],
      bestTime: "Vormittag",
      duration: "2–4 Stunden",
      price: "€€ · ca. 22 € · Bitte aktuell prüfen",
      weather: "beides",
      goodFor: ["Familien"],
      image: "Zoo Koeln Hippodom Hippopotamus amphibius.jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Familie", "Tiere", "Halbtag"]
    },
    {
      id: "claudius-therme",
      name: "Claudius Therme",
      category: "aktivitaet",
      subCategory: "Wellness",
      district: "Deutz",
      address: "Sachsenbergstraße 1, 50679 Köln",
      coordinates: { lat: 50.9490, lng: 6.9800 },
      description:
        "Thermalbad und Saunalandschaft im Rheinpark – mit Innen- und Außenbecken, Blick ins Grüne und einer großzügigen Saunawelt.",
      whyVisit:
        "Der perfekte Ort zum Entspannen, besonders im Winter oder bei schlechtem Wetter. Nach einem langen Sightseeing-Tag pures Wohlfühlen.",
      tips: [
        "Handtuch und Bademantel mitbringen oder ausleihen.",
        "Mit Rheinpark und Seilbahn gut kombinierbar.",
        "An Wochenenden gut besucht – früh kommen."
      ],
      bestTime: "Abend oder Regentag",
      duration: "2–4 Stunden",
      price: "€€€ · Bitte aktuell prüfen",
      weather: "indoor",
      goodFor: ["Paare", "Freunde"],
      image: "Trinkwasserbrunnen-Claudius-Therme-Köln-Deutz.JPG",
      imageCredit: "Wikimedia Commons",
      tags: ["Wellness", "Regen", "Indoor", "Entspannt", "Date-Spot"]
    },
    {
      id: "shopping-schildergasse",
      name: "Shopping: Schildergasse & Hohe Straße",
      category: "aktivitaet",
      subCategory: "Shopping",
      district: "Altstadt-Nord",
      address: "Schildergasse, 50667 Köln",
      coordinates: { lat: 50.9360, lng: 6.9500 },
      description:
        "Die Schildergasse gehört zu den meistfrequentierten Einkaufsstraßen Europas. Zusammen mit der Hohen Straße bildet sie Kölns große Fußgänger-Shoppingzone.",
      whyVisit:
        "Alle großen Marken auf einer autofreien Achse zwischen Neumarkt und Dom. Für individuelleres Shopping lohnt der Abstecher ins Belgische Viertel.",
      tips: [
        "Für Ketten die Schildergasse, für Individuelles das Belgische Viertel.",
        "Samstags sehr voll – wochentags entspannter.",
        "Endet praktischerweise fast direkt am Dom."
      ],
      bestTime: "Wochentags nachmittags",
      duration: "1–3 Stunden",
      price: "Kostenlos (Bummeln)",
      weather: "beides",
      goodFor: ["Freunde", "Familien"],
      image: "Kölner Dom von Osten.jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Shopping", "Regen", "Familie"]
    },
    {
      id: "indoor-aktivitaeten",
      name: "Escape Rooms, Bowling & Minigolf",
      category: "aktivitaet",
      subCategory: "Indoor",
      district: "verschiedene Veedel",
      address: "Verschiedene Standorte, Köln",
      coordinates: { lat: 50.9380, lng: 6.9450 },
      description:
        "Für Regentage oder Abende mit Freunden bietet Köln zahlreiche Indoor-Aktivitäten: Escape Rooms, Bowlingbahnen, Indoor-Minigolf und Kletterhallen.",
      whyVisit:
        "Ideal, wenn das Wetter nicht mitspielt oder man mit einer Gruppe etwas erleben will. Über die ganze Stadt verteilt und meist gut erreichbar.",
      tips: [
        "Escape Rooms unbedingt vorher buchen.",
        "Gut als Plan B bei Regen.",
        "Viele Angebote in Ehrenfeld und der Innenstadt."
      ],
      bestTime: "Abend oder Regentag",
      duration: "1–3 Stunden",
      price: "€€ · Bitte aktuell prüfen",
      weather: "indoor",
      goodFor: ["Freunde", "Familien"],
      image: "Museum Ludwig 002.jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Indoor", "Regen", "Freunde", "Aktiv"]
    },
    {
      id: "weihnachtsmaerkte",
      name: "Kölner Weihnachtsmärkte",
      category: "aktivitaet",
      subCategory: "Saisonal (Winter)",
      district: "mehrere Standorte",
      address: "Roncalliplatz am Dom u.a., 50667 Köln",
      coordinates: { lat: 50.9405, lng: 6.9595 },
      description:
        "Von Ende November bis Weihnachten verwandeln mehrere große Märkte die Stadt in ein Lichtermeer – der bekannteste liegt direkt am Dom auf dem Roncalliplatz.",
      whyVisit:
        "Kölns Weihnachtsmärkte zählen zu den schönsten Deutschlands. Glühwein, Kunsthandwerk und der Dom als Kulisse – man kann bequem mehrere Märkte zu Fuß ablaufen.",
      tips: [
        "Mehrere Märkte an einem Abend verbinden (Dom, Altstadt, Heumarkt, Neumarkt).",
        "Der Markt am Rhein/Schokoladenmuseum ist besonders hübsch.",
        "Wochentags weniger voll als am Wochenende."
      ],
      bestTime: "Abend, Ende Nov.–Dez.",
      duration: "1–3 Stunden",
      price: "Kostenlos (Konsum optional)",
      weather: "outdoor",
      goodFor: ["Paare", "Familien", "Freunde"],
      image: "Der Kölner Dom von Süden - panoramio.jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Saisonal", "Winter", "Romantisch", "Familie", "Foto-Spot"]
    },
    {
      id: "karneval",
      name: "Kölner Karneval",
      category: "aktivitaet",
      subCategory: "Saisonal (Winter)",
      district: "ganze Stadt",
      address: "Altstadt, Zülpicher Viertel u.a., Köln",
      coordinates: { lat: 50.9370, lng: 6.9560 },
      description:
        "Die „fünfte Jahreszeit“ ist Kölns größtes Fest. Höhepunkt ist die Karnevalswoche im Februar/März mit Straßenkarneval, Sitzungen und dem großen Rosenmontagszug.",
      whyVisit:
        "Ein einmaliges Erlebnis: verkleidete Menschen, Musik und ausgelassene Stimmung in der ganzen Stadt. Wer Köln von seiner ausgelassensten Seite erleben will, kommt zu Karneval.",
      tips: [
        "Termine variieren jährlich – Datum vorab prüfen.",
        "Ein Kostüm gehört unbedingt dazu.",
        "Zülpicher Viertel und Altstadt sind die Hotspots (und sehr voll)."
      ],
      bestTime: "Feb./März (Karnevalswoche)",
      duration: "Halber bis ganzer Tag",
      price: "Kostenlos (Straßenkarneval)",
      weather: "beides",
      goodFor: ["Freunde", "Paare"],
      image: "Kölner Dom von Osten.jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Saisonal", "Winter", "Feiern", "Jung", "Kostenlos"]
    },

    /* ============================ ENTSPANNTE ORTE ============================ */
    {
      id: "aachener-weiher",
      name: "Aachener Weiher",
      category: "entspannt",
      subCategory: "See & Wiese",
      district: "Lindenthal",
      address: "Aachener Weiher, 50931 Köln",
      coordinates: { lat: 50.9345, lng: 6.9270 },
      description:
        "Kleiner See im Inneren Grüngürtel, an dessen Wiesen sich bei gutem Wetter Studenten, Familien und Feierabend-Kölner treffen. Ein Kiosk („Büdchen“) sorgt für Getränke.",
      whyVisit:
        "Einer der beliebtesten Chill-Spots der Stadt: Decke ausbreiten, Sonne genießen, aufs Wasser schauen. Am Abend legen hier oft DJs auf, im Sommer ist richtig was los.",
      tips: [
        "Sonnenuntergang über dem Wasser mitnehmen.",
        "Am Wochenende früh einen Wiesenplatz sichern.",
        "Getränke am Kiosk vor Ort erhältlich."
      ],
      bestTime: "Nachmittag bis Sonnenuntergang",
      duration: "1–3 Stunden",
      price: "Kostenlos",
      goodFor: ["Freunde", "Paare", "Sonnenuntergang", "Picknick"],
      image: "Koeln-Muengersdorf-Adenauer-Weiher-059.JPG",
      imageCredit: "Wikimedia Commons",
      tags: ["Entspannt", "Kostenlos", "Sonnenuntergang", "Picknick", "Jung"]
    },
    {
      id: "bruesseler-platz",
      name: "Brüsseler Platz",
      category: "entspannt",
      subCategory: "Platz",
      district: "Neustadt-Nord",
      address: "Brüsseler Platz, 50674 Köln",
      coordinates: { lat: 50.9375, lng: 6.9330 },
      description:
        "Der von Platanen gesäumte Platz vor der Kirche St. Michael ist der soziale Mittelpunkt des Belgischen Viertels – tagsüber ruhig, an lauen Abenden voller Leben.",
      whyVisit:
        "An warmen Sommerabenden sitzt hier halb Köln auf den Treppen und am Brunnen. Lockere, kreative Atmosphäre, umgeben von Cafés und Bars.",
      tips: [
        "Getränk vom Späti holen und einfach dazusetzen.",
        "Abends besonders lebendig, aber bitte rücksichtsvoll (Anwohner).",
        "Perfekt nach einem Bummel durchs Viertel."
      ],
      bestTime: "Lauer Sommerabend",
      duration: "1–2 Stunden",
      price: "Kostenlos",
      goodFor: ["Freunde", "Date", "Sonnenuntergang"],
      image: "Caffe latte (5665976602).jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Entspannt", "Kostenlos", "Jung", "Date-Spot"]
    },
    {
      id: "rodenkirchener-riviera",
      name: "Rodenkirchener Riviera",
      category: "entspannt",
      subCategory: "Strand am Rhein",
      district: "Rodenkirchen",
      address: "Rheinufer Rodenkirchen, 50996 Köln",
      coordinates: { lat: 50.8880, lng: 6.9950 },
      description:
        "Im Süden Kölns wird das Rheinufer flach und sandig – die „Riviera“ von Rodenkirchen. Kleine Strände, Biergärten und viel Ruhe abseits der Innenstadt.",
      whyVisit:
        "Fast Urlaubsgefühl: Füße in den Sand, Schiffe beobachten, in einem der Biergärten ein Kölsch trinken. Der entspannteste Rhein-Abschnitt der Stadt.",
      tips: [
        "Mit dem Rad am Ufer entlang gut erreichbar.",
        "Biergarten am Rodenkirchener Ufer einplanen.",
        "Nicht im Rhein schwimmen – starke Strömung!"
      ],
      bestTime: "Sommernachmittag",
      duration: "1–3 Stunden",
      price: "Kostenlos",
      goodFor: ["Paare", "Familien", "Freunde", "Picknick"],
      image: "Köln Rhein (51733383229).jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Entspannt", "Kostenlos", "Strand", "Familie", "Picknick"]
    },
    {
      id: "stadtgarten-relax",
      name: "Stadtgarten",
      category: "entspannt",
      subCategory: "Park",
      district: "Neustadt-Nord",
      address: "Venloer Straße 40, 50672 Köln",
      coordinates: { lat: 50.9430, lng: 6.9370 },
      description:
        "Kölns ältester kommunaler Park mit altem Baumbestand, einem beliebten Biergarten und der renommierten Jazz-Bühne des Stadtgarten-Kulturhauses.",
      whyVisit:
        "Grüne Ruheinsel mitten in der Stadt, tagsüber zum Entspannen, abends für Konzerte und Biergarten-Abende. Zentral und trotzdem erholsam.",
      tips: [
        "Der Biergarten ist im Sommer ein Klassiker.",
        "Konzertprogramm des Kulturhauses checken.",
        "Ideal für eine Pause zwischen Belgischem Viertel und Ehrenfeld."
      ],
      bestTime: "Nachmittag & Abend",
      duration: "1–2 Stunden",
      price: "Kostenlos (Biergarten optional)",
      goodFor: ["Freunde", "Date", "Spaziergang"],
      image: "Stadtgarten-Köln-F-Im-Park-012.JPG",
      imageCredit: "Wikimedia Commons",
      tags: ["Entspannt", "Kostenlos", "Biergarten", "Jazz"]
    },
    {
      id: "hiroshima-nagasaki-park",
      name: "Hiroshima-Nagasaki-Park",
      category: "entspannt",
      subCategory: "Park",
      district: "Neustadt-Nord",
      address: "Universitätsstraße, 50931 Köln",
      coordinates: { lat: 50.9330, lng: 6.9280 },
      description:
        "Ruhiger, japanisch inspirierter Parkabschnitt im Grüngürtel neben dem Aachener Weiher – mit stiller Atmosphäre und schönem Baumbestand.",
      whyVisit:
        "Ein Ort zum Durchatmen: deutlich ruhiger als der belebte Aachener Weiher nebenan. Ideal zum Lesen, Nachdenken oder für einen kurzen Spaziergang.",
      tips: [
        "Für Ruhe hierher statt an den vollen Weiher.",
        "Gut mit einer Grüngürtel-Runde verbinden.",
        "Im Herbst besonders stimmungsvoll."
      ],
      bestTime: "Vormittag oder später Nachmittag",
      duration: "30–60 Minuten",
      price: "Kostenlos",
      goodFor: ["Lesen", "Spaziergang", "Date"],
      image: "Koeln-Muengersdorf-Adenauer-Weiher-059.JPG",
      imageCredit: "Wikimedia Commons",
      tags: ["Entspannt", "Kostenlos", "Ruhig", "Lesen"]
    },
    {
      id: "poller-wiesen",
      name: "Poller Wiesen",
      category: "entspannt",
      subCategory: "Wiese am Rhein",
      district: "Poll",
      address: "Poller Wiesen, 51105 Köln",
      coordinates: { lat: 50.9150, lng: 6.9880 },
      description:
        "Weite Rheinwiesen am rechten Ufer, gegenüber vom Rheinauhafen. Viel Platz zum Grillen, Picknicken, Drachensteigen oder einfach Faulenzen.",
      whyVisit:
        "Hier hat man Platz ohne Ende und einen tollen Blick auf die Kranhäuser und die Skyline. Beliebt für Picknicks, Sport und entspannte Sommertage.",
      tips: [
        "Grillen ist auf ausgewiesenen Flächen möglich – Regeln beachten.",
        "Schöner Skyline-Blick Richtung Rheinauhafen.",
        "Viel Platz auch an vollen Tagen."
      ],
      bestTime: "Sommernachmittag",
      duration: "1–3 Stunden",
      price: "Kostenlos",
      goodFor: ["Freunde", "Familien", "Picknick", "Sonnenuntergang"],
      image: "Köln Rhein (51733383229).jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Entspannt", "Kostenlos", "Picknick", "Grillen", "Aussicht"]
    },
    {
      id: "decksteiner-weiher",
      name: "Decksteiner Weiher",
      category: "entspannt",
      subCategory: "See",
      district: "Lindenthal",
      address: "Gleueler Straße, 50935 Köln",
      coordinates: { lat: 50.9230, lng: 6.9060 },
      description:
        "Langgestreckter Weiher im äußeren Grüngürtel, umgeben von Wiesen und Wegen. Man kann ihn zu Fuß umrunden oder ein Tretboot mieten.",
      whyVisit:
        "Ein ruhiger, grüner Rückzugsort im Westen der Stadt – ideal für einen langen Spaziergang, eine Jogging-Runde oder eine Tretbootfahrt. Am Ufer lädt das Haus am See zur Pause.",
      tips: [
        "Rundweg zu Fuß oder per Rad in ca. 45 Min.",
        "Tretboote in der Saison ausleihbar.",
        "Einkehr im Haus am See möglich."
      ],
      bestTime: "Vormittag oder Nachmittag",
      duration: "1–2 Stunden",
      price: "Kostenlos (Tretboot optional)",
      goodFor: ["Spaziergang", "Familien", "Paare"],
      image: "Koeln-Muengersdorf-Adenauer-Weiher-059.JPG",
      imageCredit: "Wikimedia Commons",
      tags: ["Entspannt", "Kostenlos", "See", "Spaziergang", "Familie"]
    },

    /* =============================== PARKS =============================== */
    {
      id: "rheinpark",
      name: "Rheinpark",
      category: "park",
      subCategory: "Großer Park",
      district: "Deutz",
      address: "Auenweg, 50679 Köln",
      coordinates: { lat: 50.9490, lng: 6.9760 },
      description:
        "Der vielleicht schönste Park Kölns liegt direkt am rechten Rheinufer, gegenüber der Altstadt. Weite Rasenflächen, Springbrunnen, die Tanzbrunnen-Anlage und die Seilbahn-Station machen ihn zum Ausflugsklassiker.",
      whyVisit:
        "Perfekt zum Spazieren, Sonnen und Picknicken – mit Skyline-Blick auf Dom und Altstadt. Von hier startet die Seilbahn, nebenan liegt die Claudius Therme.",
      tips: [
        "Mit der Seilbahn ankommen und den Blick genießen.",
        "Die Wiesen am Wasser sind top zum Picknicken.",
        "Mit Claudius Therme und Rheinboulevard kombinierbar."
      ],
      bestTime: "Nachmittag bei gutem Wetter",
      duration: "1–2 Stunden",
      price: "Kostenlos",
      meta: { picnic: true, walk: true, sport: true, water: true },
      goodFor: ["Familien", "Paare", "Freunde", "Picknick"],
      image: "Cologne rheinpark 20060521.jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Park", "Kostenlos", "Picknick", "Familie", "Aussicht"]
    },
    {
      id: "stadtgarten",
      name: "Stadtgarten",
      category: "park",
      subCategory: "Stadtpark",
      district: "Neustadt-Nord",
      address: "Venloer Straße 40, 50672 Köln",
      coordinates: { lat: 50.9432, lng: 6.9372 },
      description:
        "Kölns ältester kommunaler Park (seit 1828) mit altem Baumbestand, Biergarten und dem Kulturhaus Stadtgarten – bekannt für seine Jazz-Konzerte.",
      whyVisit:
        "Grüne Oase mitten in der Neustadt, ideal für eine Pause mit Kultur- und Biergartenoption direkt vor Ort.",
      tips: [
        "Sommerabende im Biergarten sind ein Erlebnis.",
        "Konzertprogramm lohnt einen Blick.",
        "Zentral zwischen Belgischem Viertel und Ehrenfeld."
      ],
      bestTime: "Nachmittag & Abend",
      duration: "1 Stunde",
      price: "Kostenlos",
      meta: { picnic: true, walk: true, sport: false, water: false },
      goodFor: ["Freunde", "Paare", "Spaziergang"],
      image: "Stadtgarten-Köln-F-Im-Park-012.JPG",
      imageCredit: "Wikimedia Commons",
      tags: ["Park", "Kostenlos", "Biergarten", "Kultur"]
    },
    {
      id: "volksgarten",
      name: "Volksgarten",
      category: "park",
      subCategory: "Stadtpark",
      district: "Neustadt-Süd",
      address: "Volksgartenstraße, 50677 Köln",
      coordinates: { lat: 50.9200, lng: 6.9430 },
      description:
        "Beliebter Park in der Südstadt mit großem Weiher, Fontäne, altem Baumbestand und dem stimmungsvollen Biergarten am See.",
      whyVisit:
        "Einer der schönsten und lebendigsten Parks der Stadt – zum Sonnen, Bootfahren auf dem Weiher und für laue Biergarten-Abende. Sehr beliebt bei jungen Kölnern.",
      tips: [
        "Ruderboote am Weiher in der Saison ausleihbar.",
        "Der Biergarten am See ist ein Sommer-Muss.",
        "Am Wochenende früh einen Wiesenplatz sichern."
      ],
      bestTime: "Nachmittag bis Abend",
      duration: "1–2 Stunden",
      price: "Kostenlos",
      meta: { picnic: true, walk: true, sport: true, water: true },
      goodFor: ["Freunde", "Paare", "Familien", "Picknick"],
      image: "Volksgarten (1).JPG",
      imageCredit: "Wikimedia Commons",
      tags: ["Park", "Kostenlos", "Picknick", "See", "Jung"]
    },
    {
      id: "gruenguertel",
      name: "Innerer & Äußerer Grüngürtel",
      category: "park",
      subCategory: "Grünanlage",
      district: "mehrere Veedel",
      address: "Innerer Grüngürtel, 50931 Köln",
      coordinates: { lat: 50.9340, lng: 6.9240 },
      description:
        "Zwei ringförmige Grünzüge umschließen die Stadt auf der Trasse der alten Festungsanlagen. Kilometerlange Wiesen, Wege und Weiher machen den Grüngürtel zur grünen Lunge Kölns.",
      whyVisit:
        "Ideal zum Joggen, Radeln und Spazieren – man kann stundenlang im Grünen unterwegs sein, ohne die Stadt zu verlassen. Verbindet viele der schönsten Parks.",
      tips: [
        "Perfekt für lange Lauf- oder Radrunden.",
        "Der Innere Grüngürtel um den Aachener Weiher ist am belebtesten.",
        "Der Äußere Grüngürtel ist ruhiger und weitläufiger."
      ],
      bestTime: "Vormittag oder Nachmittag",
      duration: "1–3 Stunden",
      price: "Kostenlos",
      meta: { picnic: true, walk: true, sport: true, water: true },
      goodFor: ["Sport", "Spaziergang", "Familien"],
      image: "Koeln-Muengersdorf-Adenauer-Weiher-059.JPG",
      imageCredit: "Wikimedia Commons",
      tags: ["Park", "Kostenlos", "Sport", "Spaziergang"]
    },
    {
      id: "friedenspark",
      name: "Friedenspark",
      category: "park",
      subCategory: "Stadtpark",
      district: "Bayenthal / Altstadt-Süd",
      address: "Alteburger Straße, 50678 Köln",
      coordinates: { lat: 50.9210, lng: 6.9770 },
      description:
        "Grüner Park am linken Rheinufer rund um das historische Fort I. Wiesen, alte Bäume und Rheinnähe machen ihn zu einem ruhigen Rückzugsort im Süden.",
      whyVisit:
        "Weniger überlaufen als die großen Parks, dafür direkt am Rhein. Schön für einen ruhigen Spaziergang oder ein Picknick mit Wasserblick.",
      tips: [
        "Mit einem Rheinspaziergang Richtung Rheinauhafen verbinden.",
        "Der Rosengarten ist ein hübsches Detail.",
        "Ruhiger als Rhein- oder Volksgarten."
      ],
      bestTime: "Nachmittag",
      duration: "45–90 Minuten",
      price: "Kostenlos",
      meta: { picnic: true, walk: true, sport: false, water: true },
      goodFor: ["Paare", "Spaziergang", "Picknick"],
      image: "Rheinpark-Köln-e-Igelbrunnen-099.JPG",
      imageCredit: "Wikimedia Commons",
      tags: ["Park", "Kostenlos", "Ruhig", "Rhein"]
    },
    {
      id: "blucherpark",
      name: "Blücherpark",
      category: "park",
      subCategory: "Stadtpark",
      district: "Bilderstöckchen",
      address: "Blücherpark, 50733 Köln",
      coordinates: { lat: 50.9640, lng: 6.9280 },
      description:
        "Denkmalgeschützter Park im Kölner Norden mit weitläufigem Weiher, Bootsverleih und einem Café am Wasser – im Stil eines englischen Landschaftsgartens.",
      whyVisit:
        "Ein ruhiger, unterschätzter Park abseits der Touristenpfade. Schön zum Spazieren, Bootfahren und für einen entspannten Kaffee am See.",
      tips: [
        "Tretboote in der Saison ausleihbar.",
        "Deutlich ruhiger als die Innenstadtparks.",
        "Café am Weiher für eine Pause."
      ],
      bestTime: "Vormittag oder Nachmittag",
      duration: "1–1,5 Stunden",
      price: "Kostenlos",
      meta: { picnic: true, walk: true, sport: false, water: true },
      goodFor: ["Familien", "Paare", "Spaziergang"],
      image: "Volksgarten (1).JPG",
      imageCredit: "Wikimedia Commons",
      tags: ["Park", "Kostenlos", "See", "Ruhig", "Familie"]
    },
    {
      id: "vorgebirgspark",
      name: "Vorgebirgspark",
      category: "park",
      subCategory: "Stadtpark",
      district: "Zollstock / Raderthal",
      address: "Vorgebirgstraße, 50968 Köln",
      coordinates: { lat: 50.9080, lng: 6.9330 },
      description:
        "Denkmalgeschützter Park im Süden mit weiten Rasenflächen, altem Baumbestand und einem hübschen Skulpturengarten – ruhig und großzügig angelegt.",
      whyVisit:
        "Ein echter Geheimtipp für Ruhesuchende: viel Platz, kaum Trubel und eine schöne Gartenarchitektur. Ideal zum Lesen und Picknicken.",
      tips: [
        "Der Rosen- und Skulpturengarten lohnt einen Blick.",
        "Sehr ruhig – gut zum Lesen.",
        "Ideal für ein entspanntes Picknick."
      ],
      bestTime: "Nachmittag",
      duration: "45–90 Minuten",
      price: "Kostenlos",
      meta: { picnic: true, walk: true, sport: false, water: false },
      goodFor: ["Lesen", "Picknick", "Spaziergang"],
      image: "Stadtgarten-Köln-F-Im-Park-012.JPG",
      imageCredit: "Wikimedia Commons",
      tags: ["Park", "Kostenlos", "Ruhig", "Picknick", "Lesen"]
    },
    {
      id: "beethovenpark",
      name: "Beethovenpark",
      category: "park",
      subCategory: "Stadtpark",
      district: "Sülz",
      address: "Beethovenpark, 50937 Köln",
      coordinates: { lat: 50.9060, lng: 6.9130 },
      description:
        "Großer, familienfreundlicher Park in Sülz mit Wiesen, Teich, Spielplätzen und einem beliebten Biergarten mitten im Grünen.",
      whyVisit:
        "Ein entspannter Nachbarschaftspark mit viel Platz für Familien und Sportler. Der Biergarten „Gaststätte im Beethovenpark“ ist ein netter Treffpunkt.",
      tips: [
        "Spielplätze machen ihn familienfreundlich.",
        "Biergarten im Sommer ansteuern.",
        "Gut für eine Laufrunde im Grünen."
      ],
      bestTime: "Nachmittag",
      duration: "1 Stunde",
      price: "Kostenlos",
      meta: { picnic: true, walk: true, sport: true, water: true },
      goodFor: ["Familien", "Sport", "Spaziergang"],
      image: "Stadtgarten-Köln-F-Im-Park-012.JPG",
      imageCredit: "Wikimedia Commons",
      tags: ["Park", "Kostenlos", "Familie", "Sport", "Biergarten"]
    },
    {
      id: "flora-park",
      name: "Flora & Botanischer Garten",
      category: "park",
      subCategory: "Botanischer Garten",
      district: "Riehl",
      address: "Alter Stammheimer Weg 2, 50735 Köln",
      coordinates: { lat: 50.9593, lng: 6.9742 },
      description:
        "Kölns botanischer Garten mit prächtigen Beeten, Gewächshäusern, dem historischen Festhaus und kostenlosem Eintritt – ein Park und Garten zugleich.",
      whyVisit:
        "Kostenlos, wunderschön angelegt und im Frühling ein Blütentraum. Perfekt für einen ruhigen, hübschen Spaziergang – auch in Kombination mit dem Zoo.",
      tips: [
        "Kirschblüte im Frühling ist ein Highlight.",
        "Die Gewächshäuser lohnen auch bei kühlerem Wetter.",
        "Kein Grillen/Picknick auf den Beeten – Rücksicht nehmen."
      ],
      bestTime: "Frühling & Sommer",
      duration: "1–1,5 Stunden",
      price: "Kostenlos",
      meta: { picnic: false, walk: true, sport: false, water: false },
      goodFor: ["Paare", "Familien", "Spaziergang"],
      image: "Flora-Köln-Kakteenhaus.JPG",
      imageCredit: "Wikimedia Commons",
      tags: ["Park", "Garten", "Kostenlos", "Foto-Spot", "Frühling"]
    },
    {
      id: "aachener-weiher-park",
      name: "Aachener Weiher & Grüngürtel",
      category: "park",
      subCategory: "Park am Wasser",
      district: "Lindenthal / Neustadt",
      address: "Aachener Weiher, 50931 Köln",
      coordinates: { lat: 50.9347, lng: 6.9272 },
      description:
        "Der Aachener Weiher im Inneren Grüngürtel ist einer der belebtesten Treffpunkte im Grünen – mit Wiesen, Wasser, Kiosk und viel Platz zum Chillen.",
      whyVisit:
        "Zentral, kostenlos und immer lebendig: der Klassiker zum Sonnen und Feierabendbier am Wasser. Im Sommer legen hier oft DJs auf.",
      tips: [
        "Sonnenuntergang über dem Wasser genießen.",
        "Kiosk vor Ort für Getränke.",
        "Am Wochenende früh kommen."
      ],
      bestTime: "Nachmittag bis Sonnenuntergang",
      duration: "1–3 Stunden",
      price: "Kostenlos",
      meta: { picnic: true, walk: true, sport: true, water: true },
      goodFor: ["Freunde", "Picknick", "Sonnenuntergang"],
      image: "Koeln-Muengersdorf-Adenauer-Weiher-059.JPG",
      imageCredit: "Wikimedia Commons",
      tags: ["Park", "Kostenlos", "Picknick", "Sonnenuntergang", "Jung"]
    },
    {
      id: "poller-wiesen-park",
      name: "Poller Wiesen",
      category: "park",
      subCategory: "Rheinwiese",
      district: "Poll",
      address: "Poller Wiesen, 51105 Köln",
      coordinates: { lat: 50.9152, lng: 6.9882 },
      description:
        "Weite Wiesenflächen am rechten Rheinufer, gegenüber dem Rheinauhafen – ideal zum Grillen, Sporttreiben und für den Skyline-Blick.",
      whyVisit:
        "Viel Platz, Rheinnähe und ein toller Blick auf die Kranhäuser. Beliebt bei Gruppen, Grillfreunden und Sportlern.",
      tips: [
        "Grillen nur auf ausgewiesenen Flächen.",
        "Schöner Blick Richtung Rheinauhafen.",
        "Mit dem Rad am Ufer gut erreichbar."
      ],
      bestTime: "Sommernachmittag",
      duration: "1–3 Stunden",
      price: "Kostenlos",
      meta: { picnic: true, walk: true, sport: true, water: true },
      goodFor: ["Freunde", "Familien", "Sport", "Picknick"],
      image: "Köln Rhein (51733383229).jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Park", "Kostenlos", "Grillen", "Sport", "Aussicht"]
    },
    {
      id: "decksteiner-weiher-park",
      name: "Decksteiner Weiher",
      category: "park",
      subCategory: "Park am Wasser",
      district: "Lindenthal",
      address: "Gleueler Straße, 50935 Köln",
      coordinates: { lat: 50.9232, lng: 6.9062 },
      description:
        "Langgestreckter Weiher im Äußeren Grüngürtel mit Uferwegen, Tretbooten und dem „Haus am See“ – ruhig und weitläufig.",
      whyVisit:
        "Ein ruhiger Park zum Spazieren, Joggen und Tretbootfahren. Die komplette Umrundung ist eine schöne, entspannte Runde im Grünen.",
      tips: [
        "Rundweg in ca. 45 Minuten zu Fuß.",
        "Tretboote in der Saison ausleihbar.",
        "Einkehr im Haus am See."
      ],
      bestTime: "Vormittag oder Nachmittag",
      duration: "1–2 Stunden",
      price: "Kostenlos",
      meta: { picnic: true, walk: true, sport: true, water: true },
      goodFor: ["Spaziergang", "Sport", "Familien"],
      image: "Koeln-Muengersdorf-Adenauer-Weiher-059.JPG",
      imageCredit: "Wikimedia Commons",
      tags: ["Park", "Kostenlos", "See", "Sport", "Spaziergang"]
    }
  ];

  /* ================================ TOUREN ================================ */
  const tours = [
    {
      id: "koeln-klassiker",
      title: "Köln Klassiker an einem Tag",
      subtitle: "Alle Highlights kompakt – perfekt für den ersten Besuch.",
      duration: "ca. 8 Stunden",
      start: "Kölner Dom",
      end: "KölnTriangle / Rheinboulevard",
      forWhom: "Erstbesucher, Familien, Paare",
      cost: "€€ · Museen & Turm zusammen ca. 25–35 €",
      image: "Der Kölner Dom von Süden - panoramio.jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Sightseeing", "Klassiker", "Ganztags"],
      stops: [
        { time: "09:30", placeId: "koelner-dom", note: "Start am Dom, optional Turmaufstieg." },
        { time: "11:00", placeId: "hohenzollernbruecke", note: "Über die Brücke mit den Liebesschlössern." },
        { time: "11:45", placeId: "altstadt", note: "Durch die Altstadt und über den Fischmarkt." },
        { time: "13:00", placeId: "frueh-am-dom", note: "Mittagspause mit Kölsch und Halver Hahn." },
        { time: "14:30", placeId: "schokoladenmuseum", note: "Schokolade & Rheinauhafen." },
        { time: "16:00", placeId: "rheinauhafen-kranhaeuser", note: "Kranhäuser und Promenade." },
        { time: "18:30", placeId: "rheinboulevard", note: "Sonnenuntergang am Rhein zum Abschluss." }
      ]
    },
    {
      id: "food-koelsch",
      title: "Food & Kölsch Tour",
      subtitle: "Einmal quer durch Kölns Gastro-Highlights.",
      duration: "ca. 10 Stunden (Vormittag bis Nacht)",
      start: "Belgisches Viertel",
      end: "Altstadt / Bar-Viertel",
      forWhom: "Genießer, Freunde, Paare",
      cost: "€€–€€€ · abhängig von Essen & Getränken",
      image: "Bierkranz Zunft-Kölsch.jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Food", "Kölsch", "Genuss"],
      stops: [
        { time: "10:00", placeId: "bastians-brunch", note: "Ausgiebiges Frühstück im Belgischen Viertel." },
        { time: "12:00", placeId: "belgisches-viertel", note: "Bummel und Kaffee im Viertel." },
        { time: "14:00", placeId: "altstadt", note: "Spaziergang in die Altstadt." },
        { time: "15:00", placeId: "paeffgen", note: "Kölsch im traditionellen Brauhaus." },
        { time: "17:00", placeId: "eisdielerin", note: "Süße Pause mit hausgemachtem Eis." },
        { time: "19:00", placeId: "lommerzheim", note: "Abendessen im Kult-Brauhaus (Kotelett!)." },
        { time: "21:00", placeId: "bruesseler-platz", note: "Ausklang mit Drinks am Brüsseler Platz." }
      ]
    },
    {
      id: "entspanntes-koeln",
      title: "Entspanntes Köln",
      subtitle: "Grün, Wasser und Sonnenuntergang – ganz ohne Stress.",
      duration: "ca. 7 Stunden",
      start: "Flora & Botanischer Garten",
      end: "Rheinboulevard",
      forWhom: "Paare, Ruhesuchende, Naturfans",
      cost: "€ · nur Seilbahn kostet Eintritt",
      image: "Flora-Köln-Kakteenhaus.JPG",
      imageCredit: "Wikimedia Commons",
      tags: ["Entspannt", "Natur", "Slow"],
      stops: [
        { time: "11:00", placeId: "flora", note: "Start in der Flora, durch Beete und Gewächshäuser." },
        { time: "12:30", placeId: "seilbahn", note: "Mit der Seilbahn über den Rhein schweben." },
        { time: "13:00", placeId: "rheinpark", note: "Picknick und Bummel im Rheinpark." },
        { time: "15:30", placeId: "claudius-therme", note: "Optional entspannen in der Therme." },
        { time: "18:30", placeId: "rheinboulevard", note: "Sonnenuntergang am Rheinboulevard." }
      ]
    },
    {
      id: "junges-koeln",
      title: "Junges Köln / Mit Freunden",
      subtitle: "Street Art, Szeneviertel und laue Abende.",
      duration: "ca. 8 Stunden",
      start: "Ehrenfeld",
      end: "Belgisches Viertel / Bars",
      forWhom: "Freunde, junge Reisende, Kreative",
      cost: "€–€€ · Street Art & Plätze kostenlos",
      image: "Streetart Kln Ehrenfeld O (258331075).jpeg",
      imageCredit: "Wikimedia Commons",
      tags: ["Jung", "Street Art", "Szene"],
      stops: [
        { time: "12:00", placeId: "ehrenfeld-streetart", note: "Street-Art-Runde durch Ehrenfeld." },
        { time: "13:30", placeId: "bunte-burger", note: "Lunch bei Bunte Burger." },
        { time: "15:00", placeId: "belgisches-viertel", note: "Shopping & Cafés im Belgischen Viertel." },
        { time: "17:00", placeId: "aachener-weiher", note: "Chillen am Aachener Weiher." },
        { time: "19:00", placeId: "bruesseler-platz", note: "Sonnenuntergang & Drinks am Brüsseler Platz." }
      ]
    },
    {
      id: "regenwetter",
      title: "Regenwetter-Tour",
      subtitle: "Trocken durch Köln – Kultur, Schokolade und Shopping.",
      duration: "ca. 7 Stunden",
      start: "Museum Ludwig",
      end: "Claudius Therme",
      forWhom: "Alle, die dem Regen entkommen wollen",
      cost: "€€–€€€ · Museen, Shopping & Therme",
      image: "Museum Ludwig 002.jpg",
      imageCredit: "Wikimedia Commons",
      tags: ["Regen", "Indoor", "Kultur"],
      stops: [
        { time: "10:00", placeId: "museum-ludwig", note: "Moderne Kunst am Dom." },
        { time: "12:30", placeId: "schokoladenmuseum", note: "Schokolade satt am Rheinauhafen." },
        { time: "14:30", placeId: "cafe-reichard", note: "Kaffee & Kuchen mit Domblick." },
        { time: "15:30", placeId: "shopping-schildergasse", note: "Trockenes Shopping in der Innenstadt." },
        { time: "18:00", placeId: "claudius-therme", note: "Ausklang in der warmen Therme." }
      ]
    }
  ];

  /* ================================= FAQ ================================= */
  const faqs = [
    {
      q: "Wie viele Tage braucht man für Köln?",
      a: "Für die Highlights reichen 1–2 Tage: Dom, Altstadt, Rheinpromenade und Rheinauhafen schafft man an einem vollen Tag. Wer auch Veedel wie Ehrenfeld oder das Belgische Viertel, Museen und die Parks erleben will, plant besser 2–3 Tage ein."
    },
    {
      q: "Was muss man in Köln gesehen haben?",
      a: "Absolute Pflicht: der Kölner Dom, die Hohenzollernbrücke, die Altstadt mit Fischmarkt, der Rheinauhafen mit den Kranhäusern und der Rheinboulevard bei Sonnenuntergang. Dazu ein Kölsch im Brauhaus – das gehört einfach dazu."
    },
    {
      q: "Was kann man in Köln kostenlos machen?",
      a: "Sehr viel: Dom besichtigen, an der Rheinpromenade spazieren, über die Hohenzollernbrücke laufen, die Flora und alle Parks besuchen, durch Ehrenfeld und das Belgische Viertel bummeln und den Sonnenuntergang am Rheinboulevard oder Aachener Weiher genießen."
    },
    {
      q: "Was kann man in Köln bei Regen machen?",
      a: "Köln hat viele Indoor-Optionen: das Schokoladenmuseum, das Museum Ludwig und weitere Museen, Shopping auf Schildergasse und Hohe Straße, gemütliche Cafés, Brauhäuser und die Claudius Therme. Unsere Regenwetter-Tour verbindet die besten davon."
    },
    {
      q: "Welche Stadtteile (Veedel) sind schön?",
      a: "Die Altstadt fürs Historische, das Belgische Viertel für Szene und Cafés, Ehrenfeld für Street Art und Nachtleben, die Südstadt für rheinisches Flair und das Agnesviertel/Eigelstein für authentisches Köln abseits der Touristenpfade."
    },
    {
      q: "Wo kann man in Köln gut essen?",
      a: "Traditionell im Brauhaus (Früh, Päffgen, Lommerzheim), modern und vielfältig im Belgischen Viertel und in Ehrenfeld (Streetfood, vegan, Burger, Hummus). Süßes gibt es in den Eisdielen der Veedel. Alle unsere Empfehlungen findest du auf der Foodspots-Seite."
    },
    {
      q: "Wo sieht man in Köln den schönsten Sonnenuntergang?",
      a: "Der Rheinboulevard in Deutz ist der Klassiker – mit Blick auf die beleuchtete Altstadt. Ebenfalls toll: die Hohenzollernbrücke, der Aachener Weiher, die Poller Wiesen und die Aussichtsplattform des KölnTriangle."
    },
    {
      q: "Wie bewegt man sich in Köln am besten fort?",
      a: "Die Innenstadt ist gut zu Fuß machbar. Für längere Strecken sind Bus und Bahn (KVB) ideal, für den Rhein entlang ein Leihrad (KVB-Rad). Autofahren und Parken in der Innenstadt lohnen sich kaum."
    },
    {
      q: "Lohnt sich die KölnCard?",
      a: "Wenn du öffentliche Verkehrsmittel nutzt und mehrere Museen besuchst, kann sich die KölnCard rechnen: freie Fahrt im VRS-Stadtgebiet plus Rabatte auf viele Attraktionen. Für einen reinen Bummeltag ohne Museen lohnt sie sich weniger. Preise und Leistungen bitte aktuell prüfen."
    },
    {
      q: "Welche Orte in Köln sind am besten für Fotos?",
      a: "Der Dom von der Domplatte und vom Deutzer Ufer, die bunten Häuser am Fischmarkt, die Hohenzollernbrücke, die Kranhäuser im Rheinauhafen, der Blick vom KölnTriangle und die Murals in Ehrenfeld liefern die stärksten Motive."
    }
  ];

  return { CAT, places, tours, faqs };
})();
