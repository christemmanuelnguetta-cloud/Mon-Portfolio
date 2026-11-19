/* =========================================================
   rendu.js : fabrique le HTML à partir de data.js
   (compétences, filtres, cartes de projets)
   Chargé AVANT les autres scripts, qui animent ces éléments.
   ========================================================= */
$(function () {

  /* ---------- Barres de compétences ---------- */
  $.each(PORTFOLIO.competences, function (i, c) {
    var $li = $("<li>");
    $("<div>").addClass("competence-entete")
      .append($("<span>").text(c.nom))
      .append($("<span>").text(c.niveau + "%"))
      .appendTo($li);
    $("<div>").addClass("competence-piste")
      .append($("<div>").addClass("barre").attr("data-niveau", c.niveau))
      .appendTo($li);
    $("#liste-competences").append($li);
  });

  /* ---------- Autres compétences (étiquettes) ---------- */
  $.each(PORTFOLIO.autresCompetences || [], function (i, nom) {
    $("<li>").addClass("tag").text(nom).appendTo("#autres-competences");
  });

  /* ---------- Boutons de filtre ---------- */
  $.each(PORTFOLIO.categories, function (i, cat) {
    $("<button>").addClass("filtre").toggleClass("actif", i === 0)
      .attr({ type: "button", "data-filtre": cat.id })
      .text(cat.nom)
      .appendTo("#filtres");
  });

  /* ---------- Cartes de projets ---------- */
  $.each(PORTFOLIO.projets, function (i, p) {
    var $carte = $("<article>").addClass("projet carte reveal").attr({
      "data-categorie": p.categorie,
      "data-anim": "zoom",
      "data-retard": (i % 3) + 1      // les cartes arrivent l'une apres l'autre
    });

    $("<div>").addClass("projet-visuel")
      .css("background", "linear-gradient(135deg, " + p.couleurs[0] + ", " + p.couleurs[1] + ")")
      .append($("<span>").attr("aria-hidden", "true").text(p.symbole))
      .appendTo($carte);

    var $corps = $("<div>").addClass("projet-corps").appendTo($carte);
    $("<h3>").text(p.titre).appendTo($corps);
    $("<p>").text(p.description).appendTo($corps);

    var $tags = $("<ul>").addClass("liste-tags").appendTo($corps);
    $.each(p.technologies, function (j, t) {
      $("<li>").addClass("tag").text(t).appendTo($tags);
    });

    $("<a>").addClass("projet-lien")
      .attr({ href: p.lien, target: "_blank", rel: "noopener" })
      .text("Voir le code sur GitHub →")
      .appendTo($corps);

    $("#liste-projets").append($carte);
  });
});
