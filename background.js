chrome.contextMenus.create({
  id: "DomainGlass",
  title: "DomainGlass",
  contexts: ["selection"]
});
chrome.contextMenus.create({
  id: "DomainGlasses",
  title: "DomainGlasses",
  contexts: ["page"]
});
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "DomainGlass") {
    const now = new Date();
    const time = now.getTime();
    const date = now.toLocaleDateString();
    const selectedText = time + info.selectionText + date 
    const yup = selectedText.split("").reduce((acc, char) => acc + char.charCodeAt(), 0).toString();
    const x = yup.split("").map(Number);
    const sum = (arr) =>{
        let total = 0;
        for (let i = 0; i < arr.length; i++) {
            total += (arr[i]*arr[i]);
        }
        return (total * (arr.length * arr.length));
    };
    const result = sum(x);
    chrome.tabs.create({ url: `https://domain.glass/${result}.com` });
  }
});
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "DomainGlasses") {
    const selectedTexts = new URL(tab.url).href.replace(/^https?:\/\//, '');
    const archiveUrl = `https://domain.glass/${selectedTexts}`;
    chrome.tabs.create({ url: archiveUrl });
  }
});

