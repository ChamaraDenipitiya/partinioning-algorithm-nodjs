/**
 *
 * @author nilesh.jayanandana
 * @IT14001826
 * DAA Partitioning Algorithm
 */









//node JS requirement for reading a text file
fs = require('fs');




// read text file and split lines into an array
var inputString = fs.readFileSync('bench.txt').toString().split("\r\n");


//print that array

for (a in inputString) {

    console.log(inputString[a]);

}

console.log('---------------- Partitioning -------------------');

//for the purpose of prinitng case number. Otherwise useless :P
var count = 0;


//starting the real process now
for (var i = 0; i < inputString.length;) {


    //print case number at the start
    console.log("\n");
    console.log("------------------ Case : " + (++count) + " ---------------------");
    console.log("\n");



    //the line that contains base numbers m and n
    var root = inputString[i];

    var m = parseInt(inputString[i].split(' ')[0]);
    var n = parseInt(inputString[i].split(' ')[1]);

    console.log("m = " + m);
    console.log("n = " + n);

    // break the loop and exit if n=0 and m=0
    if (m == 0 && n == 0) {

        console.log('------------------ The End ----------------------');
        break;

    }


    //to go to the next line which has the memory partition values
    i++;

    /* 
       store memory partition values after converting to int and then sort asc.
       No need for a for loop as the second line in the set is dedicated for memory partitions.
    */

    var memPart = inputString[i].split(' ').map(Number).sort(function (a, b) {
        return a - b
    });
    console.log("\n");
    console.log("Partitions :");
    console.log(memPart);




    /**
     *
     *Implementing Shortest Job First (SJF) Method
     *
     */


    //validation for n as it was mentioned so in the question

    if (n >= 1 && n <= 50) {


        //iterate through rest of the data set lines which has program data
        var programList = [];

        for (var b = 0; b < n; b++) {

            //to go to next line
            i++;

            //store program data temperorily to sort
            var program = inputString[i].split(' ').map(Number);


            var numOfPairs = program[0];

            /*
             *
             * start sorting for the lowest time hardcode 2 to be the inital time as,
             * it will always be 2 incase of 1 pair
             *
             */

            var timeIndex = 2;


            for (var d = 2; d < program.length; d += 2) {

                if (program[timeIndex] > program[d]) {

                    timeIndex = d;

                }

            }

            //because space occurs right before time in the array
            var spaceIndex = timeIndex - 1;


            //correct lowest time and space values

            var time = parseInt(program[timeIndex]);
            var space = parseInt(program[spaceIndex]);

            //temperily store as json
            var tempJson = {

                time: time,
                space: space

            }

            //save the temp json to array
            programList.push(tempJson);


        }

        //sort programList array

        programList.sort(function (a, b) {
            return a.time - b.time
        });



        console.log("\n");
        console.log("Program List :");
        console.log(programList);
        console.log("\n");



        /*
         *
         * Now starting to assign programs to appropriate memory partitions
         *
         */


        var memLength = memPart.length;

        //new array to store running programs
        var programExec = [];

        for (var j = 0; j < memLength; j++) {

            //store temp JSON with necessary data
            var tmp = {

                    id: j,
                    time: 0,
                    mem: memPart[j],
                    prgm: []
                }
                //store the temp JSON to main array
            programExec.push(tmp);

        }

        //sort the array (This is not really necessary though )
        programExec.sort(function (a, b) {
            return a.mem - b.mem
        });

        console.log("Memory Regions");

        for (var z = 0; z < programExec.length; z++) {

            console.log("Region " + (programExec[z].id + 1) + " => " + programExec[z].mem);


        }
        console.log("\n");
        var turnaround = 0;

        //iterate through program list to assign to memory partitions
        for (var x = 0; x < programList.length; x++) {






            var timeTaken = programList[x].time;
            var memTaken = programList[x].space;


            for (var t = 0; t < programExec.length; t++) {

                //condition to assign programs to mem partitions

                if (programExec[t].mem >= memTaken) {

                    programExec[t].prgm.push(x);
                    var tmpTime = programExec[t].time;
                    programExec[t].time += timeTaken;
                    turnaround += programExec[t].time;

                    console.log("Program " + (x + 1) + " runs in memory region " + (programExec[t].id + 1) + " from " + tmpTime + " to " + programExec[t].time);
                    break;

                }

            }

            //sort memory partion array to always have the lowest time used first 
            programExec.sort(function (a, b) {
                return a.time - b.time
            });


        }
        turnaround = turnaround / programList.length;
        console.log(" \nAverage Turn Around Time : " + turnaround.toFixed(2));

        // console.log(programExec);






        //last increment
        i++;









    }









}