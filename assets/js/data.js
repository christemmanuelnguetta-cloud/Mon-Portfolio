/* =========================================================
   data.js : LE CONTENU du portfolio

   Pour ajouter un projet ou changer une compétence, on
   modifie seulement ce fichier : le HTML n'y touche pas.
   ========================================================= */
var PORTFOLIO = {

  /* ---------- Identité ---------- */
  nom: "N'GUETTA Christ Emmanuel",
  titre: "Étudiant en Réseaux et Télécommunications",
  ville: "Grand-Bassam, Côte d'Ivoire",

  /* ---------- Coordonnées ---------- */
  email: "christemmanuelnguetta@gmail.com",
  /* ---------- Clé du formulaire de contact (Web3Forms) ----------
     Vide  : le formulaire passe par FormSubmit, qui demande de cliquer
             une fois sur le lien « Activate Form » reçu par e-mail.
     Remplie : méthode la plus sûre, fonctionne immédiatement.
     Pour l'obtenir : https://web3forms.com -> saisir son adresse Gmail ->
     la clé arrive par e-mail en quelques secondes (gratuit, sans compte). */
  cleFormulaire: "",

  telephone: "01 02 65 57 22",
  telephone2: "07 14 25 47 59",
  github: "christemmanuelnguetta-cloud",
  linkedin: "https://www.linkedin.com/in/christ-emmanuel-nguetta",

  /* ---------- Textes qui s'écrivent tout seuls dans le hero ---------- */
  metiers: [
    "Étudiant en Réseaux et Télécommunications",
    "Développeur Python",
    "Développeur mobile Flutter",
    "Passionné de technologies"
  ],

  /* ---------- Barres de compétences (niveau en %) ----------
     Reprises du profil LinkedIn : certifiées par l'IIT. */
  competences: [
    { nom: "Python",                              niveau: 80 },
    { nom: "Développement web (HTML & CSS)",      niveau: 75 },
    { nom: "Scraping Web",                        niveau: 75 },
    { nom: "Réseaux et Télécommunications",       niveau: 75 },
    { nom: "Bases de données (MySQL, SQL Server)", niveau: 70 },
    { nom: "Flutter / Dart",                      niveau: 65 }
  ],

  /* ---------- Autres compétences, affichées en étiquettes ---------- */
  autresCompetences: [
    "Travail d'équipe",
    "Microsoft Word",
    "PowerPoint",
    "Excel",
    "Git / GitHub",
    "Tailwind CSS",
    "jQuery"
  ],

  /* ---------- Catégories des boutons de filtre ---------- */
  categories: [
    { id: "tous",   nom: "Tous" },
    { id: "mobile", nom: "Mobile" },
    { id: "python", nom: "Python" },
    { id: "web",    nom: "Web" }
  ],

  /* ---------- Projets ---------- */
  projets: [
    {
      titre: "MyAppHealth",
      description: "Application de santé qui permet à un professionnel de santé et à un patient d'interagir à distance, par Internet.",
      categorie: "mobile",
      symbole: "+",
      couleurs: ["#14b8a6", "#0f766e"],
      technologies: ["Flutter", "Dart"],
      lien: "https://github.com/christemmanuelnguetta-cloud/myapphealth"
    },
    {
      titre: "Amazon Scraper",
      description: "Programme qui parcourt Amazon.fr et extrait automatiquement toutes les données liées aux produits technologiques.",
      categorie: "python",
      symbole: "Py",
      couleurs: ["#f59e0b", "#b45309"],
      technologies: ["Python", "HTML", "CSS"],
      lien: "https://github.com/christemmanuelnguetta-cloud/scraping_amazon"
    },
    {
      titre: "Portfolio personnel",
      description: "Ce site : portfolio responsive avec mode sombre, filtres de projets, animations et CV téléchargeable, déployé sur Vercel.",
      categorie: "web",
      symbole: "{ }",
      couleurs: ["#0f766e", "#1e293b"],
      technologies: ["HTML5", "Tailwind", "jQuery"],
      lien: "https://github.com/christemmanuelnguetta-cloud"
    }
  ]
};
