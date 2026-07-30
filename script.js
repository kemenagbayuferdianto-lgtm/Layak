const API_URL = "https://script.google.com/macros/s/AKfycbyiWpRPO7c0vqWlJvjOjtMH8RGkAIav9y3wC-_F1zDscQSnHWBt5uaSbZqhNYmDEMdr/exec";

let semuaData = [];

// =========================
// Ambil Data Spreadsheet
// =========================

fetch(API_URL)
.then(response => response.json())
.then(data => {

    semuaData = data;

    tampilkanData(semuaData);

    aktifkanPencarian();

})
.catch(err => {

    console.error(err);

    document.getElementById("cards").innerHTML =
    "<h2 style='text-align:center'>Data gagal dimuat.</h2>";

});


// =========================
// Menampilkan Card
// =========================

function tampilkanData(data){

    const cards = document.getElementById("cards");

    if(data.length==0){

        cards.innerHTML=`
        <div style="
            width:100%;
            text-align:center;
            padding:50px;
            font-size:22px;
            color:#777;">
            Data tidak ditemukan
        </div>
        `;

        return;
    }

    let html="";

    data.forEach(kua=>{

        html+=`

        <div class="card">

            <img src="${kua.foto}" alt="${kua.nama}">

            <div class="card-body">

                <span class="status ${kua.status==="AKTIF"?"aktif":"nonaktif"}">
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

    cards.innerHTML=html;

}



// =========================
// Fitur Search
// =========================

function aktifkanPencarian(){

    const input=document.getElementById("search");

    input.addEventListener("input",function(){

        const keyword=this.value.toLowerCase().trim();

        const hasil=semuaData.filter(kua=>{

            return (

                (kua.nama || "").toLowerCase().includes(keyword) ||

                (kua.alamat || "").toLowerCase().includes(keyword) ||

                (kua.kepala || "").toLowerCase().includes(keyword)

            );

        });

        tampilkanData(hasil);

    });

}
