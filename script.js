const SUPABASE_URL = "https://bwmnuzgxnhlhpawrzwmp.supabase.co";
const SUPABASE_KEY = "sb_publishable_92nPJq33RxieAG6T-mj99A_vPUik0D4";
const TABLE_NAME = "Data_KUA";

let semuaData = [];

// ==========================
// PENGATURAN PAGINASI
// ==========================
const ITEMS_PER_PAGE = 10;
let currentData = [];
let currentPage = 1;

let saringAktif = "semua";
let kataKunci = "";


// ==========================
// IKON
// ==========================

const IKON_PANAH = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>`;

const IKON_ORANG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/></svg>`;

const FOTO_CADANGAN = "assets/logo.png";


// ==========================
// PENGAMAN TEKS
// ==========================

function aman(teks){
  return String(teks === null || teks === undefined ? "" : teks)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}


// ==========================
// AMBIL DATA
// ==========================

fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}?select=*`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`
    }
  })
  .then(response => {
    if (!response.ok) throw new Error("Status " + response.status);
    return response.json();
  })
  .then(data => {
    semuaData = Array.isArray(data) ? data : [];
    saringData();
  })
  .catch(error => {
    console.error(error);
    document.getElementById("cards").innerHTML =
      "<p class='no-result'>Data KUA gagal dimuat. Periksa koneksi internet lalu muat ulang halaman.</p>";
    document.getElementById("jumlahHasil").innerHTML = "";
  });


// ==========================
// SARING BERDASARKAN CHIP + PENCARIAN
// ==========================

function saringData(){

  const cocok = (nilai) =>
    String(nilai || "").toLowerCase().includes(kataKunci);

  const hasil = semuaData.filter(kua => {

    const lolosSaring =
      saringAktif === "semua" ? true :
      saringAktif === "aktif" ? kua.status === "AKTIF" :
      kua.status !== "AKTIF";

    const lolosCari =
      !kataKunci || cocok(kua.nama) || cocok(kua.alamat) || cocok(kua.kepala);

    return lolosSaring && lolosCari;

  });

  currentData = hasil;
  currentPage = 1;
  renderHalaman();

}


// ==========================
// RENDER DAFTAR UNTUK HALAMAN AKTIF
// ==========================

function renderHalaman(){

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const dataHalaman = currentData.slice(start, start + ITEMS_PER_PAGE);

  const info = document.getElementById("jumlahHasil");
  if (info){
    info.innerHTML = currentData.length
      ? `<b>${currentData.length}</b> KUA ditemukan`
      : "";
  }

  let html = "";

  if (dataHalaman.length === 0){

    html = "<p class='no-result'>Tidak ada KUA yang cocok. Coba kata kunci lain.</p>";

  } else {

    dataHalaman.forEach(kua => {

      const nama = aman(kua.nama);
      const foto = kua.foto ? aman(kua.foto) : FOTO_CADANGAN;
      const statusAktif = kua.status === "AKTIF";

      html += `

      <div class="kua-item"
           role="link"
           tabindex="0"
           data-tujuan="layanan.html?id=${aman(kua.id)}"
           aria-label="Buka layanan ${nama}">

        <img class="kua-foto"
             src="${foto}"
             alt=""
             loading="lazy"
             decoding="async"
             onerror="this.onerror=null;this.src='${FOTO_CADANGAN}';this.style.objectFit='contain';this.style.padding='9px';">

        <span class="kua-teks">
          <span class="kua-nama">${nama}</span>
          ${kua.alamat ? `<span class="kua-alamat">${aman(kua.alamat)}</span>` : ""}
          ${kua.kepala ? `<span class="kua-kepala${statusAktif ? "" : " tutup"}">${IKON_ORANG} ${aman(kua.kepala)}</span>` : ""}
        </span>

        <span class="kua-panah">${IKON_PANAH}</span>

      </div>

      `;

    });

  }

  document.getElementById("cards").innerHTML = html;

  pasangKlik();
  renderPaginasi();

}


// ==========================
// BARIS BISA DIKLIK DAN DITEKAN ENTER
// ==========================

function pasangKlik(){

  document.querySelectorAll(".kua-item[data-tujuan]").forEach(baris => {

    baris.addEventListener("click", function(){
      location.href = this.dataset.tujuan;
    });

    baris.addEventListener("keydown", function(e){
      if (e.key === "Enter" || e.key === " "){
        e.preventDefault();
        location.href = this.dataset.tujuan;
      }
    });

  });

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

  html += `<button class="page-btn page-nav" onclick="gantiHalaman(${currentPage - 1})" ${currentPage === 1 ? "disabled" : ""} aria-label="Halaman sebelumnya">&lsaquo;</button>`;

  const dari = Math.max(1, currentPage - 2);
  const sampai = Math.min(totalPages, currentPage + 2);

  if (dari > 1){
    html += `<button class="page-btn page-num" onclick="gantiHalaman(1)">1</button>`;
    if (dari > 2) html += `<span class="page-info">…</span>`;
  }

  for (let i = dari; i <= sampai; i++){
    html += `<button class="page-btn page-num ${i === currentPage ? "active" : ""}" onclick="gantiHalaman(${i})">${i}</button>`;
  }

  if (sampai < totalPages){
    if (sampai < totalPages - 1) html += `<span class="page-info">…</span>`;
    html += `<button class="page-btn page-num" onclick="gantiHalaman(${totalPages})">${totalPages}</button>`;
  }

  html += `<button class="page-btn page-nav" onclick="gantiHalaman(${currentPage + 1})" ${currentPage === totalPages ? "disabled" : ""} aria-label="Halaman selanjutnya">&rsaquo;</button>`;

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

  const daftar = document.querySelector(".container");
  if (daftar){
    const atas = daftar.getBoundingClientRect().top + window.scrollY - 16;
    window.scrollTo({ top: atas < 0 ? 0 : atas, behavior: "smooth" });
  }

}


// ==========================
// PENCARIAN
// ==========================

const kotakCari = document.getElementById("search");

if (kotakCari){
  kotakCari.addEventListener("input", function(){
    kataKunci = this.value.trim().toLowerCase();
    saringData();
  });
}


// ==========================
// CHIP PENYARING
// ==========================

const kotakSaring = document.getElementById("saring");

if (kotakSaring){
  kotakSaring.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", function(){
      kotakSaring.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", "false"));
      this.setAttribute("aria-pressed", "true");
      saringAktif = this.dataset.saring;
      saringData();
    });
  });
}