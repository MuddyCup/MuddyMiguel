document.addEventListener("DOMContentLoaded", function () {
    const layers = {
        background: ["None", "bg1.png", "bg2.png", "bg3.png", "bg4.png", "bg5.png", "bg6.png", "bg7.png", "bg8.png", "bg9.png", "bg10.png", "bg11.png", "bg12.png", "bg13.png", "bg14.png", "bg15.png", "bg16.png"],
        miguel: ["None", "miguel1.png", "miguel2.png", "miguel3.png", "miguel4.png", "miguel5.png", "miguel6.png", "miguel7.png", "miguel8.png", "miguel9.png", "miguel10.png", "miguel11.png", "miguel12.png", "miguel13.png", "miguel14.png", "miguel15.png", "miguel16.png"],
        title: ["None", "title1.png", "title2.png", "title3.png", "title4.png", "title5.png", "title6.png", "title7.png", "title8.png", "title9.png", "title10.png"],
        lv: ["None", "lv1.png", "lv2.png", "lv3.png", "lv4.png", "lv5.png", "lv6.png", "lv7.png", "lv8.png", "lv9.png", "lv10.png"],
        shirt: ["None", "shirt1.png", "shirt2.png", "shirt3.png", "shirt4.png", "shirt5.png", "shirt6.png", "shirt7.png", "shirt8.png", "shirt9.png", "shirt10.png"]
    };

    function populateDropdowns() {
        console.log("Populating dropdowns..."); // Check if function runs

        Object.keys(layers).forEach(layer => {
            const selectElement = document.getElementById(`${layer}Select`);
            if (!selectElement) {
                console.error(`Dropdown not found for layer: ${layer}`);
                return;
            }
            console.log(`Adding options to: ${layer}`);
            layers[layer].forEach(file => {
                let option = document.createElement("option");
                option.value = file;
                option.textContent = file;
                selectElement.appendChild(option);
            });
            selectElement.addEventListener("change", () => updateLayer(layer, selectElement.value));
        });
    }

    function updateLayer(layer, file) {
        const imgElement = document.getElementById(layer);
        imgElement.src = file === "None" ? "" : `assets/${layer}/${file}`;
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
