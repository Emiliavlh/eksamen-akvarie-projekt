"use strict";

// Mine beskeder som fisken skal sige i de forskellige runder

const introBeskeder = [
  "Hej med dig! Er du klar på at lege gemmeleg?",
  "Er du klar? Jeg tæller ned fra 3",
];

const fundetBeskeder = [
  "Jubi! Du fandt mig!", 
  "Er du klar på en runde mere?"
];

const slutBeskeder = [
  "Jubi! Du fandt mig!",
  "Tak fordi du ville lege med mig. Vi ses!",
];

document.addEventListener("DOMContentLoaded", () => {
 // Simpel baggrundsmusik - kun JavaScript
const music = new Audio('sound/spil-musik.mp3');
music.volume = 0.2;
music.play();
  // Her har jeg samlet alle mine HTML ElementInternals, som jeg skal bruge i min js

  const talebobleTekst = document.querySelector(".taleboble-tekst");
  const talebobleContainer = document.querySelector(".taleboble-container");
  const fiskGif = document.querySelector(".fisk-gif");
  const boblerfisk = document.querySelector(".boblerfisk");
  const overlay = document.querySelector(".overlay");
  const slutoverlay = document.querySelector(".slutoverlay");

  // Alle mine fisk der skal gemme sig på skift.
  const smallFish1 = document.querySelector(".gemme-fisk1");
  const smallFish2 = document.querySelector(".gemme-fisk2");
  const smallFish3 = document.querySelector(".gemme-fisk3");

  // Mine variabler, der skal holde styr på spillet
  let currentRound = 0; //Hvilken runde vi er på (0, 1 eller 2)
  let introIndex = 0; //Holder styr på hvilken besked vi er på
  let fundetIndex = 0;
  let slutIndex = 0;

  // Denne funktion viser intro beskederne én af gangen
  const visIntroBesked = () => {
    if (introIndex < introBeskeder.length) {
      //Viser den næste besked i taleboblen
      talebobleTekst.textContent = introBeskeder[introIndex++];
      fiskGif.classList.remove("skjult"); // Her bliver class/selectoren "skjult" fjernet, så vi kan se den store fisk
      setTimeout(visIntroBesked, 4000); // vent 4 sek til næste besked
    } else {
      //Efter alle intoBeskederne er vist, så starter nedtællingen
      startNedtaelling();
    }
  };

  // Her starter nedtællingen fra 3-0, før fisken kan gemme sig.
  const startNedtaelling = () => {
    let count = 3;
    talebobleTekst.textContent = count; //Denne viser hvilket tal vi er nået til i taleboblen

    const timer = setInterval(() => {
      count--; // Dette betyder, at den tæller ned (pga. minus tegnene)
      if (count > 0) {
        talebobleTekst.textContent = count; //Det her betyder bare, at den skal vise det nye tal, i taleboblen
      } else {
        clearInterval(timer); // Stopper timeren, når vi er ved 0
        overlay.classList.add("active"); // Dette aktiverer overlayet, (.add)

        setTimeout(() => {
          overlay.classList.remove("active"); // Dette deaktiverer overlayet, (.remove)
          gemFisk(); // Fisken gemmer sig
        }, 1000);
      }
    }, 1000);
  };

  // Denne funktion gemmer én af mine fisk.
  const gemFisk = () => {
    // Skjul alle store elementer
    fiskGif.classList.add("skjult");
    boblerfisk.classList.add("skjult");
    talebobleContainer.classList.add("skjult");

    // Skjul alle små fisk
    smallFish1.classList.add("skjult");
    smallFish2.classList.add("skjult");
    smallFish3.classList.add("skjult");

    // Dette if statement, viser kun den fisk, der hører til den passende runde (har givet fiskene forskellige tal)
    if (currentRound === 0) {
      smallFish1.classList.remove("skjult"); //Første runde
    } else if (currentRound === 1) {
      smallFish2.classList.remove("skjult"); //Anden runde
    } else if (currentRound === 2) {
      smallFish3.classList.remove("skjult"); //Tredje runde
    }
  };

  // Viser fundet beskeder (Taget fra array)
  const visFundetBesked = () => {
    if (fundetIndex < fundetBeskeder.length) {
      talebobleTekst.textContent = fundetBeskeder[fundetIndex++];
      setTimeout(visFundetBesked, 3000); //Vent 3 sek mellem de viste beskeder
    } else {
      // reset til næste gang, og gå igang med den næste runde
      fundetIndex = 0; 
      currentRound++;

      if (currentRound < 3) {
        startNedtaelling(); // start næste runde
      } else {
        visSlutBesked(); // Spillet er slut, så derfor bliver slutBeskeder vist.
      }
    }
  };

  // Denne funktion viser slut beskeder, når spillet er slut (Hentet fra array)
  const visSlutBesked = () => {
    if (slutIndex < slutBeskeder.length) {
      talebobleTekst.textContent = slutBeskeder[slutIndex++];
      setTimeout(visSlutBesked, 3000); // Igen, 3 sek mellem beskederne
    } 
  };

  // Her er mine samlet click events for hver fisk.

  smallFish1.addEventListener("click", () => {
    if (currentRound === 0) {
      smallFish1.classList.add("skjult");
      fiskGif.classList.remove("skjult");
      boblerfisk.classList.remove("skjult");
      talebobleContainer.classList.remove("skjult");
      visFundetBesked();
    }
  });

  smallFish2.addEventListener("click", () => {
    if (currentRound === 1) {
      smallFish2.classList.add("skjult");
      fiskGif.classList.remove("skjult");
      boblerfisk.classList.remove("skjult");
      talebobleContainer.classList.remove("skjult");
      visFundetBesked();
    }
  });

  smallFish3.addEventListener("click", () => {
    if (currentRound === 2) {
      smallFish3.classList.add("skjult");
      fiskGif.classList.remove("skjult");
      boblerfisk.classList.remove("skjult");
      talebobleContainer.classList.remove("skjult");
      visSlutBesked(); // slutBesked skal vises her, da der ikke er flere runder.
    }
  });

  // Starter mit spil, ved at vise introBeskeder
  visIntroBesked();
});
