// ===== EN / FR =====
// English text lives in the HTML. Only the French text is listed here.
const FR = {
  nav_about: "À propos", nav_experience: "Expérience", nav_projects: "Projets",
  nav_skills: "Compétences", nav_education: "Formation", nav_contact: "Contact",

  btn_cv: "Télécharger mon CV", btn_work: "Voir mes projets",
  hero_sub: "Étudiante en IA et ingénierie des données",
  hero_lead: "Étudiante ingénieure à l'ENSTAB, je crée des solutions d'IA et de données qui automatisent les workflows et répondent à de vrais besoins métier.",

  h_about: "Un peu à propos de moi",
  about_p: "J'étudie les technologies avancées, avec une orientation en IA et ingénierie des données. J'explore l'intersection entre l'IA et le monde de l'entreprise pour transformer des idées en solutions pratiques. Grâce à mon parcours en systèmes industriels, j'aborde les problèmes en mettant l'accent sur les processus, l'efficacité et la qualité. Mes projets vont des applications propulsées par les LLM à l'automatisation intelligente et aux outils orientés métier. Je m'adapte rapidement, j'apprends continuellement et j'aime relier différents domaines pour résoudre des défis concrets.",
  f_based: "Basée à", f_based_v: "Monastir, Tunisie",
  f_study: "Études", f_study_v: "Cycle ingénieur, ENSTAB (depuis 2024)",
  f_lang: "Langues", f_lang_v: "Arabe (langue maternelle), français (courant), anglais (professionnel)",
  f_comm: "Communauté", f_comm_v: "Clubs universitaires IEEE et ACM, hackathons d'IA",
  pal_title: "La palette de ce portfolio",

  h_experience: "Expérience",
  exp1_date: "Juil. – août 2025",
  exp1_role: "Stagiaire en IA et ingénierie des données",
  exp1_what: "Diamond for Sales, une plateforme web interne qui repère les opportunités commerciales restées sans suite.",
  exp1_b1: "Conception d'une plateforme qui nettoie, analyse et note les données commerciales issues du CRM.",
  exp1_b2: "Ajout d'une analyse par LLM qui rédige un résumé court et propose la prochaine action pour chaque opportunité.",
  exp1_b3: "Réalisation de toute la chaîne : extraction des données, backend et tableau de bord lisible.",
  btn_shots: "Voir les captures",
  exp2_date: "Juin – juil. 2025",
  exp2_role: "Stagiaire en observation IT et réseaux",
  exp2_b1: "Étude d'une grande infrastructure télécom et de la circulation des données.",
  exp2_b2: "Travail avec plusieurs équipes et découverte de la gestion de projets IT.",
  exp2_t1: "IT et réseaux", exp2_t2: "Gestion de projets IT",

  h_projects: "Projets",
  p1_t: "Système de recrutement par IA agentique", p1_m: "Projet de synthèse 2, janv. – mai 2026",
  p1_d: "Un workflow automatisé qui lit les CV, les note par rapport à une offre d'emploi et classe les candidats.",
  p2_m: "Projet personnel",
  p2_d: "Recommande des films, livres et musiques selon votre humeur, votre genre et une description libre de l'ambiance voulue. Elle garde l'historique de vos choix.",
  p2_t1: "Systèmes de recommandation",
  p3_t: "Système d'IA embarquée", p3_m: "Projet interne, mars 2026",
  p3_d: "Un petit modèle de machine learning qui classe des données de capteurs en temps réel sur du matériel embarqué, avec des limites strictes de mémoire, de vitesse et d'énergie.",
  p4_t: "Plateforme d'IA médicale", p4_m: "Projet de synthèse 1, janv. – mai 2025",
  p4_d: "Un réseau de neurones convolutif qui détecte les maladies pulmonaires à partir d'images médicales, avec une interface Streamlit pour l'essayer.",
  p4_t1: "Deep learning",
  more_code: "Plus de code sur GitHub",

  h_skills: "Compétences",
  s_lang: "Langages", s_ai: "IA et machine learning", s_data: "Données et automatisation",
  s_tools: "Outils et déploiement", s_eng: "Logiciels d'ingénierie", s_proc: "Gestion des processus",
  sk_agentic: "IA agentique", sk_clean: "Nettoyage de données",
  sk_sc: "Chaîne logistique", sk_qms: "Management de la qualité",
  sk_ops: "Gestion des opérations", sk_pa: "Analyse et optimisation des processus",

  h_education: "Formation",
  ed1_date: "Depuis 2024",
  ed1_p: "Diplôme d'ingénieur en Technologies Avancées, Systèmes Industriels et Compétitivité. École Nationale des Sciences et Technologies Avancées de Borj Cédria.",
  ed2_date: "Jusqu'en 2024",
  ed2_p: "Classes préparatoires, filière chimie-physique, à l'Institut Préparatoire aux Études d'Ingénieur de Monastir.",
  h_contact: "Parlons-en",
  letter_hi: "Chère recruteuse, cher recruteur,",
  contact_lead: "Je suis ouverte aux stages et aux projets en IA et en données. Écrivez-moi, j'aimerais connaître votre équipe.",
  c_phone: "Téléphone", cv_en: "CV en anglais", cv_fr: "CV en français",

  h_play: "Faire une pause",
  play_intro: "Deux petits jeux pour une courte pause. Battez votre meilleur score.",
  tab_stars: "Attrape les étoiles", tab_memory: "Jeu de mémoire",
  how_stars: "Déplacez le lapin avec les flèches (ou A et D), ou glissez le doigt. Attrapez les étoiles et les cœurs, évitez les nuages d'orage.",
  how_memory: "Retournez deux cartes à la fois et trouvez toutes les paires avec le moins de coups possible.",
  btn_new: "Nouvelle partie",

  foot_note: "Réalisé avec HTML, CSS et JavaScript.", to_top: "Retour en haut",
  m_shots: "Captures d'écran", m_cv_title: "Choisir un CV", m_cv_p: "Choisissez la langue à télécharger.",
};

