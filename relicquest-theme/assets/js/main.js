/* RelicQuest theme interactions */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    setupNav();
    setupCoinIdentifier();
    setupForumSearch();
  });

  /* ---- Mobile nav toggle ---- */
  function setupNav() {
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.querySelector('.mobile-nav');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---- Coin identifier ---- */
  function setupCoinIdentifier() {
    var input = document.getElementById('coin-input');
    if (!input) return;

    var dropzone = document.getElementById('coin-dropzone');
    var preview = document.getElementById('coin-preview');
    var previewImg = document.getElementById('coin-preview-img');
    var status = document.getElementById('coin-status');
    var steps = document.getElementById('coin-steps');
    var results = document.getElementById('coin-results');
    var moreBtn = document.getElementById('coin-more');
    var retry = document.getElementById('coin-retry');
    var clear = document.getElementById('coin-clear');
    var objectUrl = null;

    function show(el) { if (el) el.classList.remove('hidden'); }
    function hide(el) { if (el) el.classList.add('hidden'); }

    function handleFile(file) {
      if (!file || file.type.indexOf('image/') !== 0) return;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      objectUrl = URL.createObjectURL(file);
      previewImg.src = objectUrl;

      hide(dropzone);
      show(preview);
      hide(steps);
      status.innerHTML = '<span class="spinner"></span>' + 'Analyzing your coin…';

      // Simulated analysis. Wire to a real model endpoint here if desired.
      window.setTimeout(function () {
        status.textContent = 'Match found — see results below';
        status.style.color = 'var(--gold-light)';
        show(results);
        results.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 1600);
    }

    dropzone.addEventListener('click', function () { input.click(); });
    input.addEventListener('change', function (e) {
      if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
    });

    // Drag & drop onto the uploader.
    var uploader = dropzone.parentNode;
    ['dragover', 'drop'].forEach(function (evt) {
      uploader.addEventListener(evt, function (e) { e.preventDefault(); });
    });
    uploader.addEventListener('drop', function (e) {
      if (e.dataTransfer && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    });

    if (retry) retry.addEventListener('click', function () { input.click(); });
    if (clear) {
      clear.addEventListener('click', function () {
        input.value = '';
        if (objectUrl) { URL.revokeObjectURL(objectUrl); objectUrl = null; }
        hide(preview);
        show(dropzone);
        show(steps);
        hide(results);
        status.style.color = '';
      });
    }

    if (moreBtn) {
      moreBtn.addEventListener('click', function () {
        var extras = document.querySelectorAll('.coin-extra');
        extras.forEach(function (el) { el.classList.remove('hidden'); });
        moreBtn.parentNode.removeChild(moreBtn);
      });
    }
  }

  /* ---- Forum live search ---- */
  function setupForumSearch() {
    var search = document.getElementById('forum-search');
    if (!search) return;
    var boards = Array.prototype.slice.call(document.querySelectorAll('.forum-board'));
    var sections = Array.prototype.slice.call(document.querySelectorAll('.board-section'));
    var empty = document.getElementById('forum-empty');

    search.addEventListener('input', function () {
      var q = search.value.trim().toLowerCase();
      var anyVisible = false;

      boards.forEach(function (board) {
        var match = !q || board.getAttribute('data-name').indexOf(q) !== -1;
        board.style.display = match ? '' : 'none';
        if (match) anyVisible = true;
      });

      // Hide sections whose boards are all filtered out.
      sections.forEach(function (section) {
        var visible = section.querySelectorAll('.forum-board:not([style*="display: none"])');
        section.style.display = visible.length ? '' : 'none';
      });

      if (empty) {
        if (anyVisible) {
          empty.classList.add('hidden');
        } else {
          empty.textContent = 'No boards match “' + search.value + '”.';
          empty.classList.remove('hidden');
        }
      }
    });
  }
})();
