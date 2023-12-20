fetch("http://localhost:3000/api/feeds/6582890484bf9e96592b1112", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "Referer": "http://localhost:3000/feeds/edit",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
body: JSON.stringify({
  name: "Slashdot",
  href: "https://rss.slashdot.org/Slashdot/slashdotMain"
}),
  "method": "PATCH"
}).then(response => response.json()).then(data => console.log(data)).catch(err => console.log(err));