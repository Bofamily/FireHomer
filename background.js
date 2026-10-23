browser.webRequest.onHeadersReceived.addListener(
  function (details) {
    let headers = details.responseHeaders.filter(header => {
      let name = header.name.toLowerCase();
      // Completely strip X-Frame-Options
      if (name === 'x-frame-options') {
        return false;
      }
      return true;
    });

    // Modify Content-Security-Policy to strip frame-ancestors restrictions
    headers = headers.map(header => {
      if (header.name.toLowerCase() === 'content-security-policy') {
        // Strip the frame-ancestors rule specifically out of the CSP string
        header.value = header.value.replace(/frame-ancestors\s+[^;]+(;|$)/gi, '');
      }
      return header;
    });

    return { responseHeaders: headers };
  },
  { urls: ["<all_urls>"] },
  ["blocking", "responseHeaders"]
);
