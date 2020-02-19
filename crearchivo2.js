const http = require('http');
// requiriendo los modulos
const fs = require('fs');

// Modulo para que se lean los archivos de un destino.
const readDir = require('readdir');

// La carpeta que tiene los archivos que queremos
const carpeta = process.argv.slice(2).join(' ').toString();
//console.log(carpeta);

// Colocamos en este archivo el array con los nombres de todos los archivos jpg de la carpeta
const jpgs = readDir.readSync(`${carpeta}`, ['**.jpg']);
const pngs = readDir.readSync(`${carpeta}`, ['**.png']);
const mpcuatros = readDir.readSync(`${carpeta}`, ['**.mp4']);

// Se presenta el primer archivo de la carpeta.
// console.log(jpgs[1]);

// Funcion bucle para que muestre los contenidos con un itireteo
function itiJpgs() {
    let html = '';
    for (i=0; i<jpgs.length; i++) {
        // html += `<figure><img src="${carpeta}/${jpgs[i]}" alt="img" /></figure>`;
        html += `<div class="col-md-4 pb-1 pb-md-2 pt-md-2 eldiv">
            <img class="img-fluid border border-dark laimg" src="${carpeta}/${jpgs[i]}" alt="whocares">
          </div>`;
    }
    return html;
}
function itiMpcuatros() {
    let html = '';
    for (i=0; i<mpcuatros.length; i++) {
        html += `<div class="col-md-4 pb-1 pb-md-2 pt-md-2 eldiv">
            <video controls><source src="${carpeta}/${mpcuatros[i]}" type="video/mp4"></video></div>`;
    }
    return html;
}

function itiPngs() {
    let html = '';
    for (i=0; i<pngs.length; i++) {
        html += `<div class="col-md-4 pb-1 pb-md-2 pt-md-2 eldiv">
        <img class="img-fluid border border-dark laimg" src="${carpeta}/${pngs[i]}" alt="whocares">
            </div>`;
    }
    return html;
}


// Ok. Por Alguna Razon que Desconosco (PARD) desde el localhost no esta permitido leer archivos con direccion estatica o entera ("file:///...") por lo tanto ahora vamos a usar el modulo crear archivo HTML.
// const server = http.createServer(function(req, res) {
//     res.writeHead(200, {"Content-Type": "text/html"});
//     res.write(`<!DOCTYPE html><html><head><meta charset="utf-8" /><title>Disfruta</title></head><body><figure><img src="file:///Users/Home/Desktop/Waas/Felicidad/Coleccion/erin/${cualquiercosa[1]}" alt="img" /></figure</body>`);
//     res.end();
//         });
// server.listen(8080);

fs.writeFile(`${carpeta}.html`, `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Archivo de ${carpeta}</title>
    <!-- Bootstrap -->
    <link href="css/bootstrap-4.0.0.css" rel="stylesheet">
    <link href="css/modal.css" rel="stylesheet">
  </head>
  <body>
    <div class="container">
      <div class="row text-center">
        ${itiJpgs()}
        ${itiMpcuatros()}
        ${itiPngs()}
      </div>
    </div>
  <div id="myModal" class="modal">
    <span class="close">&times;</span>
    <img class="modal-content" id="img01">
  </div>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="js/jquery-3.2.1.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/popper.min.js"></script>
    <script src="js/bootstrap-4.0.0.js"></script>
    <script>

    const lasimgs = document.getElementsByClassName("laimg");
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("img01");

    for(i=0; i<lasimgs.length; i++) {
      const img = document.getElementsByClassName("laimg")[i];
      img.onclick = () => {
        modal.style.display = "block";
        modalImg.src = img.src;
      }
    }

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() { 
      modal.style.display = "none";
    }
    </script>
  </body>
</html></body></html>`,
    function(err){
        if (err) throw err;
        console.log('Todo salió bien.');
    });

// Todo el codigo para el modal no funciona porque el html/dom aun no ha sido creado.


