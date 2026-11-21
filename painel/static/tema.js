/* TopClip — modo noturno. Carrega no <head> (antes de pintar), para não piscar claro.
   Escolha salva no navegador; sem escolha, segue o tema do sistema. */
(function () {
  "use strict";
  var CHAVE = "topclip-tema";
  var raiz = document.documentElement;
  var sistema = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function salvo() { try { return localStorage.getItem(CHAVE); } catch (e) { return null; } }
  function atual() { return salvo() || (sistema && sistema.matches ? "escuro" : "claro"); }

  function aplicar(tema) {
    if (tema === "escuro") raiz.setAttribute("data-tema", "escuro");
    else raiz.removeAttribute("data-tema");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", tema === "escuro" ? "#1c1b1e" : "#f4f0e8");
    var botao = document.getElementById("tema");
    if (botao) {
      var escuro = tema === "escuro";
      botao.setAttribute("aria-pressed", escuro ? "true" : "false");
      botao.setAttribute("aria-label", escuro ? "Voltar ao modo claro" : "Ativar o modo noturno");
      botao.setAttribute("title", escuro ? "Modo claro" : "Modo noturno");
      var rotulo = botao.querySelector("span");
      if (rotulo) rotulo.textContent = escuro ? "claro" : "noturno";
    }
  }

  aplicar(atual());

  document.addEventListener("DOMContentLoaded", function () {
    aplicar(atual());
    var botao = document.getElementById("tema");
    if (!botao) return;
    botao.addEventListener("click", function () {
      var novo = raiz.getAttribute("data-tema") === "escuro" ? "claro" : "escuro";
      try { localStorage.setItem(CHAVE, novo); } catch (e) { /* sem armazenamento: vale só nesta aba */ }
      aplicar(novo);
    });
  });

  // sem escolha da pessoa, acompanha o sistema
  if (sistema && sistema.addEventListener) {
    sistema.addEventListener("change", function () { if (!salvo()) aplicar(atual()); });
  }
})();
