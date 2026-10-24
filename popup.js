const input = document.getElementById("homepage");
const embedHomepage = document.getElementById("embed-homepage");
const form = document.getElementById("homepage-form");
const status = document.getElementById("status");

async function loadHomepage() {
  const data = await browser.storage.local.get(["homepage", "embedHomepage"]);
  input.value = data.homepage || "https://www.google.com";
  embedHomepage.checked = data.embedHomepage !== false;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  status.textContent = "";

  try {
    const url = new URL(input.value.trim());

    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error("Use an HTTP or HTTPS URL.");
    }

    await browser.storage.local.set({
      homepage: url.href,
      embedHomepage: embedHomepage.checked
    });

    input.value = url.href;
    status.textContent = "Homepage saved successfully!";
  } catch {
    status.textContent =
      "Please enter a valid website URL.";
  }
});

loadHomepage().catch(() => {
  status.textContent = "Could not load your saved homepage.";
});