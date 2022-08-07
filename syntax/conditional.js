var args = process.argv;

console.log(args);
console.log('A');
console.log('B');

if( false ){
    console.log('C1');
}
else {
    console.log('C2')
}

console.log('D');

/*
result: 
        [
        'C:\\Program Files\\nodejs\\node.exe',
        'C:\\Users\\yses9\\Desktop\\생활코딩\\Node.js\\syntax\\conditional.js'
        ]
        A
        B
        C2
        D
*/