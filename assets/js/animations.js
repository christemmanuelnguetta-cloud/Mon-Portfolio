/* =========================================================
   animations.js : tout ce qui bouge sur la page

     1. Écran de chargement
     2. Particules du hero
     3. Texte qui s'écrit tout seul
     4. Apparition des blocs au défilement
     5. Barres de compétences
     6. Compteurs de chiffres clés
   ========================================================= */
$(function () {

  /* ---------- 1. Écran de chargement ---------- */
  $(window).on("load", function () {
    setTimeout(function () { $("#chargement").addClass("fini"); }, 350);
  });
  // Sécurité : si « load » tarde, on retire quand même l'écran
  setTimeout(function () { $("#chargement").addClass("fini"); }, 3500);


  /* ---------- 2. Particules qui montent dans le hero ---------- */
  var $particules = $("#particules");
  if ($particules.length) {
    for (var i = 0; i < 25; i++) {
      $("<span>").addClass("particule").css({
        left: Math.random() * 100 + "%",
        width: (Math.random() * 3 + 2).toFixed(1) + "px",
        height: (Math.random() * 3 + 2).toFixed(1) + "px",
        animationDuration: (Math.random() * 12 + 10).toFixed(1) + "s",
        animationDelay: (Math.random() * 12).toFixed(1) + "s",
        opacity: (Math.random() * 0.5 + 0.2).toFixed(2)
      }).appendTo($particules);
    }
  }


  /* ---------- 3. Texte qui s'écrit tout seul (hero) ---------- */
  var metiers = (window.PORTFOLIO && PORTFOLIO.metiers) || [];
  var iMetier = 0, iLettre = 0, efface = false;

  function ecrire() {
    if (!metiers.length) return;
    var mot = metiers[iMetier];
    iLettre += efface ? -1 : 1;
    $("#metier").text(mot.substring(0, iLettre));

    var delai = efface ? 40 : 90;
    if (!efface && iLettre === mot.length) {
      efface = true;
      delai = 1800;
    } else if (efface && iLettre === 0) {
      efface = false;
      iMetier = (iMetier + 1) % metiers.length;
      delai = 400;
    }
    setTimeout(ecrire, delai);
  }
  ecrire();


  /* ---------- 4 à 6. Animations déclenchées au défilement ---------- */
  var barresAnimees = false, compteursAnimes = false;

  function estVisible($el) {
    if (!$el.length) return false;
    return $(window).scrollTop() + $(window).height() - 80 > $el.offset().top;
  }

  function animer() {
    // Les blocs .reveal apparaissent selon leur data-anim
    $(".reveal:not(.visible)").each(function () {
      if (estVisible($(this))) $(this).addClass("visible");
    });

    // Les barres de compétences se remplissent (une seule fois)
    if (!barresAnimees && estVisible($(".barre").first())) {
      barresAnimees = true;
      $(".barre").each(function (i) {
        $(this).delay(i * 150).animate({ width: $(this).data("niveau") + "%" }, 1200);
      });
    }

    // Les chiffres clés comptent de 0 à leur valeur (une seule fois)
    if (!compteursAnimes && estVisible($(".compteur").first())) {
      compteursAnimes = true;
      $(".compteur").each(function () {
        var $c = $(this);
        $({ n: 0 }).animate({ n: $c.data("cible") }, {
          duration: 1500,
          step: function (n) { $c.text(Math.ceil(n)); }
        });
      });
    }
  }

  $(window).on("scroll resize", animer);
  animer();


  /* ---------- 7. Les pourcentages comptent avec la barre ---------- */
  function animerPourcentages() {
    $(".competence-entete span:last-child").each(function () {
      var $p = $(this);
      if ($p.data("fait")) return;
      var cible = parseInt($p.text(), 10);
      if (isNaN(cible)) return;
      $p.data("fait", true).text("0%");
      $({ n: 0 }).animate({ n: cible }, {
        duration: 1200,
        step: function (n) { $p.text(Math.round(n) + "%"); }
      });
    });
  }
  // On les lance en meme temps que les barres
  var verifier = setInterval(function () {
    if (barresAnimees) { animerPourcentages(); clearInterval(verifier); }
  }, 150);


  /* ---------- 8. La photo suit doucement la souris (ordinateur) ---------- */
  if (window.matchMedia("(min-width: 768px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    $("#accueil").on("mousemove", function (e) {
      var r = this.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      $(".photo-parallaxe").css("transform", "translate(" + (x * 14).toFixed(1) + "px," +
                                                   (y * 14).toFixed(1) + "px)");
    }).on("mouseleave", function () {
      $(".photo-parallaxe").css("transform", "");
    });
  }
});
