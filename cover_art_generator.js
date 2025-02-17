console.log("Loading latest version of cover_art_generator.js");

document.addEventListener("DOMContentLoaded", function () {
    const layers = {
        background: ["None", "bg1.png", "bg2.png", "bg3.png", "bg4.png", "bg5.png", "bg6.png", "bg7.png", "bg8.png", "bg9.png", "bg10.png", "bg11.png", "bg12.png", "bg13.png", "bg14.png", "bg15.png", "bg16.png"],
        miguel: ["None", "miguel1.png", "miguel2.png", "miguel3.png", "miguel4.png", "miguel5.png", "miguel6.png", "miguel7.png", "miguel8.png", "miguel9.png", "miguel10.png", "miguel11.png", "miguel12.png", "miguel13.png", "miguel14.png", "miguel15.png"],
        title: ["None", "title1.png", "title2.png", "title3.png"],
        lv: ["None", "lv1.png", "lv2.png"],
        shirt: ["None", "shirt1.png", "shirt2.png"]
    };

   function populateDropdowns() {
    console.log("Populating dropdowns..."); // Debugging check

    Object.keys(layers).forEach(layer => {
        const selectElement = document.getElementById(`${layer}Select`);

        if (!selectElement) {
            console.error(`Dropdown not found for layer: ${layer}`);
            return;
        }

        console.log(`Adding options to: ${layer}`); // Debugging check

        layers[layer].forEach(file => {
            let option = document.createElement("option");
            option.value = file;
            option.textContent = file;
            selectElement.appendChild(option);
        });

        selectElement.addEventListener("change", () => updateLayer(layer, selectElement.value));
    });
}


document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM Loaded - Running populateDropdowns()");
    
    // Ensure the script runs after elements are loaded
    setTimeout(() => {
        populateDropdowns();
    }, 100);
});

    

 function updateLayer(layer, file) {
    const imgElement = document.getElementById(layer);
    if (file === "None") {
        imgElement.style.display = "none";
    } else {
        imgElement.style.display = "block";
        imgElement.src = `assets/${layer}/${file}`;
        imgElement.style.position = "absolute";
        imgElement.style.top = "0px";
        imgElement.style.left = "0px";
        imgElement.style.width = "auto";  // Ensures original width is used
        imgElement.style.height = "auto"; // Ensures original height is used
    }
}


    function drawImage(img, callback) {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = img.src;
    image.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear before drawing
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // Ensures proper scaling
        callback();
    };
}


   setTimeout(() => {
    populateDropdowns();
    document.getElementById("downloadButton").addEventListener("click", downloadImage);
}, 100);

