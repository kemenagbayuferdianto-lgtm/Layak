const API_URL = "URL_APPS_SCRIPT_ANDA";

fetch(API_URL)
.then(res=>res.json())
.then(data=>{

    let html="";

    data.forEach(kua=>{

        html+=`

        <div class="card">

            <img src="${kua.foto}" alt="${kua.nama}">

            <div class="card-body">

                <span class="status ${kua.status=='AKTIF'?'aktif':'nonaktif'}">

                    ${kua.status}

                </span>

                <h2>${kua.nama}</h2>

                <p><strong>Kepala KUA</strong><br>${kua.kepala}</p>

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

    document.getElementById("cards").innerHTML=html;

});
