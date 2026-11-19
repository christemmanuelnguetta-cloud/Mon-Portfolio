/* =========================================================
   projets.js : filtre des projets par catégorie
   ========================================================= */
$(function () {

  $("#filtres").on("click", ".filtre", function () {
    var filtre = $(this).data("filtre");

    $(".filtre").removeClass("actif");
    $(this).addClass("actif");

    $(".projet").each(function () {
      var garder = filtre === "tous" || $(this).data("categorie") === filtre;
      if (garder) $(this).stop(true, true).fadeIn(400);
      else $(this).stop(true, true).hide();
    });
  });
});
