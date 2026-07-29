const data=[

{

nama:"KUA Cadasari",

kepala:"Ahmad Fauzi",

alamat:"Kec. Cadasari",

foto:"assets/cadasari.jpg",

link:"https://sites.google.com/view/kuacadasari"

},

{

nama:"KUA Menes",

kepala:"Abdullah",

alamat:"Kec. Menes",

foto:"assets/menes.jpg",

link:"https://sites.google.com/view/kuamenes"

},

{

nama:"KUA Labuan",

kepala:"Syarif",

alamat:"Kec. Labuan",

foto:"assets/labuan.jpg",

link:"https://sites.google.com/view/kualabuan"

}

];

let html="";

data.forEach(k=>{

html+=`

<div class="card"

onclick="window.open('${k.link}','_blank')">

<img src="${k.foto}">

<div class="info">

<h3>${k.nama}</h3>

<p>👤 ${k.kepala}</p>

<p>📍 ${k.alamat}</p>

<a class="btn">Kunjungi</a>

</div>

</div>

`;

});

document.getElementById("cards").innerHTML=html;
