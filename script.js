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

},

  {
    nama:"KUA Labuan",
    kepala:"Syarif",
    alamat:"Kec. Labuan",
    foto:"assets/labuan.jpg",
    link:"https://sites.google.com/view/kualabuan"
},

{
    nama:"KUA Pandeglang",
    kepala:"Muhammad Yusuf",
    alamat:"Kec. Pandeglang",
    foto:"assets/pandeglang.jpg",
    link:"https://sites.google.com/view/kuapandeglang"
},

{
    nama:"KUA Karangtanjung",
    kepala:"Abdul Rahman",
    alamat:"Kec. Karangtanjung",
    foto:"assets/karangtanjung.jpg",
    link:"https://sites.google.com/view/kuakarangtanjung"
},

{
    nama:"KUA Koroncong",
    kepala:"H. Ridwan",
    alamat:"Kec. Koroncong",
    foto:"assets/koroncong.jpg",
    link:"https://sites.google.com/view/kuakoroncong"
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
