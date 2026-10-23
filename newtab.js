const DEFAULT_HOMEPAGE = "https://www.google.com";

browser.storage.local.get("homepage").then((data) => {
  const homepage = data.homepage || DEFAULT_HOMEPAGE;

  try {
    const url = new URL(homepage);

    if (url.protocol !== "https:" &&
        url.protocol !== "http:") {
      throw new Error("Invalid URL protocol");
    }

    window.location.replace(url.href);
  } catch {
    window.location.replace(DEFAULT_HOMEPAGE);
  }
});