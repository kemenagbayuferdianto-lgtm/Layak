const SUPABASE_URL = "https://bwmnuzgxnhlhpawrzwmp.supabase.co";
const SUPABASE_KEY = "sb_publishable_92nPJq33RxieAG6T-mj99A_vPUik0D4";
const TABLE_NAME = "Data_KUA";

let semuaData = [];

// ==========================
// PENGATURAN PAGINASI
// ==========================
const ITEMS_PER_PAGE = 6;
let currentData = [];
let currentPage = 1;


// ==========================
// AMBIL DATA
// ==========================
fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}?select=*`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`
    }
  })
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
// TAMPILKAN CARD (mulai dari halaman 1)
// ==========================

function tampilkanData(data){

  currentData = data;
  currentPage = 1;
  renderHalaman();

}


// ==========================
// RENDER KARTU UNTUK HALAMAN AKTIF
// ==========================

function renderHalaman(){

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const dataHalaman = currentData.slice(start, end);

  let html = "";

  if (dataHalaman.length === 0){

    html = "<p class='no-result'>Tidak ada KUA yang ditemukan.</p>";

  } else {

    dataHalaman.forEach(kua => {

      html += `

      <div class="card"
           onclick="location.href='layanan.html?id=${kua.id}'">

        <img src="${kua.foto}" alt="${kua.nama}" loading="lazy" decoding="async">

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

  }

  document.getElementById("cards").innerHTML = html;

  renderPaginasi();

}


// ==========================
// RENDER TOMBOL PAGINASI
// ==========================

function renderPaginasi(){

  const pagination = document.getElementById("pagination");

  if (!pagination) return;

  const totalPages = Math.ceil(currentData.length / ITEMS_PER_PAGE);

  if (totalPages <= 1){

    pagination.innerHTML = "";
    return;

  }

  let html = "";

  html += `<button class="page-btn" onclick="gantiHalaman(${currentPage - 1})" ${currentPage === 1 ? "disabled" : ""}>← Sebelumnya</button>`;

  html += `<span class="page-info">Halaman ${currentPage} dari ${totalPages}</span>`;

  html += `<button class="page-btn" onclick="gantiHalaman(${currentPage + 1})" ${currentPage === totalPages ? "disabled" : ""}>Selanjutnya →</button>`;

  pagination.innerHTML = html;

}


// ==========================
// PINDAH HALAMAN
// ==========================

function gantiHalaman(halamanBaru){

  const totalPages = Math.ceil(currentData.length / ITEMS_PER_PAGE);

  if (halamanBaru < 1 || halamanBaru > totalPages) return;

  currentPage = halamanBaru;
  renderHalaman();

  window.scrollTo({ top: 0, behavior: "smooth" });

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