const API_URL = "https://script.google.com/macros/s/AKfycbyiWpRPO7c0vqWlJvjOjtMH8RGkAIav9y3wC-_F1zDscQSnHWBt5uaSbZqhNYmDEMdr/exec";

fetch(API_URL)
.then(res => res.json())
.then(data => {

    console.log(data);

    const cards = document.getElementById("cards");
    console.log(cards); // harus bukan null

    let html = "";

    data.forEach(kua => {

        html += `
        <div class="card">
            <img src="${kua.foto}">
            <div class="card-body">
                <h2>${kua.nama}</h2>
            </div>
        </div>
        `;

    });

    cards.innerHTML = html;

    console.log(cards.innerHTML);

})
.catch(err => console.error(err));
