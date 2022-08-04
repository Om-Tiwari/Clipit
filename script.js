let myLinks = [];
const inputEl = document.getElementById("input-el");
const saveBtn = document.getElementById("save-btn");
const saveTabBtn = document.getElementById("saveTab-btn");
const deleteBtn = document.getElementById("delete-btn");
const links = document.getElementById("links-list");
const localLeads = JSON.parse(localStorage.getItem("myLinks"));

if (localLeads) {
  myLinks = localLeads;
  renderLinks();
}

saveBtn.addEventListener("click", function () {
  addLinks(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLinks", JSON.stringify(myLinks));
  renderLinks();
});

saveTabBtn.addEventListener("click", function getCurrentTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    addLinks(tabs[0].url);
    localStorage.setItem("myLinks", JSON.stringify(myLinks));
    renderLinks(myLinks);
  });
});

deleteBtn.addEventListener("click", function () {
  myLinks = [];
  localStorage.removeItem("myLinks");
  renderLinks();
});

inputEl.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("save-btn").click();
  }
});

function renderLinks() {
  let listItems = "";
  for (let i = 0; i < myLinks.length; i++) {
    listItems += `
      <li>
          <a href='${myLinks[i]}' target='_blank'>${myLinks[i]}</a>
      </li>
    `;
  }
  links.innerHTML = listItems;
}

function addLinks(url) {
  if (!myLinks.includes(url)) {
    myLinks.push(url);
  } else {
    postMessage("URL already saved!!");
  }
}
