document.addEventListener("DOMContentLoaded", function () {
    // Define available options for each layer
    const layerOptions = {
        background: ["bg1.png", "bg2.png", "bg3.png"], // Add your background images here
        miguel: ["miguel1.png", "miguel2.png"],       // Add your miguel images here
        title: ["title1.png", "title2.png"],          // Add your title images here
        lv: ["lv1.png", "lv2.png"],                  // Add your lv images here
        shirt: ["shirt1.png", "shirt2.png"]           // Add your shirt images here
    };

    // Function to populate dropdowns
    function populateDropdowns() {
        for (const [layer, options] of Object.entries(layerOptions)) {
            const selectElement = document.getElementById(`${layer}Select`);
            options.forEach(option => {
                const opt = document.createElement("option");
                opt.value = option;
                opt.textContent = option;
                selectElement.appendChild(opt);
            });
            // Set event listener for change
            selectElement.addEventListener("change", () => updateLayer(layer, selectElement.value));
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
