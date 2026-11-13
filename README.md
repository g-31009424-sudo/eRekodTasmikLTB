# eRekodTasmikLTB

Sistem perekodan Tasmik SJKC Li Tek B.

**[Buka Rekod Tasmik](https://g-31009424-sudo.github.io/eRekodTasmikLTB/)** · **[Semak Sambungan](https://g-31009424-sudo.github.io/eRekodTasmikLTB/docs/sambungan.html)**

## Sambungan GitHub

Repositori ini mengandungi paparan web sahaja. Halaman utama membawa pengguna ke `docs/`, yang menyediakan aplikasi penuh melalui GitHub Pages. Data masih dikendalikan oleh projek Google Apps Script asal.

URL web app dalam `docs/config.js` ialah endpoint aplikasi yang dikongsi oleh pemilik untuk digunakan guru. Ia bukan PIN atau token akses. Tiada ID spreadsheet, rekod murid, PIN, token sesi atau kod pelayan dimasukkan dalam repositori awam ini.

Paparan menggunakan HTTP POST dengan `credentials: omit` untuk mengelakkan penghantaran kuki akaun Google guru. Akses rekod penuh dan fungsi pengisian memerlukan sesi PIN yang sah, disahkan pada pelayan. Kegagalan tindakan tulis tidak diulang secara automatik; semak rekod melalui Sync sebelum menghantar semula.

Dashboard awam asal dikekalkan. PIN melindungi fungsi guru, bukan kandungan dashboard awam yang telah disediakan oleh aplikasi asal.

## Ikon dan Skrin Utama

Ikon eRekTas menggunakan al-Quran terbuka dan tanda semak dengan tema hijau. Fail PNG dan favicon berada dalam `docs/icons/`; manifest Android berada dalam `docs/manifest.webmanifest` dan ikon iPhone/iPad ditetapkan melalui `apple-touch-icon`. Ikon turut dipaparkan pada header, borang PIN dan Bantuan / Kongsi. Logo sekolah kekal dipaparkan bersama ikon aplikasi.

- Android: Chrome → menu ⋮ → Tambah ke Skrin Utama / Pasang.
- iPhone/iPad: Safari → Kongsi → Tambah ke Skrin Utama.
- Panduan dan butang pemasangan (apabila disediakan pelayar) berada dalam **Bantuan / Kongsi**. Pintasan lama mungkin perlu dibuang dan ditambah semula untuk memaparkan ikon baharu.

Pemasangan hanya menambah akses aplikasi dari Skrin Utama. Aplikasi masih memerlukan internet untuk membaca atau menyimpan data. Tiada cache data atau token guru ditambah.

## Kemas kini paparan

1. Edit paparan dalam `docs/` dan jalankan `npm test`.
2. Commit perubahan ke branch `main`. Kekalkan tetapan Pages sedia ada daripada akar repositori.
3. Uji halaman Semak Sambungan dan pengisian terkawal selepas penerbitan.

Kod pelayan diurus berasingan dalam Apps Script. Perubahan pada repositori ini tidak mengemas kini kod pelayan secara automatik.

## Semakan

```sh
npm test
```

Lihat `VERIFIKASI.md` untuk hasil semakan penerbitan yang telah diselesaikan. Ujian setempat menggunakan mock; pengesahan pelayar sebenar dicatat secara berasingan.

