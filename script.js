const API_URL = "https://script.google.com/macros/s/AKfycbyiWpRPO7c0vqWlJvjOjtMH8RGkAIav9y3wC-_F1zDscQSnHWBt5uaSbZqhNYmDEMdr/exec";

console.log("Script berhasil dijalankan");

fetch(API_URL)
.then(response => {
    console.log("Status:", response.status);
    return response.json();
})
.then(data => {

    console.log("Isi data:", data);
    console.log("Jumlah:", data.length);

    document.getElementById("cards").innerHTML =
        `<h1 style="color:red">DATA = ${data.length}</h1>`;

})
.catch(error => {
    console.error("ERROR :", error);
});
