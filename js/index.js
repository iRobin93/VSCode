function showText(uke){
    
    let variabel = document.getElementById(uke + 'Text').innerHTML
    blankAll();
    if(variabel == "")
        writeUke(uke);
}


function writeUke(uke){
let strHtml;
    switch(uke){
        case "uke1": {
            strHtml = /*html*/ `
            <ul>
                <li>
                    <a href="https://irobin93.github.io/VSCode/Introduksjontekst.html" target="_blank">Introduksjon tekst</a>
                </li>
                <li>
                <a href="https://irobin93.github.io/VSCode/SimpleButtons.html" target="_blank">Enkle knapper</a>
                </li>
                <li>
                <a href="https://irobin93.github.io/VSCode/førsteGetTime.html" target="_blank">Første GetAcademy time</a>
                </li>
                <li>
                <a href="https://irobin93.github.io/VSCode/MinFørsteHTML.html" target="_blank">Min første HTML</a>
                </li>
                <li>
                <a href="https://irobin93.github.io/VSCode/MinFørsteOnclick.html" target="_blank">Min første onclick</a>
                </li>
                <li>
                <a href="https://irobin93.github.io/VSCode/funksjonMedParameter.html" target="_blank">Funksjon med parameter</a>
                </li>
                <li>
                <a href="https://irobin93.github.io/VSCode/merOmVariabler.html" target="_blank">Farge lek</a>
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