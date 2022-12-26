var fs = require('fs');

//readFileSync
/*
    console.log('A');
    var result = fs.readFileSync('./sample.txt', 'utf-8');
    console.log(result);
    console.log('C');

    //result : A B C
*/

//readFile
    console.log('A');
    fs.readFile('./sample.txt', 'utf-8', function(err, result){
        console.log(result);
    });
    console.log('C');
//result : A C B