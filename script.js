const API_URL = "https://script.google.com/macros/s/AKfycbyiWpRPO7c0vqWlJvjOjtMH8RGkAIav9y3wC-_F1zDscQSnHWBt5uaSbZqhNYmDEMdr/exec";

fetch(API_URL)
.then(res => res.json())
.then(data => {

    const cards = document.getElementById("cards");

    console.log("cards =", cards);

    cards.innerHTML = `
        <div style="background:red;color:white;padding:30px;font-size:30px">
            TEST BERHASIL
        </div>
    `;

});
