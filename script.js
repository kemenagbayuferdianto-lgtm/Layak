const API_URL = "https://script.google.com/macros/s/AKfycbyiWpRPO7c0vqWlJvjOjtMH8RGkAIav9y3wC-_F1zDscQSnHWBt5uaSbZqhNYmDEMdr/exec";

let semuaData = [];

// ==========================
// AMBIL DATA
// ==========================
fetch(API_URL)
  .then(response => response.json())
  .then(data => {

    semuaData = data;
    tampilkanData(semuaData);

  })
  .catch(error => {

    console.error(error);

    document.getElementById("cards").innerHTML =
      "<h2 style='text-align:center;color:red'>Data gagal dimuat.</h2>";

  });


// ==========================
// TAMPILKAN CARD
// ==========================

function tampilkanData(data){

  let html = "";

  data.forEach(kua => {

    html += `

    <div class="card"
         onclick="bukaWebsite('${kua.link}')">

      <img src="${kua.foto}" alt="${kua.nama}">

      <div class="card-body">

        <span class="status ${kua.status === "AKTIF" ? "aktif" : "nonaktif"}">
          ${kua.status}
        </span>

        <h2>${kua.nama}</h2>

        <p><strong>${kua.kepala}</strong></p>

        <p>📍 ${kua.alamat}</p>

        <p>☎ ${kua.telepon}</p>

        <p>✉ ${kua.email}</p>

        <a href="${kua.maps}"
           target="_blank"
           class="maps-icon"
           title="Buka di Maps"
           onclick="event.stopPropagation();">
           📍
        </a>

        <span class="card-arrow">→</span>

      </div>

    </div>

    `;

  });

  document.getElementById("cards").innerHTML = html;

}


// ==========================
// FITUR PENCARIAN
// ==========================

document.getElementById("search").addEventListener("keyup", function(){

  const keyword = this.value.toLowerCase();

  const hasil = semuaData.filter(kua =>

      kua.nama.toLowerCase().includes(keyword) ||

      kua.alamat.toLowerCase().includes(keyword) ||

      kua.kepala.toLowerCase().includes(keyword)

  );

  tampilkanData(hasil);

});
