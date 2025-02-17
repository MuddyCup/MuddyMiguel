console.log("Loading latest version of cover_art_generator.js");

document.addEventListener("DOMContentLoaded", function () {
    const layers = {
        background: ["bg1.png", "bg2.png", "bg3.png", "bg4.png", "bg5.png", "bg6.png", "bg7.png", "bg8.png", "bg9.png", "bg10.png", "bg11.png", "bg12.png", "bg13.png", "bg14.png", "bg15.png", "bg16.png"],
        miguel: ["miguel1.png", "miguel2.png", "miguel3.png", "miguel4.png", "miguel5.png", "miguel6.png", "miguel7.png", "miguel8.png", "miguel9.png", "miguel10.png", "miguel11.png", "miguel12.png", "miguel13.png", "miguel14.png", "miguel15.png"],
        title: ["title1.png", "title2.png", "title3.png"],
        lv: ["None", "lv1.png", "lv2.png"],
        shirt: ["None", "shirt1.png", "shirt2.png"]
    };

    function populateDropdowns() {
        console.log("Populating dropdowns...");
        Object.keys(layers).forEach(layer => {
            const selectElement = document.getElementById(`${layer}Select`);
            if (!selectElement) {
                console.error(`Dropdown not found for layer: ${layer}`);
                return;
            }
            selectElement.innerHTML = ""; // Clear existing options

            layers[layer].forEach(file => {
                let option = document.createElement("option");
                option.value = file;
                option.textContent = file;
                selectElement.appendChild(option);
            });

            selectElement.addEventListener("change", () => updateLayer(layer, selectElement.value));
        });
    }

  function updateCanvas() {
    console.log("Updating canvas with selected images...");

    const canvas = document.getElementById("finalCanvas");
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }
    
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear before redrawing

    const layersToDraw = [
        { id: "background", required: true },
        { id: "miguel", required: true },
        { id: "title", required: true },
        { id: "lv", required: false },
        { id: "shirt", required: false }
    ];

    let loadedImages = 0;
    let totalImages = layersToDraw.length;
    let imageObjects = [];

    function drawAllImages() {
        imageObjects.forEach(img => {
            ctx.drawImage(img, 0, 0, 2000, 2000);
        });
    }

    layersToDraw.forEach(layer => {
        const imgElement = document.getElementById(layer.id);
        if (imgElement && imgElement.src && (layer.required || !imgElement.src.includes("None"))) {
            const image = new Image();
            image.crossOrigin = "anonymous";
            image.src = imgElement.src;
            image.onload = () => {
                imageObjects.push(image);
                loadedImages++;

                if (loadedImages === totalImages) {
                    drawAllImages();
                }
            };
        } else {
            loadedImages++;
            if (loadedImages === totalImages) {
                drawAllImages();
            }
        }
    });
}



function updateLayer(layer, file) {
    const imgElement = document.getElementById(layer);
    if (file === "None") {
        imgElement.style.display = "none";
    } else {
        imgElement.style.display = "block";
        imgElement.src = `assets/${layer}/${file}`;
    }

    // Re-render the canvas every time an image is changed
    updateCanvas();
}

function downloadImage() {
    console.log("Downloading final merged image...");

    const canvas = document.getElementById("finalCanvas");
    const link = document.createElement("a");
    link.download = "custom_album_cover.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}




    function toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
        const isDarkMode = document.body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", isDarkMode);

        const darkModeButton = document.getElementById("darkModeToggle");
        darkModeButton.textContent = isDarkMode ? "Light Mode" : "Dark Mode";

        const buttons = document.querySelectorAll("#shuffleButton, #resetButton");
        buttons.forEach(button => {
            button.style.backgroundColor = isDarkMode ? "#fff" : "#000";
            button.style.color = isDarkMode ? "#000" : "#fff";
        });
    }

    function toggleInfoSection() {
        const infoContent = document.getElementById("infoContent");
        if (infoContent) {
            infoContent.style.display = infoContent.style.display === "none" ? "block" : "none";
        }
    }

    function resetSelections() {
        console.log("Resetting selections...");
        Object.keys(layers).forEach(layer => {
            const selectElement = document.getElementById(`${layer}Select`);
            if (!selectElement) return;
            selectElement.value = "None";
            updateLayer(layer, "None");
        });
    }

    function shuffleSelection() {
        console.log("Shuffling selections...");
        Object.keys(layers).forEach(layer => {
            const selectElement = document.getElementById(`${layer}Select`);
            if (!selectElement) return;
            
            let availableOptions = layers[layer];
            if (layer === "lv" || layer === "shirt") {
                selectElement.value = availableOptions[Math.floor(Math.random() * availableOptions.length)];
            } else {
                selectElement.value = availableOptions[Math.floor(Math.random() * (availableOptions.length - 1)) + 1];
            }
            updateLayer(layer, selectElement.value);
        });
    }

    function detectDevice() {
        const userAgent = navigator.userAgent.toLowerCase();
        return /mobile|android|iphone|ipad|tablet/.test(userAgent) ? "Mobile" : "Desktop";
    }

    function updateDeviceUI() {
        const deviceTypeElement = document.getElementById("deviceType");
        const switchButton = document.getElementById("switchDeviceButton");

        const currentDevice = detectDevice();
        deviceTypeElement.textContent = `Current Device: ${currentDevice}`;
        switchButton.textContent = currentDevice === "Desktop" ? "Switch to Mobile" : "Switch to Desktop";
    }

    function toggleDeviceMode() {
        const deviceTypeElement = document.getElementById("deviceType");
        const switchButton = document.getElementById("switchDeviceButton");

        if (switchButton.textContent.includes("Mobile")) {
            switchButton.textContent = "Switch to Desktop";
            deviceTypeElement.textContent = "Current Device: Mobile";
        } else {
            switchButton.textContent = "Switch to Mobile";
            deviceTypeElement.textContent = "Current Device: Desktop";
        }

        alert("Refreshing the page to simulate a real mode switch.");
        location.reload();
    }

    setTimeout(() => {
        populateDropdowns();
        document.getElementById("downloadButton").addEventListener("click", downloadImage);
        document.getElementById("shuffleButton").addEventListener("click", shuffleSelection);
        document.getElementById("resetButton").addEventListener("click", resetSelections);
        document.getElementById("darkModeToggle").addEventListener("click", toggleDarkMode);
        document.getElementById("infoButton").addEventListener("click", toggleInfoSection);
        document.getElementById("switchDeviceButton").addEventListener("click", toggleDeviceMode);
        updateDeviceUI();
    }, 100);
});
