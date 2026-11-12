(function() {
  'use strict';
  window.tasmikCallHttp = async function(method, args) {
    const apiUrl = window.tasmikPagesConfig && window.tasmikPagesConfig.apiUrl;
    if (!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(apiUrl || '')) {
      throw new Error('Pautan API belum dikonfigurasi dengan betul.');
    }
    let response;
    try {
      response = await fetch(apiUrl, {
        method:'POST',
        // Jangan hantar kuki akaun Google guru. Jenis text/plain mengelakkan
        // preflight akibat Content-Type application/json; respons masih JSON.
        credentials:'omit',
        redirect:'follow',
        headers:{'Content-Type':'text/plain;charset=UTF-8'},
        body:JSON.stringify({version:1, method:method, args:args})
      });
    } catch (e) {
      throw new Error('Sambungan API gagal. Semak rangkaian, akses deployment dan respons silang domain. Permintaan tidak diulang automatik; semak rekod dahulu jika sedang menyimpan.');
    }
    if (!response.ok) throw new Error('Pelayan data memberi ralat HTTP ' + response.status + '. Semak rekod sebelum menghantar semula.');
    let envelope;
    try { envelope = JSON.parse(await response.text()); }
    catch (e) {
      throw new Error('Pelayan belum memberi respons API yang sah. Pastikan Api.gs telah diterbitkan sebagai versi baharu pada deployment /exec yang sama.');
    }
    if (!envelope || envelope.ok !== true) {
      throw new Error(envelope && envelope.error && envelope.error.message || 'Permintaan data tidak berjaya.');
    }
    return envelope.data;
  };
})();
