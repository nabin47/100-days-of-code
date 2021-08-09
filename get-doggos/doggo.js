const DOG_URL = "https://dog.ceo/api/breeds/image/random";
const doggos = document.querySelector(".doggos");
const loader = document.querySelector(".loader-box");

document.querySelector(".get-doggo").addEventListener("click", addDoggo);

// promise chaining

function addDoggo() {
    loader.style.display = "block";  // show loading animation while asynchronous fetch is going on
    const promise = fetch(DOG_URL);
    promise
        .then(function(response) {
            const processingPromise = response.json();  // then happens after fetch is completed
            return processingPromise;
        })
        .then(function(processedResponse) {
            const img = document.createElement("img");  // this "then" happens after first then is returned
            img.src = processedResponse.message;
            img.alt = "Adorable Doggo";
            img.style.height = "350px";
            img.style.width = "400px";
            loader.style.display = "none";  // hide loading animation before adding new image as a new child
            doggos.appendChild(img);
        })
}