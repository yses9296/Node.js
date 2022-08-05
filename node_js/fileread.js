var fs = require('fs'); //fileSystem

fs.readFile('./sample.txt', 'utf8', function(err, data){
    console.log(data);
});