const API_URL = "https://script.google.com/macros/s/AKfycbyiWpRPO7c0vqWlJvjOjtMH8RGkAIav9y3wC-_F1zDscQSnHWBt5uaSbZqhNYmDEMdr/exec";

let semuaData = [];

// Ambil data dari Spreadsheet
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    semuaData = data;
    tampilkanData(semuaData);
  })
  .catch(err => {
    console.error(err);
    document.getElementById("cards").innerHTML =
      "<h3>Data gagal dimuat.</h3>";
  });


// Fungsi menampilkan card
function tampilkanData(data) {

  let html = "";

  data.forEach(kua => {

    html += `
      <div class="card">

        <img src="${kua.foto}" alt="${kua.nama}">

        <div class="card-body">

          <span class="status ${kua.status === "AKTIF" ? "aktif" : "nonaktif"}">
            ${kua.status}
          </span>

          <h2>${kua.nama}</h2>

          <p><strong>${kua.kepala}</strong></p>

          <p>📍 ${kua.alamat}</p>

          <p>☎️ ${kua.telepon}</p>

          <p>✉️ ${kua.email}</p>

          <div class="button-group">

            <a href="${kua.maps}" target="_blank" class="btn maps">
              Maps
            </a>

            <a href="${kua.link}" target="_blank" class="btn web">
              Website
            </a>

          </div>

        </div>

      </div>
    `;
  });

  document.getElementById("cards").innerHTML = html;

}


// ==========================
// FITUR SEARCH
// ==========================

document.getElementById("search").addEventListener("keyup", function () {

  const keyword = this.value.toLowerCase();

  const hasil = semuaData.filter(kua =>

    kua.nama.toLowerCase().includes(keyword) ||

    kua.alamat.toLowerCase().includes(keyword) ||

    kua.kepala.toLowerCase().includes(keyword)

  );

  tampilkanData(hasil);

});
