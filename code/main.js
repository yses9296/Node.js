var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title, list, body){
  return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      <a href="/create">Create</a>
      ${body}
    </body>
    </html>
  `;
}

function listTemplate(filelist){
  var list = '<ul>';
  var i = 0;
  while( i < filelist.length ){
    list = list + `<li><a href="/?id=${filelist[i]}"> ${filelist[i]} </a></li>`
    i++;
  }
  list = list + '</ul>';

  return list;
}

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
          
          var list = listTemplate(filelist);

          var template = templateHTML(title, list, `<h2>${title}</h2> <p>${description}</p>`)

          response.writeHead(200);
          response.end(template);
        });
      } //queryData.id if-else
      else {
        fs.readdir('./data', function(error, filelist){
          var list = listTemplate(filelist);

          fs.readFile(`data/${queryData.id}`, 'utf8', function(err, data){
            var title = queryData.id;
            var description = data;
      
            var template = templateHTML(title, list, `<h2>${title}</h2> <p>${description}</p>`)
      
            response.writeHead(200);
            response.end(template);
      
          });
        });

      }//queryData.id if-else

    } //pathName if-else
    else if(pathName === '/create'){
      fs.readdir('./data', function(error, filelist){
        console.log(filelist);

        var title = 'WEB - Create';        
        var list = listTemplate(filelist);
        var body = `
          <h2>${title}</h2>
          <form action="http://localhost:4000/create_process" method="POST">
            <p>
                <input type="text" name="title" placeholder="Title">
            </p>
            <p>
                <textarea name="desc" id="desc" cols="30" rows="5" placeholder="Description"></textarea>
            </p>
            <p>
                <input type="submit" value="Submit">
            </p>
          </form>`;

        var template = templateHTML(title, list, body);

        response.writeHead(200);
        response.end(template);
      });
    } //pathName if-else
    else if(pathName === '/create_process'){
      var body = '';
      request.on('data', function(data){
        body += data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var titpe = post.title;
        var desc = post.desc;
      });
      response.writeHead(200);
      response.end('Succeed');

    } //pathName if-else
    else {

      response.writeHead(404);
      response.end('Not Found');

    } //pathName if-else
 
});


app.listen(4000);