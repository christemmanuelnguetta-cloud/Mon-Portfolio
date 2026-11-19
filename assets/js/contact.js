/* =========================================================
   contact.js : formulaire de contact

   Le site est statique : ni serveur, ni base de données.
   Les messages partent donc par e-mail et arrivent dans la
   boîte Gmail — donc lisibles sur ordinateur, téléphone et
   tablette, partout où le compte est connecté.

   Deux relais possibles, choisis automatiquement :

   1. Web3Forms, si PORTFOLIO.cleFormulaire est renseignée
      dans data.js. Méthode la plus sûre : la clé s'obtient
      en 30 secondes sur web3forms.com et fonctionne tout de
      suite, sans étape d'activation.

   2. FormSubmit, sinon. Aucune clé, mais il faut cliquer une
      fois sur le lien « Activate Form » reçu par e-mail.

   Si le réseau échoue, on ouvre la messagerie du visiteur
   pour que son message ne soit jamais perdu.
   ========================================================= */
$(function () {

  var MAX = 500;
  var REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var WEB3FORMS = "https://api.web3forms.com/submit";
  var FORMSUBMIT = "https://formsubmit.co/ajax/";

  /* ---------- Compteur de caractères ---------- */
  $("#message").attr("maxlength", MAX).on("input", function () {
    $("#nb-caracteres").text($(this).val().length);
  });

  /* ---------- Messages d'erreur sous les champs ---------- */
  function afficherErreur(champ, texte) {
    $("#" + champ).toggleClass("invalide", !!texte);
    $('.erreur[data-pour="' + champ + '"]').text(texte || "");
  }

  /* ---------- Notification en bas de page ---------- */
  function toast(texte, type) {
    $("#toast")
      .removeClass("toast-ok toast-erreur")
      .addClass(type ? "toast-" + type : "")
      .text(texte)
      .addClass("montre");
    setTimeout(function () { $("#toast").removeClass("montre"); }, 5000);
  }

  function reinitialiser(formulaire) {
    formulaire.reset();
    $("#nb-caracteres").text(0);
  }

  /* ---------- Envoi du formulaire ---------- */
  $("#form-contact").on("submit", function (e) {
    e.preventDefault();

    var formulaire = this;
    var $bouton = $(formulaire).find('button[type="submit"]');
    var nom = $.trim($("#nom").val());
    var email = $.trim($("#email").val());
    var sujet = $.trim($("#sujet").val()) || "Contact depuis le portfolio";
    var message = $.trim($("#message").val());

    /* --- Validation --- */
    var nomOk = nom.length >= 2;
    var emailOk = REGEX_EMAIL.test(email);
    var messageOk = message.length >= 10;

    afficherErreur("nom", nomOk ? "" : "Indique ton nom.");
    afficherErreur("email", emailOk ? "" : "Adresse e-mail invalide.");
    afficherErreur("message", messageOk ? "" : "Au moins 10 caractères.");

    if (!nomOk || !emailOk || !messageOk) {
      $(formulaire).find(".invalide").first().trigger("focus");
      return;
    }

    /* --- Piège à robots : un vrai visiteur laisse ce champ vide --- */
    if ($("#site-web").val()) return;

    /* --- Adresse de destination pas encore renseignée --- */
    if (!REGEX_EMAIL.test(PORTFOLIO.email) || /[\[\]]/.test(PORTFOLIO.email)) {
      toast("Le formulaire n'est pas encore configuré.", "erreur");
      return;
    }

    /* --- Choix du relais --- */
    var cle = (PORTFOLIO.cleFormulaire || "").trim();
    var requete;

    if (cle) {
      requete = {
        url: WEB3FORMS,
        data: {
          access_key: cle,
          subject: "Portfolio — " + sujet,
          from_name: "Portfolio — " + nom,
          name: nom,
          email: email,
          message: message
        }
      };
    } else {
      requete = {
        url: FORMSUBMIT + PORTFOLIO.email,
        data: {
          name: nom,
          email: email,
          message: message,
          _subject: "Portfolio — " + sujet,
          _template: "table",
          _captcha: "false"
        }
      };
    }

    /* --- Envoi --- */
    var texteBouton = $bouton.text();
    $bouton.prop("disabled", true).text("Envoi en cours…");

    function terminer() {
      $bouton.prop("disabled", false).text(texteBouton);
    }

    /* Le service refuse parfois un envoi au passage (plusieurs messages
       trop rapprochés). On réessaie une fois avant d'abandonner.
       On ne réessaie PAS après une panne réseau : le message aurait pu
       partir quand même, et on enverrait alors deux fois. */
    function envoyer(essai) {
      $.ajax({
        url: requete.url,
        method: "POST",
        dataType: "json",
        /* On envoie les données comme un formulaire HTML classique,
           et non en JSON. Le navigateur n'a alors pas besoin de demander
           l'autorisation au serveur avant d'envoyer (requête « simple »).
           C'est beaucoup plus fiable : cette demande préalable est
           souvent bloquée par les bloqueurs de publicité, les antivirus
           et certains réseaux d'entreprise ou d'école. */
        data: requete.data
      }).done(function (reponse) {

        if (reponse && String(reponse.success) === "true") {
          toast("Merci " + nom + " ! Ton message a bien été envoyé.", "ok");
          reinitialiser(formulaire);
          terminer();
          return;
        }

        var texte = (reponse && reponse.message) || "";

        // Le propriétaire du site doit cliquer une fois sur le lien
        // « Activate Form » reçu par e-mail.
        if (/activation/i.test(texte)) {
          toast("Formulaire en attente d'activation. Réessaie dans un instant.", "erreur");
          terminer();
          return;
        }

        // Trop de messages envoyés sur une courte période : inutile de
        // réessayer tout de suite, le service refusera encore.
        if (/rate limit/i.test(texte)) {
          toast("Trop de messages envoyés d'affilée. Réessaie dans quelques minutes.", "erreur");
          terminer();
          return;
        }

        if (essai === 1) {
          $bouton.text("Nouvel essai…");
          setTimeout(function () { envoyer(2); }, 2500);
          return;
        }

        console.warn("Réponse du service de messagerie :", reponse);
        toast("L'envoi a échoué. Réessaie dans un instant, ou écris-moi par e-mail.", "erreur");
        terminer();

      }).fail(function (xhr) {
        /* On n'ouvre plus la messagerie automatiquement : sous Windows
           cela déclenche une fenêtre « Choisir une application », très
           désagréable pour le visiteur. On garde son message à l'écran
           pour qu'il puisse réessayer sans rien retaper. */
        console.warn("Échec réseau lors de l'envoi :", xhr && xhr.status);
        toast("Envoi impossible. Vérifie ta connexion, ou écris à " + PORTFOLIO.email, "erreur");
        terminer();
      });
    }

    envoyer(1);
  });

  /* ---------- L'erreur disparaît dès que le visiteur corrige ---------- */
  $(".champ").on("input", function () { afficherErreur(this.id, ""); });
});
