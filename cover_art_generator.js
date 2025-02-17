document.addEventListener("DOMContentLoaded", function () {
    // Define available options for each layer
    const layers = {
    background: [
        "bg1.png", "bg2.png", "bg3.png", "bg4.png", "bg5.png",
        "bg6.png", "bg7.png", "bg8.png", "bg9.png", "bg10.png",
        "bg11.png", "bg12.png", "bg13.png", "bg14.png", "bg15.png",
        "bg16.png", "bg17.png"
    ],
    miguel: [
        "miguel1.png", "miguel2.png", "miguel3.png", "miguel4.png", "miguel5.png",
        "miguel6.png", "miguel7.png", "miguel8.png", "miguel9.png", "miguel10.png",
        "miguel11.png", "miguel12.png", "miguel13.png", "miguel14.png", "miguel15.png",
        "miguel16.png"
    ],
    title: [
        "title1.png", "title2.png", "title3.png"
    ],
    lv: [
        "lv1.png", "lv2.png"
    ],
    shirt: [
        "shirt1.png", "shirt2.png"
    ]
};

    // Function to populate dropdowns
  function populateDropdowns() {
    Object.keys(layers).forEach(layer => {
        const selectElement = document.getElementById(`${layer}Select`);
        console.log(`Populating ${layer} with options:`, layers[layer]); // Debugging

        layers[layer].forEach(file => {
            let option = document.createElement("option");
            option.value = file;
            option.textContent = file;
            selectElement.appendChild(option);
        });

        selectElement.addEventListener("change", () => updateLayer(layer, selectElement.value));
    });
}

        }
    }

    // Function to update the image layer
    function updateLayer(layer, filename) {
        const imgElement = document.getElementById(layer);
        imgElement.src = `assets/${layer}/${filename}`;
    }

    // Function to download the composed image
    function downloadImage() {
        const canvas = document.createElement("canvas");
        canvas.width = 500;
        canvas.height = 500;
        const ctx = canvas.getContext("2d");

        const images = [];
        let imagesLoaded = 0;

        // Load images
        for (const layer of Object.keys(layerOptions)) {
            const img = new Image();
            img.src = document.getElementById(layer).src;
            img.onload = () => {
                imagesLoaded++;
                if (imagesLoaded === Object.keys(layerOptions).length) {
                    // Draw images in order
                    for (const image of images) {
                        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                    }
                    // Trigger download
                    const link = document.createElement("a");
                    link.download = "custom_cover_art.png";
                    link.href = canvas.toDataURL("image/png");
                    link.click();
                }
            };
            images.push(img);
        }
    }

    // Attach download function to button
    document.getElementById("downloadButton").addEventListener("click", downloadImage);

    // Initialize dropdowns
    populateDropdowns();
});
