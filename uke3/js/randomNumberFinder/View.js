        //View

        function showView() {
            app.innerHTML = /*HTML*/ `
            <button onclick="onClick()">Random number!</button>
            <div> Number generated : ${random1} </div>
            <div> Det tok ${counts} "loops" for å finne nummeret.</div>
    
    `;


        }
