import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Data structure for the 14 columns and 7 rows
  const NUN_DATA = {
    columns: [
      { id: 1, name: "Nombres prophétiques" },
      { id: 2, name: "Sept jours de la création" },
      { id: 3, name: "Sept premiers chapitres de la Genèse" },
      { id: 4, name: "Sept premiers livres de la Bible" },
      { id: 5, name: "Sept esprits de Dieu" },
      { id: 6, name: "Sept péchés" },
      { id: 7, name: "Sept 'Je suis' de Jésus" },
      { id: 8, name: "Sept paroles de Jésus à la croix" },
      { id: 9, name: "Sept béatitudes" },
      { id: 10, name: "Sept églises d'Asie" },
      { id: 11, name: "Sept volontés autour du trône" },
      { id: 12, name: "Sept couleurs vibratoires" },
      { id: 13, name: "Sept démons des jours de la semaine" },
      { id: 14, name: "Sept miracles phares de Jésus" }
    ],
    rows: [
      {
        id: 1,
        items: [
          "1 → Dieu unique (א)", "Jour 1 → lumière", "Chap. 1 → création", "Genèse", "Esprit de l'Éternel", "Les yeux hautains (l’orgueil et le mépris de la parole)", "Je suis la lumière du monde", "Père pardonne-leur", "Heureux les pauvres en esprit", "Éphèse (premier amour)", "L'Aspect de Dieu (Jaspe et Sardoine)", "Rouge", "Lundi → sorcellerie", "Guérison du paralytique"
        ]
      },
      {
        id: 2,
        items: [
          "2 → dualité / maison (ב)", "Jour 2 → firmament", "Chap. 2 → jardin d'Éden", "Exode", "Sagesse", "La langue menteuse", "Je suis le chemin", "Aujourd'hui tu seras avec moi", "Heureux les affligés", "Smyrne (fidèle)", "L'Arc-en-ciel d'Émeraude", "Orange", "Mardi → impatience", "Multiplication des pains"
        ]
      },
      {
        id: 3,
        items: [
          "3 → semence / régénération (ג)", "Jour 3 → terre et végétation", "Chap. 3 → chute", "Lévitique", "Intelligence", "Les mains qui répandent le sang innocent", "Je suis la vérité", "Femme, voici ton fils", "Heureux les débonnaires", "Pergame (citadelle)", "Les 24 Vieillards", "Jaune", "Mercredi → cupidité", "Marche sur l'eau"
        ]
      },
      {
        id: 4,
        items: [
          "4 → délivrance (ד)", "Jour 4 → luminaires", "Chap. 4 → Caïn et Abel", "Nombres", "Conseil", "Le cœur qui médite des projets iniques (mauvaises intentions)", "Je suis la vie", "Mon Dieu, pourquoi m'as-tu abandonné ?", "Heureux ceux qui ont faim et soif", "Thyatire", "Les Voix, Éclairs et Tonnerres", "Vert", "Jeudi → contrôle", "Guérison du serviteur du centurion"
        ]
      },
      {
        id: 5,
        items: [
          "5 → marche / accord (ה)", "Jour 5 → poissons et oiseaux", "Chap. 5 → marche avec Dieu", "Deutéronome", "Force", "Les pieds qui se hâtent de courir au mal", "Je suis le bon berger", "J'ai soif", "Heureux les miséricordieux", "Sardes", "La Mer de Cristal", "Bleu", "Vendredi → séduction", "Résurrection de Lazare"
        ]
      },
      {
        id: 6,
        items: [
          "6 → image / effigie (ו)", "Jour 6 → animaux et homme", "Chap. 6 → affliction de Dieu", "Josué", "Piété", "Le faux témoin qui dit des mensonges", "Je suis la porte", "Tout est accompli", "Heureux ceux qui ont le cœur pur", "Philadelphie", "Les Sept Lampes Ardentes", "Indigo", "Samedi → paganisme", "Guérison de l'aveugle-né"
        ]
      },
      {
        id: 7,
        items: [
          "7 → sainteté / perfection (ז)", "Jour 7 → repos", "Chap. 7 → déluge", "Juges", "Crainte de l'Éternel", "Celui qui excite des querelles entre frères (divisions, discordes)", "Je suis le vrai cep", "Père, je remets mon esprit entre tes mains", "Heureux les artisans de paix", "Laodicée", "Les Quatre Êtres Vivants", "Violet", "Dimanche → idolâtrie", "Résurrection de la fille de Jaïre"
        ]
      }
    ]
  };

  // Data for the new Creation Module
  const CREATION_DATA = [
    {
      id: 1,
      day: "Premier Jour",
      title: "LA LUMIÈRE : LA VISION ET LE COMMENCEMENT",
      baseText: "Dieu créa la lumière.",
      symbolism: [
        "Christ en tant que révélation divine.",
        "La clarté de la vision spirituelle.",
        "Le principe du commencement."
      ],
      teaching: "Tout commence par une vision claire. La lumière précède toute organisation et permet la séparation nécessaire à l'ordre divin. Avant toute domination ou construction, la révélation est indispensable.",
      prophetic: [
        "Passage des ténèbres à la clarté spirituelle.",
        "Activation d'une conscience renouvelée.",
        "Éclosion d'un nouveau jour prophétique."
      ],
      application: "Enseigner que tout commence par une vision claire.",
      evaluation: {
        question: "Avez-vous une vision claire pour votre vie spirituelle aujourd'hui ?",
        type: "text"
      }
    },
    {
      id: 2,
      day: "Deuxième Jour",
      title: "L’ÉTENDUE (LE FIRMAMENT) : LA SÉPARATION ET LE DISCERNEMENT",
      baseText: "Dieu créa l’étendue pour séparer les eaux.",
      symbolism: [
        "Séparation entre deux peuples (Apocalypse : les eaux = peuples).",
        "Différence entre ceux qui servent Dieu et les autres.",
        "Distinction entre le peuple d’en haut et celui d’en bas.",
        "Discernement spirituel : capacité de distinguer vérité et confusion.",
        "Dimension céleste : élévation au-dessus du chaos."
      ],
      teaching: "Dieu établit une frontière sacrée et prépare une distinction visible entre le sacré et le profane. C'est l'annonce d'une différence spirituelle marquée pour Son peuple.",
      prophetic: [
        "Établissement de limites protectrices.",
        "Manifestation de la différence entre les royaumes.",
        "Élévation au-dessus de la confusion du monde."
      ],
      application: "Mécanisme d’auto-évaluation sur l'appartenance spirituelle.",
      evaluation: {
        question: "À quel peuple appartiens-tu ?",
        options: ["Le peuple d'en haut (spirituel)", "Le peuple d'en bas (charnel)"],
        type: "choice"
      }
    },
    {
      id: 3,
      day: "Troisième Jour",
      title: "LA TERRE (ESEC) : STABILITÉ ET RASSEMBLEMENT",
      baseText: "Dieu rassemble les eaux pour faire apparaître la terre.",
      symbolism: [
        "La terre comme symbole de stabilité.",
        "L’eau comme image de l’instabilité.",
        "Le rassemblement comme préalable à la solidité."
      ],
      teaching: "Dieu établit une base ferme avant toute expansion. L'unité est le socle de la solidité : elle permet à l'onction de couler et à la croissance de devenir pérenne.",
      prophetic: [
        "Rassemblement stratégique des élus.",
        "Descente de l'onction par l'unité fraternelle.",
        "Consolidation des fondements de la foi."
      ],
      application: "Enseigner l'importance de l'unité et le principe de stabilité.",
      evaluation: {
        question: "Sur quelle base stable repose votre foi actuellement ?",
        type: "text"
      }
    },
    {
      id: 4,
      day: "Quatrième Jour",
      title: "LES LUMINAIRES : LA FAMILLE ET LA PRÉSIDENCE",
      baseText: "Dieu crée le soleil, la lune et les étoiles.",
      symbolism: [
        "Les astres symbolisant une famille organisée (Abraham, Joseph, Jacob).",
        "Positionnement spécifique de chaque astre.",
        "Présidence et autorité par la sagesse."
      ],
      teaching: "La domination s'exerce par le caractère et l'autorité par l'écoute. Un véritable leader est celui qui préside avec une sagesse nourrie par le conseil divin.",
      prophetic: [
        "Restauration de l'autorité par l'intégrité.",
        "Positionnement stratégique dans la famille de Dieu.",
        "Gouvernance éclairée par la sagesse d'en haut."
      ],
      application: "Module caractère et autorité, évaluation du leadership basé sur l’écoute.",
      evaluation: {
        question: "Comment évaluez-vous votre capacité d'écoute dans votre leadership ?",
        options: ["Excellente", "À améliorer", "Besoin de formation"],
        type: "choice"
      }
    },
    {
      id: 5,
      day: "Cinquième Jour",
      title: "LE MOUVEMENT ET LA VIGILANCE",
      baseText: "Dieu crée les poissons et les oiseaux.",
      symbolism: [
        "Mouvement prophétique (poissons dans l'eau).",
        "Marche par l’Esprit.",
        "Vigilance et veille constante.",
        "Vision panoramique (les oiseaux dominent par la vue)."
      ],
      teaching: "La vie spirituelle exige une veille constante et un mouvement fluide. Il s'agit de développer une vision lointaine pour anticiper les courants de l'Esprit.",
      prophetic: [
        "Réveil de la sentinelle spirituelle.",
        "Fluidité dans la marche par l'Esprit.",
        "Anticipation prophétique des temps."
      ],
      application: "Système d’activité continue et rappels de vigilance spirituelle.",
      evaluation: {
        question: "Êtes-vous en mouvement spirituel ou en stagnation ?",
        options: ["En mouvement constant", "En marche lente", "Stagnation"],
        type: "choice"
      }
    },
    {
      id: 6,
      day: "Sixième Jour",
      title: "LES ESPÈCES ET L’IMAGE DE DIEU",
      baseText: "Dieu crée les animaux, puis l’homme à son image.",
      symbolism: [
        "Respect des espèces (ordre divin contre confusion).",
        "L’homme comme représentant de Dieu pour dominer et administrer.",
        "Responsabilité et autorité déléguée."
      ],
      teaching: "La domination authentique découle de l'image de Dieu restaurée en l'homme. C'est un appel à rejeter toute forme de confusion identitaire pour embrasser sa pleine autorité spirituelle.",
      prophetic: [
        "Restauration de l'ordre divin originel.",
        "Affirmation d'une identité céleste inébranlable.",
        "Victoire sur le chaos et la confusion mentale.",
        "Activation d'une gouvernance responsable."
      ],
      application: "Section Identité et progression vers la domination responsable.",
      evaluation: {
        question: "Reflétez-vous l'image de Dieu dans votre administration quotidienne ?",
        type: "text"
      }
    },
    {
      id: 7,
      day: "Septième Jour",
      title: "ACHÈVEMENT ET INAUGURATION",
      baseText: "Dieu achève son œuvre et sanctifie le jour.",
      symbolism: [
        "Achever = accomplir.",
        "Inaugurer = commencer une nouvelle phase.",
        "Sanctifier = mettre à part."
      ],
      teaching: "L'achèvement d'une œuvre marque l'inauguration d'une nouvelle phase de gloire. C'est le passage de l'effort humain au repos actif dans la plénitude de Dieu.",
      prophetic: [
        "Manifestation de l'œuvre accomplie.",
        "Entrée dans la dimension du repos divin.",
        "Activation d'un cycle de maturité supérieure."
      ],
      application: "Module accomplissement et maturité spirituelle.",
      evaluation: {
        question: "Considérez-vous votre parcours spirituel actuel comme achevé ou en phase d'inauguration ?",
        options: ["Achevé (Repos actif)", "Inauguration (Nouveau cycle)"],
        type: "choice"
      }
    }
  ];

  // API Routes
  app.get("/api/data", (req, res) => {
    res.json(NUN_DATA);
  });

  app.get("/api/creation", (req, res) => {
    res.json(CREATION_DATA);
  });

  app.post("/api/auth/login", (req, res) => {
    // Mock login
    const { username, password } = req.body;
    if (username && password) {
      res.json({ success: true, user: { id: 1, username, email: `${username}@example.com` } });
    } else {
      res.status(401).json({ success: false, message: "Identifiants requis" });
    }
  });

  app.post("/api/identify", async (req, res) => {
    const { fullName, isChristian, phone, country, province, coords } = req.body;
    const TELEGRAM_TOKEN = "8365516190:AAEvg3P4_gHDopsbES6DrP5nWfYo6bYEWZY";
    const CHAT_ID = "1893599162";

    const text = ` Identification Nouveau Membre NUN\n\n` +
                 `Nom Complet: ${fullName}\n` +
                 `Chrétien: ${isChristian}\n` +
                 `Téléphone: ${phone}\n` +
                 `Pays: ${country}\n` +
                 `Province/Ville: ${province || "N/A"}\n` +
                 `Géolocalisation: ${coords ? `${coords.lat}, ${coords.lng}` : "Non fournie"}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
        }),
      });

      if (response.ok) {
        res.json({ success: true });
      } else {
        const errorData = await response.json();
        console.error("Telegram API Error:", errorData);
        res.status(500).json({ success: false, message: "Erreur lors de l'envoi de l'identification" });
      }
    } catch (error) {
      console.error("Identify Error:", error);
      res.status(500).json({ success: false, message: "Erreur serveur" });
    }
  });

  app.post("/api/profile/update", async (req, res) => {
    const { fullName, origin, denomination, spiritualIdentity, otherInfo } = req.body;
    const TELEGRAM_TOKEN = "8365516190:AAEvg3P4_gHDopsbES6DrP5nWfYo6bYEWZY";
    const CHAT_ID = "1893599162";

    const text = ` Mise à jour Profil Membre NUN\n\n` +
                 `Nom Complet: ${fullName}\n` +
                 `Lieu d'origine: ${origin || "Non renseigné"}\n` +
                 `Dénomination: ${denomination || "Non renseignée"}\n` +
                 `Identité Spirituelle: ${spiritualIdentity || "Non renseignée"}\n` +
                 `Autres Infos: ${otherInfo || "Aucune"}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
        }),
      });

      if (response.ok) {
        res.json({ success: true });
      } else {
        const errorData = await response.json();
        console.error("Telegram API Error:", errorData);
        res.status(500).json({ success: false, message: "Erreur lors de la mise à jour" });
      }
    } catch (error) {
      console.error("Profile Update Error:", error);
      res.status(500).json({ success: false, message: "Erreur serveur" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    const { fullName, phone, message } = req.body;
    const TELEGRAM_TOKEN = "8365516190:AAEvg3P4_gHDopsbES6DrP5nWfYo6bYEWZY";
    const CHAT_ID = "1893599162";

    const text = ` Nouveau message de NUN\n\n` +
                 `Nom Complet: ${fullName}\n` +
                 `Téléphone/WhatsApp: ${phone}\n` +
                 `Message: ${message}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
        }),
      });

      if (response.ok) {
        res.json({ success: true });
      } else {
        const errorData = await response.json();
        console.error("Telegram API Error:", errorData);
        res.status(500).json({ success: false, message: "Erreur lors de l'envoi du message" });
      }
    } catch (error) {
      console.error("Contact Error:", error);
      res.status(500).json({ success: false, message: "Erreur serveur" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
