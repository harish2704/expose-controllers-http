
var path = require('path');
var fs = require('fs');
var ejs = require('ejs');


var ctrlFiles = [].slice.call(process.argv, 2 );


var methodAliases = {
  list: 'get',
  create: 'post',
  update: 'put',
};
[ 'get', 'post', 'put', 'delete', 'patch'].forEach(function(v){ methodAliases[v] = v; });

/* /(list|create|update|get|post|put|delete|patch)(.*)/ */
var actionNameRegex =  new RegExp('(' + Object.keys( methodAliases ).join('|') + ')(.*)' );

	

function getMethods( ctrlPath ){
  var ctrl = require( ctrlPath );
  return Object.keys( ctrl );
}

function parseFnName( actionName, controllerName ){
  var action = actionName.match( actionNameRegex );
  var method = action[1];
  var urlPath = '/' + controllerName +'/'+ action[2].toLowerCase();
  return {
    method: methodAliases[method],
    url: urlPath,
    name: actionName,
  }
}

ctrlFiles = ctrlFiles.map((v) => {
  var name = path.basename( v ).split('.')[0];
  return {
    path: v,
    name: name,
    actions: getMethods( v ).map( function(actionName){ return parseFnName( actionName, name ) })
  };
});

var output = ejs.render( fs.readFileSync( __dirname + '/api-lib.ejs', 'utf-8'), { ctrls: ctrlFiles } );

console.log( output );




