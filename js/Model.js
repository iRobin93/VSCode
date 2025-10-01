let numberWeeks = 7;
let numberEmner = 4;
let rgbArray = [];
let rgbArrayEmne = [];
let targetBlank = "_blank"
let weeksInEmne1 = [1, 2, 3, 4, 5, 6, 7];
let weeksInEmne2 = [8, 9, 10, 11, 12];
let weeksInEmne3 = [13, 14 ,15, 16];
let weeksInEmne4 = [17];
let comments;
let lastCommentAddedId;
let apiUrl = "https://ukesoversikt.azurewebsites.net/api/Comments"
//let apiUrl = "http://localhost:7105/api/Comments"
const accessToken = 'rmCRjqXjTZy1SSLm_e0gp6X_nvx9Wp0u5HcJZryLJEB6AzFubtt2xQ==';  // Obtain the Bearer token from AAD or OAuth

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
    "Simon Says",
    "Tampen Brenner",
    "Det Norske flagg",
];

let hrefArray5 = [
    "https://irobin93.github.io/VSCode/uke5/morseTranslate.html",
    "https://irobin93.github.io/VSCode/uke5/simonSays.html",
    "https://irobin93.github.io/VSCode/uke5/tampenBrenner.html",
    "https://irobin93.github.io/VSCode/uke5/norskFlagg.html",
];
let textArray6 = [
    "Chess",
    "Teamoppgave 3: Ikke Mujaffas BMW",
];

let hrefArray6 = [
    "https://irobin93.github.io/VSCode/uke6/chess.html",
    "https://irobin93.github.io/ikkeMujaffasBMW/",
];

let textArray7 = [
    "NonoGram",
];

let hrefArray7 = [
    "https://irobin93.github.io/VSCode/uke7/nonoGram.html",
];

let textArray8 = [
    "Ingen ting å se her",
];

let hrefArray8 = [
    "",
];

let textArray9 = [
    "Labyrint",
];

let hrefArray9 = [
    "https://irobin93.github.io/VSCode/uke8/labyrint.html",
];

let textArray10 = [
    "Ingen ting å se her",
];

let hrefArray10 = [
    "",
];

let textArray11 = [
    "Snake",
];

let hrefArray11 = [
    "https://irobin93.github.io/VSCode/uke11/snake.html",
];

let textArray12 = [
    "Strikke Nettbutikk",
];

let hrefArray12 = [
    "https://irobin93.github.io/Strikkebutikk/",
];

let textArray13 = [
    "Test",
];

let hrefArray13 = [
    "StartProgram:Emne3/1of6/NoReturn/NoReturn/bin/Debug/net8.0/NoReturn.exe"
]

let textArray14 = [
    "",
];

let hrefArray14 = [
   "",
]

let textArray15 = [
    "NoReturn",
    "3Variabler",
    "InitializeVariables",
    "ReturnTwoNumbers",
    "IfElseTask1",
    "IsTheNumber30",
    "TwoNumbersSumOrMultiplied",
    "RandomHobby",
    "GetDate",
    "GetDateTwo",
    "ForTask1",
    "ForTask2",
    "ForTask3",
    "CrocodileGame",
    "TekstTukling",
    "ParProgrammering-Pokemon",

];

let hrefArray15 = [
    "StartProgram:Emne3/1of6/NoReturn/NoReturn/bin/Debug/net8.0/NoReturn.exe",
    "StartProgram:Emne3/1of6/3Variabler/3Variabler/bin/Debug/net8.0/3Variabler.exe",
    "StartProgram:Emne3/1of6/InitializeVariables/InitializeVariables/bin/Debug/net8.0/InitializeVariables.exe",
    "StartProgram:Emne3/1of6/ReturnTwoNumbers/ReturnTwoNumbers/bin/Debug/net8.0/ReturnTwoNumbers.exe",
    "StartProgram:Emne3/2of6/IfElseTask1/IfElseTask1/bin/Debug/net8.0/IfElseTask1.exe",
    "StartProgram:Emne3/2of6/IsTheNumber30/bin/Debug/net8.0/IsTheNumber30.exe",
    "StartProgram:Emne3/2of6/TwoNumbersSumOrMultiplied/TwoNumbersSumOrMultiplied/bin/Debug/net8.0/TwoNumbersSumOrMultiplied.exe",
    "StartProgram:Emne3/2of6/RandomHobby/bin/Debug/net8.0/RandomHobby.exe",
    "StartProgram:Emne3/2of6/GetDate/bin/Debug/net8.0/GetDate.exe",
    "StartProgram:Emne3/2of6/GetDateTwo/bin/Debug/net8.0/GetDateTwo.exe",
    "StartProgram:Emne3/2of6/ForTask1/bin/Debug/net8.0/ForTask1.exe",
    "StartProgram:Emne3/2of6/ForTask2/bin/Debug/net8.0/ForTask2.exe",
    "StartProgram:Emne3/2of6/ForTask3/bin/Debug/net8.0/ForTask3.exe",
    "StartProgram:Emne3/2of6/CrocodileGame/bin/Debug/net8.0/CrocodileGame.exe",
    "StartProgram:Emne3/2of6/TekstTukling/bin/Debug/net8.0/TekstTukling.exe",
    "StartProgram:Emne3/3of6/ParProgrammering-Pokemon/bin/Debug/net8.0/ParProgrammering-Pokemon.exe",
]


let textArray16 = [
    "MakeAPokemonClass",
    "NyreTransplantasjon",
    "OverloadsTest",
    "FriendFace",
    "Studentadministrasjonssystem",
    "BossFight",
];

let hrefArray16 = [
   "StartProgram:Emne3/3of6/MakeAPokemonClass/bin/Debug/net8.0/MakeAPokemonClass.exe",
   "StartProgram:Emne3/3of6/NyreTransplantasjon/bin/Debug/net8.0/NyreTransplantasjon.exe",
   "StartProgram:Emne3/3of6/OverloadsTest/bin/Debug/net8.0/OverloadsTest.exe",
   "StartProgram:Emne3/3of6/FriendFace/bin/Debug/net8.0/FriendFace.exe",
   "StartProgram:Emne3/3of6/Studentadministrasjonssystem/bin/Debug/net8.0/Studentadministrasjonssystem.exe",
   "StartProgram:Emne3/3of6/BossFight/bin/Debug/net8.0/BossFight.exe",
]


let textArray17 = [
 "BreakfastCheck",
 "Vue MusicApp",
 "GameReview",
];

let hrefArray17 = [
    "https://irobin93.github.io/BreakfastCheck/",
    "https://irobin93.github.io/Emne4/",
    "https://irobin93.github.io/gamereviewclient/",
];


function pushRgbArray() {
    for (let i = 1; i <= numberWeeks; i = i + 3) {

        rgbArray.push("#FF33A1")
        rgbArray.push("#66B266")
        rgbArray.push("#4DA6FF")
        rgbArray.push("#FF8D00")
        rgbArray.push("#A366FF")
        rgbArray.push("#66D9B2")
        rgbArray.push("#B57A3A")

    }
}
function pushRgbArrayEmne() {
    rgbArrayEmne.push("#FF5733");
    rgbArrayEmne.push("#33FF57");
    rgbArrayEmne.push("#33A1FF");
    rgbArrayEmne.push("#FF33A1");
    rgbArrayEmne.push("#A133FF");
    rgbArrayEmne.push("#FF9133");
}