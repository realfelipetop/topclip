/* TopClip — modo noturno, parte que precisa rodar antes de pintar (no <head>), para a
   página não piscar clara. O botão do topo e o clique ficam em app.js.
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
  }

  window.aplicarTema = aplicar;   // app.js chama quando a pessoa clica no botão
  aplicar(atual());

  // sem escolha da pessoa, acompanha o sistema
  if (sistema && sistema.addEventListener) {
    sistema.addEventListener("change", function () { if (!salvo()) aplicar(atual()); });
  }
})();
