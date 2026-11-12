# Semakan penerbitan

Tarikh: 12 November 2026.

- Paparan penuh diterbitkan ke GitHub Pages dan menggantikan halaman ujian API lama.
- GitHub Pages build and deployment untuk commit aplikasi selesai dengan status success.
- Tujuh semakan setempat paparan dan sambungan HTTP lulus.
- API Apps Script diterbitkan sebagai versi 8 pada deployment sedia ada.
- Kebenaran pelaksanaan dan akses deployment dikekalkan.
- Kod pelayan dan ID spreadsheet tidak diterbitkan ke repositori awam ini.

## Ujian pelayar sebenar

- Pautan utama GitHub membuka aplikasi penuh dalam folder docs.
- Dashboard dan logo sekolah berjaya dimuatkan dari API Apps Script.
- Endpoint semakan sambungan memberi respons yang sah.
- Permintaan rekod penuh tanpa token sesi sah ditolak oleh pelayan.
- Borang PIN guru dipaparkan.
- Permintaan HTTP menggunakan credentials: omit dan respons JSON dapat dibaca dari origin GitHub Pages.

Tiada rekod sekolah ditambah, dipadam atau diubah dalam ujian ini. Pengisian sebenar menggunakan PIN guru, sesi pada peranti guru lain dan iPhone dalam gambar asal belum diuji.

Laman ini mengelakkan halaman HTML Apps Script sebagai pintu masuk utama. Ketersediaan API masih bergantung pada akses deployment, dasar Google Workspace, kuota dan rangkaian.
