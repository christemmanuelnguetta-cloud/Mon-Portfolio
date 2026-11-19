/* =========================================================
   cv.js : bouton de téléchargement du CV

   Deux cas possibles :
   1. Un vrai fichier assets/docs/cv.pdf existe
      -> on le télécharge directement.
   2. Il n'existe pas encore
      -> on ouvre la fenêtre d'impression du navigateur.
         Le visiteur choisit « Enregistrer au format PDF ».
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {
  var bouton = document.getElementById("btn-pdf");
  if (!bouton) return;

  bouton.addEventListener("click", function () {
    fetch("assets/docs/cv.pdf", { method: "HEAD" })
      .then(function (reponse) {
        var type = reponse.headers.get("content-type") || "";
        if (reponse.ok && type.indexOf("pdf") !== -1) {
          // Le PDF existe : on le télécharge
          var lien = document.createElement("a");
          lien.href = "assets/docs/cv.pdf";
          lien.download = "CV.pdf";
          document.body.appendChild(lien);
          lien.click();
          document.body.removeChild(lien);
        } else {
          window.print();
        }
      })
      .catch(function () {
        window.print();
      });
  });
});