// Strings used by scripts (games, buttons, aria labels).
const JS_STRINGS = {
  en: {
    copy: "Copy email", copied: "Copied",
    g_ready: "Ready?", btn_start: "Start", btn_again: "Play again",
    g_score: "Score", g_lives: "Lives", g_best: "Best",
    g_over_stars: "Game over", g_stars_text: "You caught {n} points.",
    g_moves: "Moves", g_time: "Time", g_pairs_win: "All pairs found in {m} moves!", g_pairs_new: "New record!",
    g_none: "none yet",
    shot_missing: "Image not found. Add {f} to the assets folder.",
    lang_aria: "Switch to French", theme_aria: "Switch theme", menu_aria: "Open menu",
    close_aria: "Close", prev_aria: "Previous", next_aria: "Next",
  },
  fr: {
    copy: "Copier l'email", copied: "Copié",
    g_ready: "Prête ?", btn_start: "Démarrer", btn_again: "Rejouer",
    g_score: "Score", g_lives: "Vies", g_best: "Record",
    g_over_stars: "Partie terminée", g_stars_text: "Vous avez attrapé {n} points.",
    g_moves: "Coups", g_time: "Temps", g_pairs_win: "Toutes les paires trouvées en {m} coups !", g_pairs_new: "Nouveau record !",
    g_none: "aucun",
    shot_missing: "Image introuvable. Ajoutez {f} dans le dossier assets.",
    lang_aria: "Passer en anglais", theme_aria: "Changer de thème", menu_aria: "Ouvrir le menu",
    close_aria: "Fermer", prev_aria: "Précédent", next_aria: "Suivant",
  },
};

(function () {
  let lang = "en";
  try { lang = localStorage.getItem("aya_lang") || "en"; } catch (e) {}
  if (!JS_STRINGS[lang]) lang = "en";

  document.querySelectorAll("[data-i18n]").forEach((el) => (el.dataset.en = el.innerHTML));

  window.t = (key) => (JS_STRINGS[lang] && JS_STRINGS[lang][key]) || JS_STRINGS.en[key] || key;
  window.getLang = () => lang;

  function apply() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const k = el.dataset.i18n;
      el.innerHTML = lang === "fr" && FR[k] ? FR[k] : el.dataset.en;
    });
    document.querySelectorAll("[data-aria]").forEach((el) => el.setAttribute("aria-label", window.t(el.dataset.aria)));
    document.getElementById("langBtn").textContent = lang === "fr" ? "EN" : "FR";
    const copy = document.getElementById("copyMail");
    if (copy) copy.textContent = window.t("copy");
    window.dispatchEvent(new Event("langchange"));
  }

  document.getElementById("langBtn").addEventListener("click", () => {
    lang = lang === "en" ? "fr" : "en";
    try { localStorage.setItem("aya_lang", lang); } catch (e) {}
    apply();
  });

  apply();
})();
