/* =========================================================
   theme.js : mode sombre / clair, mémorisé dans le navigateur
   ========================================================= */
$(function () {

  function appliquerTheme(sombre) {
    $("html").toggleClass("dark", sombre);
    $(".icone-lune").toggleClass("hidden", sombre);
    $(".icone-soleil").toggleClass("hidden", !sombre);
  }

  var themeSauve = null;
  try { themeSauve = localStorage.getItem("theme"); } catch (e) {}
  appliquerTheme(themeSauve === "sombre");

  $("#theme-btn").on("click", function () {
    var sombre = !$("html").hasClass("dark");
    appliquerTheme(sombre);
    try { localStorage.setItem("theme", sombre ? "sombre" : "clair"); } catch (e) {}
  });
});
