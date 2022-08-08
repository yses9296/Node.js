var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathName = url.parse(_url, true).pathname;
    

    if(pathName === '/'){
      if(queryData.id === undefined){

        fs.readdir('./data', function(error, filelist){
          console.log(filelist);

          var title = 'Welcome';
          var description = 'Hello, Node.js';
          
          /*
          var list = `
          <ul>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
          </ul>
          `;
          */
          var list = '<ul>';
          var i = 0;
          while( i < filelist.length ){
            list = list + `<li><a href="/?id=${filelist[i]}"> ${filelist[i]} </li>`
            i++;
          }
          list = list + '</ul>';

          var template = `
            <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="index.html">WEB</a></h1>
              ${list}
              <h2> ${title} </h2>
              <p> ${description} </p>
            </body>
            </html>
          `;
    
          response.writeHead(200);
          response.end(template);
        });
      } //queryData.id if-else
      else {
        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, data){
          var title = queryData.id;
          var description = data;
    
          var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="index.html">WEB</a></h1>
            <ul>
              <li><a href="/?id=HTML">HTML</a></li>
              <li><a href="/?id=CSS">CSS</a></li>
              <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ul>
            <h2>${title}</h2>
            <p>
              ${description}
            </p>
          </body>
          </html>
          `;
    
          response.writeHead(200);
          response.end(template);
    
        });

      }//queryData.id if-else

    } //pathName if-else
    else {

      response.writeHead(404);
      response.end('Not Found');

    } //pathName if-else


    // if(_url == '/'){
    //   title = 'Welcome';
    //   // _url = '/index.html';
    // }
    // if(_url == '/favicon.ico'){
    //   return response.writeHead(404);
    // }
    
    // response.end(fs.readFileSync(__dirname + _url));

 
});
app.listen(3000);