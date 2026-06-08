/* =====================================================
   SALTEÑERÍA CHIKIS — Parche JS: Dropdown mobile
   Incluir DESPUÉS de script.js en todos los .html:
     <script src="nav-dropdown-fix.js"></script>
   ===================================================== */

(function initMobileDropdown() {
  'use strict';

  /* Solo activar en pantallas ≤ 760px */
  var MQ = window.matchMedia('(max-width: 760px)');

  function bindDropdowns() {
    document.querySelectorAll('#nav .dropdown > a').forEach(function (link) {
      /* Evitar duplicar el listener */
      if (link.dataset.mobileBound) return;
      link.dataset.mobileBound = 'true';

      link.addEventListener('click', function (e) {
        /* Solo interceptar en mobile */
        if (!MQ.matches) return;

        e.preventDefault(); /* No navegar al href */

        var dropdown = link.closest('.dropdown');
        var isOpen   = dropdown.classList.contains('open');

        /* Cerrar todos los demás dropdowns abiertos */
        document.querySelectorAll('#nav .dropdown.open').forEach(function (d) {
          d.classList.remove('open');
        });

        /* Toggle el actual */
        if (!isOpen) {
          dropdown.classList.add('open');
        }
      });
    });
  }

  /* Esperar al DOM */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindDropdowns);
  } else {
    bindDropdowns();
  }

  /* Re-bindear si el nav se genera dinámicamente */
  document.addEventListener('DOMContentLoaded', function () {
    /* Cerrar dropdowns al hacer clic en un enlace del sub-menu */
    document.querySelectorAll('#nav .dropdown-menu a').forEach(function (a) {
      a.addEventListener('click', function () {
        document.querySelectorAll('#nav .dropdown.open').forEach(function (d) {
          d.classList.remove('open');
        });
        /* También cerrar el menú hamburguesa */
        var nav = document.getElementById('nav');
        if (nav) nav.classList.remove('responsive');
        window.menuVisible = false;
      });
    });
  });
})();