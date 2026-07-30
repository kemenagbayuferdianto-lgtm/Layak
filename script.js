const API_URL = "https://script.google.com/macros/s/AKfycbyiWpRPO7c0vqWlJvjOjtMH8RGkAIav9y3wC-_F1zDscQSnHWBt5uaSbZqhNYmDEMdr/exec";

fetch(API_URL)
.then(res => {
    console.log("Status:", res.status);
    console.log("Content-Type:", res.headers.get("content-type"));
    return res.text();
})
.then(text => {
    console.log(text);
})
.catch(err => {
    console.error(err);
});
