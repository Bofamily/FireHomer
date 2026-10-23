const DEFAULT_HOMEPAGE = "https://www.google.com";

browser.storage.local.get(["homepage", "embedHomepage"]).then((data) => {
  const homepage = data.homepage || DEFAULT_HOMEPAGE;
  const openHomepage = document.getElementById("open-homepage");

  try {
    const url = new URL(homepage);

    if (url.protocol !== "https:" &&
        url.protocol !== "http:") {
      throw new Error("Invalid URL protocol");
    }

    openHomepage.href = url.href;

    if (data.embedHomepage === false) {
      window.location.replace(url.href);
      return;
    }

    const frame = document.getElementById("homepage");
    frame.src = url.href;
    frame.hidden = false;
  } catch {
    if (data.embedHomepage === false) {
      window.location.replace(DEFAULT_HOMEPAGE);
      return;
    }

    const frame = document.getElementById("homepage");
    frame.src = DEFAULT_HOMEPAGE;
    frame.hidden = false;
  }
});