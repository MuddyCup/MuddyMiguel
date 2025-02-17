document.addEventListener("DOMContentLoaded", function () {
    const layers = {
        background: ["None", "bg1.png", "bg2.png", "bg3.png"],
        miguel: ["None", "miguel1.png", "miguel2.png"],
        title: ["None", "title1.png", "title2.png"],
        lv: ["None", "lv1.png", "lv2.png"],
        shirt: ["None", "shirt1.png", "shirt2.png"]
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
        const imgElement = document.getElementById(layer);
        if (file === "None") {
            imgElement.src = ""; // Remove the image if 'None' is selected
        } else {
            imgElement.src = `assets/${layer}/${file}`;
        }
    }

    function downloadImage() {
    const canvas = document.createElement("canvas");
    canvas.width = 2000;  // Ensures the correct width
    canvas.height = 2000; // Ensures the correct height
    const ctx = canvas.getContext("2d");

    let imagesLoaded = 0;
    const totalImages = Object.keys(layers).length;

    function drawImage(img, callback) {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.src = img.src;
        image.onload = () => {
            ctx.drawImage(image, 0, 0, 2000, 2000); // Draws image correctly
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
