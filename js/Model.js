let numberWeeks = 4;
let rgbArray = [];
let targetBlank = "_blank"


let textArray1 =
    ["Introduksjon tekst",
        "Enkle knapper",
        "Første GetAcademy time",
        "Min første HTML",
        "Min første onclick",
        "Funksjon med parameter",
        "Farge lek",
    ];

let hrefArray1 =
    ["https://irobin93.github.io/VSCode/uke1/Introduksjontekst.html",
        "https://irobin93.github.io/VSCode/uke1/SimpleButtons.html",
        "https://irobin93.github.io/VSCode/uke1/førsteGetTime.html",
        "https://irobin93.github.io/VSCode/uke1/MinFørsteHTML.html",
        "https://irobin93.github.io/VSCode/uke1/MinFørsteOnclick.html",
        "https://irobin93.github.io/VSCode/uke1/funksjonMedParameter.html",
        "https://irobin93.github.io/VSCode/uke1/merOmVariabler.html",
    ];


let hrefArray2 = [
    "https://irobin93.github.io/VSCode/uke2/styrker.html",
    "https://irobin93.github.io/VSCode/uke2/andreGetTime.html",
    "https://touraymk.github.io/inventory-game/",
    "https://irobin93.github.io/VSCode/uke2/simpleStopWatch.html",
    "https://irobin93.github.io/VSCode/uke2/trafikkLys.html",
    "https://irobin93.github.io/VSCode/uke2/keyboard.html",
    "https://irobin93.github.io/VSCode/uke2/lysBryter.html",
    "https://irobin93.github.io/VSCode/uke2/krokodilleSpillet.html",
];

let textArray2 = [
    "Mine styrker",
    "Andre Get Time",
    "Team Oppgave 1 - Inventory Game",
    "Stoppeklokke",
    "Trafikklys",
    "Tastatur",
    "Lyspæra og bryteren",
    "Krokodille Spillet",
];

let hrefArray3 = [
    "https://irobin93.github.io/VSCode/uke3/formaterStringen.html",
    "https://irobin93.github.io/VSCode/uke3/adjektivHistorie.html",
    "https://irobin93.github.io/VSCode/uke3/gangeTabellen.html",
    "https://irobin93.github.io/VSCode/uke3/vokalTeller.html",
    "https://irobin93.github.io/VSCode/uke3/reverserStringen.html",
    "https://irobin93.github.io/VSCode/uke3/randomNumberFinder.html",
    "https://irobin93.github.io/VSCode/uke3/shoppingCart.html",
    "https://irobin93.github.io/VSCode/uke3/8Ball.html",
    "https://irobin93.github.io/VSCode/uke3/findEmail.html",
    "https://irobin93.github.io/VSCode/uke3/lightGame.html",
    "https://irobin93.github.io/VSCode/uke3/toDoList.html",
];


let textArray3 = [
    "Formater Stringen",
    "Adjektiv Historien",
    "Gange Tabellen",
    "Tell antall vokaler i teksten",
    "Bakvendt Snakk",
    "To Random Nummere Blir Ett",
    "Shopping Cart",
    "8Ball",
    "Sjekk gyldig Email",
    "The Light Game",
    "To do list",
];

let textArray4 = [
    "Soundboard",
    "Super Mario",
    "Programmers Life - Teamoppgave 2",
    "Code Along 1",
    "Dukke",
    "Chatbot",
    "Guess the Number!",
    "Stein, Saks, Papir",
    "shoppingList2",
    "PokemonCatcher1",
];

let hrefArray4 = [
    "https://irobin93.github.io/VSCode/uke4/soundboard.html",
    "https://irobin93.github.io/VSCode/uke4/superMario.html",
    "https://irobin93.github.io/ProgrammersLife/",
    "https://irobin93.github.io/VSCode/uke4/codeAlong1.html",
    "https://irobin93.github.io/VSCode/uke4/dukke.html",
    "https://irobin93.github.io/VSCode/uke4/chatbot.html",
    "https://irobin93.github.io/VSCode/uke4/guessTheNumber.html",
    "https://irobin93.github.io/VSCode/uke4/steinSaksPapir.html",
    "https://irobin93.github.io/VSCode/uke4/handleListe.html",
    "https://irobin93.github.io/VSCode/uke4/pokemonCatcher1.html",
];
let textArray5 = [
    "Morse oversetting",
];

let hrefArray5 = [
    "https://irobin93.github.io/VSCode/uke5/morseTranslate.html",
];






function pushRgbArray() {
    for (let i = 1; i <= numberWeeks; i = i + 3) {
        rgbArray.push("rgb(163, 192, 201)")
        rgbArray.push("rgb(176, 156, 201)")
        rgbArray.push("rgb(104, 104, 250)")
        rgbArray.push("rgb(144, 104, 250)")

    }
}