const input = document.getElementById("tiktokInput");
const button = document.getElementById("downloadBtn");
const result = document.getElementById("resultText");
const statusText = document.getElementById("statusText");
const progressBar = document.getElementById("progressBar");
const loadingScreen = document.getElementById("loadingScreen");
const previewBox = document.getElementById("previewBox");
const quality = document.getElementById("qualitySelect");

// helper status
function setState(text) {
    statusText.innerText = text;
}

// fake API (simulasi backend)
function fakeAPICall(link, quality) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                downloadUrl: "https://example.com/video.mp4",
                title: "TikTok Video",
                quality: quality
            });
        }, 2500);
    });
}

// tombol download
button.addEventListener("click", async function () {

    const link = input.value.trim();
    const q = quality.value;

    // VALIDASI INPUT
    if (!link) {
        setState("Input required");
        result.innerText = "Masukin link dulu 😄";
        return;
    }

    // RESET UI
    button.disabled = true;
    button.innerText = "Processing...";
    loadingScreen.style.display = "flex";
    progressBar.style.width = "0%";

    setState("Connecting to server...");
    result.innerText = "Scanning video...";

    // PREVIEW UPDATE
    previewBox.innerHTML = `
        <div class="thumb"></div>
        <div class="info">
            <b>@tiktok_user</b>
            <p>${q}p • analyzing content</p>
        </div>
    `;

    // PROGRESS ANIMATION
    let progress = 0;

    let interval = setInterval(() => {

        progress += (q === "1080" ? 3 : 6);
        progressBar.style.width = progress + "%";

        if (progress < 30) setState("Fetching data...");
        else if (progress < 70) setState("Processing video...");
        else setState("Finalizing...");

        if (progress >= 100) {
            clearInterval(interval);

            // CALL FAKE API
            fakeAPICall(link, q).then((res) => {

                loadingScreen.style.display = "none";

                setState("Done ✔ Ready");

                result.innerHTML = `
                    Download ready 🔥<br>
                    <a href="${res.downloadUrl}" target="_blank" style="color:white; text-decoration:underline;">
                        Click here to download (${res.quality}p)
                    </a>
                `;

                button.disabled = false;
                button.innerText = "Download Now";

            });

        }

    }, 120);
});