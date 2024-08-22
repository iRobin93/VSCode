        //Model
        let app = document.getElementById('app');
        let multiplier = 10000;
        let random1;
        let random2;
        let counts = 0;
        //let sameNumber = false;


        /*         function checkNumbers() {
                    while (!sameNumber) {
                        random1 = Math.floor(Math.random() * 10);
                        random2 = Math.floor(Math.random() * 10);
                        if (random1 == random2) {
                            sameNumber = true;
                        }
        
                    } 
        
                }*/


        function checkNumbers2() {
            getRandomNumbers();
            counts = 0;
            while (random1 != random2) {
                getRandomNumbers();
                counts++
            }
        }

        function getRandomNumbers(){
            random1 = Math.floor(Math.random() * multiplier);
            random2 = Math.floor(Math.random() * multiplier);
        }