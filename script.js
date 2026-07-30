const API_URL = "https://script.google.com/macros/s/AKfycbyiWpRPO7c0vqWlJvjOjtMH8RGkAIav9y3wC-_F1zDscQSnHWBt5uaSbZqhNYmDEMdr/exec";

fetch(API_URL)
.then(res => res.json())
.then(data => {

    console.log(data);

    const cards = document.getElementById("cards");

    cards.innerHTML = "";

    data.forEach(kua => {

        cards.innerHTML += `
        <div class="card">

            <img src="${kua.foto}" alt="${kua.nama}">

            <div class="card-body">

                <span class="status aktif">
                    ${kua.status}
                </span>

                <h2>${kua.nama}</h2>

                <p>${kua.kepala}</p>

                <p>${kua.alamat}</p>

                <p>${kua.telepon}</p>

                <p>${kua.email}</p>

            </div>

        </div>
        `;

    });

})
.catch(err => {

    console.error(err);

});
