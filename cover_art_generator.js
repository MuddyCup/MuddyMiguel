document.addEventListener("DOMContentLoaded", function () {
    const layers = {
        background: ["bg1.png", "bg2.png"],
        miguel: ["miguel1.png", "miguel2.png"],
        title: ["title1.png", "title2.png"],
        lv: ["lv1.png", "lv2.png"],
        shirt: ["shirt1.png", "shirt2.png"]
    };

    function populateDropdowns() {
        Object.keys(layers).forEach(layer => {
            const selectElement = document.getElementById(`${layer}Select`);
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
        document.getElementById(layer).src = `assets/${layer}/${file}`;
    }

    function downloadImage() {
        const canvas = document.createElement("canvas");
        canvas.width = 500;
        canvas.height = 500;
        const ctx = canvas.getContext("2d");

        let images = [];
        let loadedImages = 0;

        function drawImage(img, callback) {
            const image = new Image();
            image.crossOrigin = "anonymous";
            image.src = img.src;
            image.onload = () => {
                ctx.drawImage(image, 0, 0, 500, 500);
                callback();
            };
        }

        function checkCompletion() {
            loadedImages++;
            if (loadedImages === layers.length) {
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
                loadedImages++;
            }
        });
    }

    document.getElementById("downloadButton").addEventListener("click", downloadImage);
    populateDropdowns();
});
