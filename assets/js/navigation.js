/* =========================================================
   navigation.js : menu mobile, header, lien actif,
   barre de progression et bouton retour en haut
   ========================================================= */
$(function () {

  /* ---------- Menu mobile ---------- */
  $("#menu-btn").on("click", function () {
    $("#menu").toggleClass("hidden");
    var ouvert = !$("#menu").hasClass("hidden");
    $(this).toggleClass("ouvert", ouvert).attr("aria-expanded", ouvert);
  });

  $("#menu a").on("click", function () {
    if ($(window).width() < 768) {
      $("#menu").addClass("hidden");
      $("#menu-btn").removeClass("ouvert").attr("aria-expanded", false);
    }
  });

  /* ---------- Au défilement ---------- */
  function auDefilement() {
    var y = $(window).scrollTop();
    var hauteurPage = $(document).height() - $(window).height();

    // Le header prend un fond dès qu'on descend
    $("#header").toggleClass("defile", y > 50);

    // Barre de progression de lecture
    $("#progression").css("width", (hauteurPage > 0 ? (y / hauteurPage) * 100 : 0) + "%");

    // Bouton retour en haut
    $("#haut-btn").toggleClass("montre", y > 500);

    // Lien du menu actif selon la section affichée
    $("main section").each(function () {
      var debut = $(this).offset().top - 120;
      if (y >= debut && y < debut + $(this).outerHeight()) {
        $(".lien-nav").removeClass("actif");
        $('.lien-nav[href="#' + this.id + '"]').addClass("actif");
      }
    });
  }
  $(window).on("scroll resize", auDefilement);
  auDefilement();

  /* ---------- Retour en haut ---------- */
  $("#haut-btn").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
  });

  /* ---------- Année du footer ---------- */
  $("#annee").text(new Date().getFullYear());
});
