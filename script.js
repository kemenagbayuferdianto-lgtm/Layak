const API_URL = "https://script.google.com/macros/s/AKfycbyiWpRPO7c0vqWlJvjOjtMH8RGkAIav9y3wC-_F1zDscQSnHWBt5uaSbZqhNYmDEMdr/exec";

fetch(API_URL)
.then(res => res.json())
.then(data => {

    console.log(data);

    document.getElementById("cards").innerHTML = `
        <div style="
            background:green;
            color:white;
            padding:30px;
            font-size:30px;">
            DATA = ${data.length}
        </div>
    `;

})
.catch(err=>{
    console.log(err);
});
