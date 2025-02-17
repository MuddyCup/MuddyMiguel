document.addEventListener("DOMContentLoaded", function () {
    const layers = ["background", "miguel", "title", "lv", "shirt"];
    
    // Function to load available image options from /assets/ folder
    function loadOptions() {
        layers.forEach(layer => {
            const selectElement = document.getElementById(`${layer}Select`);
            fetch(`assets/${layer}/`) // Assumes directory browsing is enabled (may not work on GitHub Pages)
                .then(response => response.text())
                .then(text => {
                    const parser = new DOMParser();
                    const htmlDoc = parser.parseFromString(text, "text/html");
                    const options = Array.from(htmlDoc.querySelectorAll("a"))
                        .map(link => link.href.split("/").pop())
                        .filter(name => name.endsWith(".png"));
                    
                    options.forEach(option => {
                        let opt = document.createElement("option");
                        opt.value = option;
                        opt.innerText = option;
                        selectElement.appendChild(opt);
                    });
                    
                    selectElement.addEventListener("change", () => updateLayer(layer, selectElement.value));
                })
                .catch(error => console.error(`Error loading ${layer} options:`, error));
        });
    }
    
    // Function to update image layers when selection changes
    function updateLayer(layer, file) {
        const imgElement = document.getElementById(layer);
        imgElement.src = `assets/${layer}/${file}`;
    }
    
    // Function to merge layers and download the final image
    function downloadImage() {
        const canvas = document.createElement("canvas");
        canvas.width = 500;
        canvas.height = 500;
        const ctx = canvas.getContext("2d");
        let imagesLoaded = 0;
        let totalImages = layers.length;
        
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
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                const link = document.createElement("a");
                link.download = "custom_album_cover.png";
                link.href = canvas.toDataURL("image/png");
                link.click();
            }
        }
        
        layers.forEach(layer => {
            const img = document.getElementById(layer);
            if (img.src && img.src !== window.location.href) {
                drawImage(img, checkCompletion);
            } else {
                totalImages--;
            }
        });
    }
    
    // Attach the download function to the download button
    document.getElementById("downloadButton").addEventListener("click", downloadImage);
    
    // Load image options on page load
    loadOptions();
});
