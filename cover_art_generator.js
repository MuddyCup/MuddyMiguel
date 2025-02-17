console.log("Loading latest version of cover_art_generator.js");
document.addEventListener("DOMContentLoaded", function () {
    const layers = {
        background: ["None", "bg1.png", "bg2.png", "bg3.png", "bg4.png", "bg5.png", "bg6.png", "bg7.png", "bg8.png", "bg9.png", "bg10.png", "bg11.png", "bg12.png", "bg13.png", "bg14.png", "bg15.png", "bg16.png"],
        miguel: ["None", "miguel1.png", "miguel2.png", "miguel3.png", "miguel4.png", "miguel5.png", "miguel6.png", "miguel7.png", "miguel8.png", "miguel9.png", "miguel10.png", "miguel11.png", "miguel12.png", "miguel13.png", "miguel14.png", "miguel15.png", "miguel16.png"],
        title: ["None", "title1.png", "title2.png", "title3.png", "title4.png", "title5.png", "title6.png", "title7.png", "title8.png", "title9.png", "title10.png"],
        lv: ["None", "lv1.png", "lv2.png", "lv3.png", "lv4.png", "lv5.png", "lv6.png", "lv7.png", "lv8.png", "lv9.png", "lv10.png"],
        shirt: ["None", "shirt1.png", "shirt2.png", "shirt3.png", "shirt4.png", "shirt5.png", "shirt6.png", "shirt7.png", "shirt8.png", "shirt9.png", "shirt10.png"]
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
    populateDropdowns();
});

    

   function updateLayer(layer, file) {
    const imgElement = document.getElementById(layer);

    if (file === "None") {
        imgElement.style.display = "none";
    } else {
        imgElement.style.display = "block";
        imgElement.src = `assets/${layer}/${file}`;
        imgElement.style.position = "absolute";

        // Apply correct dimensions for each layer type
        if (layer === "background") {
            imgElement.style.width = "2000px";
            imgElement.style.height = "2000px";
            imgElement.style.top = "0px";
            imgElement.style.left = "0px";
        } else if (layer === "lv") {
            imgElement.style.width = "181px";
            imgElement.style.height = "170px";
            imgElement.style.top = "50px"; // Adjust this based on your Photoshop file
            imgElement.style.left = "100px"; // Adjust this based on your Photoshop file
        } else if (layer === "miguel") {
            imgElement.style.width = "964px";
            imgElement.style.height = "1939px";
            imgElement.style.top = "30px";
            imgElement.style.left = "500px";
        } else if (layer === "shirt") {
            imgElement.style.width = "600px";
            imgElement.style.height = "817px";
            imgElement.style.top = "1000px";
            imgElement.style.left = "700px";
        } else if (layer === "title") {
            imgElement.style.width = "1182px"; // Default to title1 size
            imgElement.style.height = "426px";
            imgElement.style.top = "100px";
            imgElement.style.left = "300px";

            // Adjust based on specific title file
            if (file.includes("title2")) {
                imgElement.style.height = "556px";
            } else if (file.includes("title3")) {
                imgElement.style.height = "386px";
            }
        }
    }
}


    function downloadImage() {
        const canvas = document.createElement("canvas");
        canvas.width = 2000;
        canvas.height = 2000;
        const ctx = canvas.getContext("2d");
        let imagesLoaded = 0;
        const totalImages = Object.keys(layers).length;

        function drawImage(img, callback) {
            const image = new Image();
            image.crossOrigin = "anonymous";
            image.src = img.src;
            image.onload = () => {
                ctx.drawImage(image, 0, 0, 2000, 2000);
                callback();
            };
        }

        function checkCompletion() {
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                const link = document.createElement("a");
                link.download = "custom_album_cover.png";
                link.href = canvas.toDataURL("image/png");
                link.click();
            }
        }

        Object.keys(layers).forEach(layer => {
            const img = document.getElementById(layer);
            if (img.src && img.src !== window.location.href) {
                drawImage(img, checkCompletion);
            } else {
                imagesLoaded++;
            }
        });
    }

    document.getElementById("downloadButton").addEventListener("click", downloadImage);
    populateDropdowns();
});
