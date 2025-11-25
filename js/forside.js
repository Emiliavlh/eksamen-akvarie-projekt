"use strict";

const purpleFish = document.querySelector(".purple-fish");

// script.js
document.addEventListener("DOMContentLoaded", () => {

  const findButton = document.querySelector(".find-fisken");


  findButton.addEventListener("click", () => {
    window.location.href = "./spil.html";
  });

});
