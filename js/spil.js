"use strict";

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
  const talebobleTekst = document.querySelector(".taleboble-tekst");
  const talebobleContainer = document.querySelector(".taleboble-container");
  const fiskGif = document.querySelector(".fisk-gif");
  const boblerfisk = document.querySelector(".boblerfisk");
  const overlay = document.querySelector(".overlay");
  const slutoverlay = document.querySelector(".slutoverlay");

  // Find alle de små fisk
  const smallFish1 = document.querySelector(".gemme-fisk1");
  const smallFish2 = document.querySelector(".gemme-fisk2");
  const smallFish3 = document.querySelector(".gemme-fisk3");

  let currentRound = 0;
  let introIndex = 0;
  let fundetIndex = 0;
  let slutIndex = 0;

  // Vis intro beskeder én ad gangen
  const visIntroBesked = () => {
    if (introIndex < introBeskeder.length) {
      talebobleTekst.textContent = introBeskeder[introIndex++];
      fiskGif.classList.remove("skjult");
      setTimeout(visIntroBesked, 4000); // vent 4 sek til næste besked
    } else {
      startNedtaelling();
    }
  };

  // Start nedtælling
  const startNedtaelling = () => {
    let count = 3;
    talebobleTekst.textContent = count;

    const timer = setInterval(() => {
      count--;
      if (count > 0) {
        talebobleTekst.textContent = count;
      } else {
        clearInterval(timer);
        overlay.classList.add("active");

        setTimeout(() => {
          overlay.classList.remove("active");
          gemFisk();
        }, 1000);
      }
    }, 1000);
  };

  // Gem fisken (vis den rigtige lille fisk)
  const gemFisk = () => {
    // Skjul store fisk
    fiskGif.classList.add("skjult");
    boblerfisk.classList.add("skjult");
    talebobleContainer.classList.add("skjult");

    // Skjul alle små fisk først
    smallFish1.classList.add("skjult");
    smallFish2.classList.add("skjult");
    smallFish3.classList.add("skjult");

    // Vis den rigtige fisk for denne runde
    if (currentRound === 0) {
      smallFish1.classList.remove("skjult");
    } else if (currentRound === 1) {
      smallFish2.classList.remove("skjult");
    } else if (currentRound === 2) {
      smallFish3.classList.remove("skjult");
    }
  };

  // Viser fundet beskeder (Taget fra array)
  const visFundetBesked = () => {
    if (fundetIndex < fundetBeskeder.length) {
      talebobleTekst.textContent = fundetBeskeder[fundetIndex++];
      setTimeout(visFundetBesked, 3000);
    } else {
      fundetIndex = 0; // reset til næste gang
      currentRound++;

      if (currentRound < 3) {
        startNedtaelling(); // næste runde
      } else {
        visSlutBesked(); // sidste runde, viser slut beskederne
      }
    }
  };

  // Vis slut beskeder
  const visSlutBesked = () => {
    if (slutIndex < slutBeskeder.length) {
      talebobleTekst.textContent = slutBeskeder[slutIndex++];
      setTimeout(visSlutBesked, 3000);
    } else {
      slutoverlay.classList.add("active");
    }
  };

  // Click events for de små fisk
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
      visSlutBesked();
    }
  });

  // Start spillet
  visIntroBesked();
});
