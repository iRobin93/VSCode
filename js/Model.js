let numberWeeks = 3;
let rgbArray = [];
let targetBlank = "_blank"
let textArray1 =
    ["Introduksjon tekst",
        "Enkle knapper",
        "Første GetAcademy time",
        "Min første HTML",
        "Min første onclick",
        "Funksjon med parameter",
        "Farge lek"];

let hrefArray1 =
    ["https://irobin93.github.io/VSCode/uke1/Introduksjontekst.html",
        "https://irobin93.github.io/VSCode/uke1/SimpleButtons.html",
        "https://irobin93.github.io/VSCode/uke1/førsteGetTime.html",
        "https://irobin93.github.io/VSCode/uke1/MinFørsteHTML.html",
        "https://irobin93.github.io/VSCode/uke1/MinFørsteOnclick.html",
        "https://irobin93.github.io/VSCode/uke1/funksjonMedParameter.html",
        "https://irobin93.github.io/VSCode/uke1/merOmVariabler.html"];


let hrefArray2 = [
    "https://irobin93.github.io/VSCode/uke2/styrker.html",
    "https://irobin93.github.io/VSCode/uke2/andreGetTime.html",
    "https://touraymk.github.io/inventory-game/",
    "https://irobin93.github.io/VSCode/uke2/simpleStopWatch.html",
    "https://irobin93.github.io/VSCode/uke2/trafikkLys.html",
    "https://irobin93.github.io/VSCode/uke2/keyboard.html",
    "https://irobin93.github.io/VSCode/uke2/lysBryter.html",
    "https://irobin93.github.io/VSCode/uke2/krokodilleSpillet.html"];

let textArray2 = [
    "Mine styrker",
    "Andre Get Time",
    "Team Oppgave 1 - Inventory Game",
    "Stoppeklokke",
    "Trafikklys",
    "Tastatur",
    "Lyspæra og bryteren",
    "Krokodille Spillet"];

let hrefArray3 = [
    "https://irobin93.github.io/VSCode/uke3/formaterStringen.html",
    "https://irobin93.github.io/VSCode/uke3/adjektivHistorie.html",
    "https://irobin93.github.io/VSCode/uke3/gangeTabellen.html",
    "https://irobin93.github.io/VSCode/uke3/vokalTeller.html",
    "https://irobin93.github.io/VSCode/uke3/reverserStringen.html",
    "https://irobin93.github.io/VSCode/uke3/randomNumberFinder.html",
    "https://irobin93.github.io/VSCode/uke3/8Ball.html"];


let textArray3 = [
    "Formater Stringen",
    "Adjektiv Historien",
    "Gange Tabellen",
    "Tell antall vokaler i teksten",
    "Bakvendt Snakk",
    "To Random Nummere Blir Ett",
    "8Ball"];



function pushRgbArray() {
    for (let i = 1; i <= numberWeeks; i = i + 3) {
        rgbArray.push("rgb(163, 192, 201)")
        rgbArray.push("rgb(176, 176, 201)")
        rgbArray.push("rgb(104, 104, 250)")
    }
}