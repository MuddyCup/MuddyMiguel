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
    populateDropdowns();
});

    

 function updateLayer(layer, file) {
        const imgElement = document.getElementById(layer);
        if (file === "None") {
            imgElement.style.display = "none";
        } else {
            imgElement.style.display = "block";
            imgElement.src = `assets/${layer}/${file}`;
            imgElement.style.width = "2000px";
            imgElement.style.height = "2000px";
            imgElement.style.position = "absolute";
            imgElement.style.top = "50%";
            imgElement.style.left = "50%";
            imgElement.style.transform = "translate(-50%, -50%)";
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
