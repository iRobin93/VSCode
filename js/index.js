function showText(uke){
    blankAll();
    writeUke(uke);
}


function writeUke(uke){
let strHtml;
    switch(uke){
        case "uke1": {
            strHtml = /*html*/ `
            <ul>
                <li>
                    <a href="https://irobin93.github.io/VSCode/Introduksjontekst.html" target="_blank">Introduksjontekst.html </a>
                </li>
                <li>
                <a href="https://irobin93.github.io/VSCode/SimpleButtons.html" target="_blank">SimpleButtons.html </a>
                </li>
                <li>
                <a href="https://irobin93.github.io/VSCode/ChangeLogo.html" target="_blank">ChangeLogo.html </a>
                </li>
                <li>
                <a href="https://irobin93.github.io/VSCode/MinFørsteHTML.html" target="_blank">MinFørsteHTML.html </a>
                </li>
                <li>
                <a href="https://irobin93.github.io/VSCode/MinFørsteOnclick.html" target="_blank">MinFørsteOnclick.html </a>
                </li>
                <li>
                <a href="https://irobin93.github.io/VSCode/funksjonMedParameter.html" target="_blank">funksjonMedParameter.html </a>
                </li>
                <li>
                <a href="https://irobin93.github.io/VSCode/merOmVariabler.html" target="_blank">merOmVariabler.html </a>
                </li>
             </ul> ` 
        }
        case "uke2":{
           
        }
       
        default:
            break;
       }



         document.getElementById(uke + 'Text').innerHTML = strHtml;
}


function blankAll(){
    let textObject;
    let i = 1;
    while(true){
      textObject = document.getElementById('uke' + i + 'Text');
   
    if (textObject != undefined)
      textObject.innerHTML = "";
    else 
        break;
    i++;
    }
}