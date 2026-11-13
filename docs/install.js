// Optional native install prompt; manual Home Screen steps stay available.
(function () {
  'use strict';
  let installPrompt = null;
  const button = document.getElementById('tasmikInstallButton');
  const guide = document.getElementById('tasmikInstallGuide');
  const status = document.getElementById('tasmikInstallStatus');
  const standalone = window.matchMedia('(display-mode: standalone)');
  if (!button || !guide || !status) return;

  function showInstalled() {
    installPrompt = null;
    button.hidden = true;
    guide.hidden = true;
    status.textContent = 'eRekTas telah dipasang. Buka melalui ikon pada Skrin Utama.';
  }
  if (standalone.matches || navigator.standalone === true) showInstalled();
  if (standalone.addEventListener) standalone.addEventListener('change', function (event) {
    if (event.matches) showInstalled();
  });
  window.addEventListener('appinstalled', showInstalled);
  window.addEventListener('beforeinstallprompt', function (event) {
    event.preventDefault();
    installPrompt = event;
    button.hidden = false;
  });
  button.addEventListener('click', async function () {
    if (!installPrompt || button.disabled) return;
    const prompt = installPrompt;
    installPrompt = null;
    button.disabled = true;
    try {
      await prompt.prompt();
      const choice = await prompt.userChoice;
      status.textContent = choice.outcome === 'accepted'
        ? 'Permintaan pemasangan diterima. Ikut arahan pelayar untuk selesai.'
        : 'Pemasangan dibatalkan. Anda masih boleh menambah ikon melalui menu pelayar di atas.';
    } catch (error) {
      status.textContent = 'Gunakan langkah Android atau iPhone di atas untuk menambah ikon.';
    } finally {
      button.disabled = false;
      button.hidden = !installPrompt;
    }
  });
}());
