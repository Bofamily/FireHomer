const input = document.getElementById("homepage");
const form = document.getElementById("settings-form");
const status = document.getElementById("status");

browser.storage.local.get("homepage").then((data) => {
  input.value = data.homepage || "https://www.google.com";
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const url = new URL(input.value.trim());

    if (url.protocol !== "https:" &&
        url.protocol !== "http:") {
      throw new Error("Please use an HTTP or HTTPS URL.");
    }

    await browser.storage.local.set({
      homepage: url.href
    });

    status.textContent = "Homepage saved successfully!";
  } catch {
    status.textContent =
      "Please enter a valid website URL starting with https:// or http://.";
  }
});