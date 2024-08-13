function showText(uke) {

    let variabel = document.getElementById(uke + 'Text').innerHTML
    blankAll();
    if (variabel == "")
        writeUke(uke);
}


function writeUke(uke) {
    let strHtml;
    switch (uke) {
        case "uke1": {
            strHtml = /*html*/ `
            <ul>
                <li>
                    <a href="https://irobin93.github.io/VSCode/uke1/Introduksjontekst.html" target="_blank">Introduksjon tekst</a>
                </li>
                <li>
                <a href="https://irobin93.github.io/VSCode/uke1/SimpleButtons.html" target="_blank">Enkle knapper</a>
                </li>
                <li>
                <a href="https://irobin93.github.io/VSCode/uke1/førsteGetTime.html" target="_blank">Første GetAcademy time</a>
                </li>
                <li>
                <a href="https://irobin93.github.io/VSCode/uke1/MinFørsteHTML.html" target="_blank">Min første HTML</a>
                </li>
                <li>
                <a href="https://irobin93.github.io/VSCode/uke1/MinFørsteOnclick.html" target="_blank">Min første onclick</a>
                </li>
                <li>
                <a href="https://irobin93.github.io/VSCode/uke1/funksjonMedParameter.html" target="_blank">Funksjon med parameter</a>
                </li>
                <li>
                <a href="https://irobin93.github.io/VSCode/uke1/merOmVariabler.html" target="_blank">Farge lek</a>
                </li>
             </ul> 
            `
            break;
        }
        case "uke2": {
            strHtml = /*html*/ `
                <ul>
                    <li>
                        <a href="https://irobin93.github.io/VSCode/uke2/StrengthProfile.pdf" target="_blank">Mine styrker</a>
                    </li>
                </ul>
            `
            break;
        }

        default:
            break;
    }



    document.getElementById(uke + 'Text').innerHTML = strHtml;
}


function blankAll() {
    let textObject;
    let i = 1;
    while (true) {
        textObject = document.getElementById('uke' + i + 'Text');

        if (textObject != undefined)
            textObject.innerHTML = "";
        else
            break;
        i++;
    }
}