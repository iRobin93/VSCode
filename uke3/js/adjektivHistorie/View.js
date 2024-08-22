// VIEW
function showView() {

    appObject.innerHTML = /*HTML*/ `
    <div id="StoryId" class="StoryClass">${myText}
    </div>
    <div class="container">
        <div onclick="putText(this.innerHTML, 0)" class="Circle">${adjective}</div>
        <div onclick="putText(this.innerHTML, 0)" class="Circle">${adjective2}</div>
    </div>
    <div class="container">
        <div onclick="putText(this.innerHTML, 1)" class="Circle">${substantive}</div>
        <div onclick="putText(this.innerHTML, 1)" class="Circle">${substantive2}</div>
    </div>
    <div class="container">
        <div onclick="putText(this.innerHTML, 2)" class="Circle row2">${verb}</div>
        <div onclick="putText(this.innerHTML, 2)" class="Circle row2">${verb2}</div>
    </div>
    <div class="container">
        <div onclick="putText(this.innerHTML, 3)" class="Circle row2">${substantive3}</div>
        <div onclick="putText(this.innerHTML, 3)" class="Circle row2">${substantive4}</div>
    </div>
    <div class="container">
        <div onclick="putText(this.innerHTML, 4)" class="Circle row2">${adjective3}</div>
        <div onclick="putText(this.innerHTML, 4)" class="Circle row2">${adjective4}</div>
    </div>
    
    `
}
