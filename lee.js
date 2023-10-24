const ArchivoExcel = document.getElementById("excel-ìnput")
var content

let MAC =new Array();

let Primera=0;





function Crear_Tabla(mac){
    console.log(mac)
	let table = document.createElement('table');
	let thead = document.createElement('thead');
	let tbody = document.createElement('tbody');

	table.appendChild(thead);
	table.appendChild(tbody);
	// cuerpo=document.getElementById("TABLE")
	// console.log(cuerpo)
// Adding the entire table to the body tag
	document.getElementById("body").appendChild(table);

	let row_1 = document.createElement('tr');
	let heading_1 = document.createElement('th');
	heading_1.innerHTML = "MAC";

	row_1.appendChild(heading_1);
	
	thead.appendChild(row_1)
	let filas;
	let Col =new Array
	let Valor;
	for (i=1;i<mac.length ; i++){
        console.log(mac.length)
			Valor=mac[i]["MAC1"];
			console.log("valor:"+Valor)
			if(Valor!=null){
				console.log("pasa")
				filas = document.createElement('tr');
				for (j=1;j<2 ; j++){
					

					 Col[j]= document.createElement('td');
					 
					 Col[j].innerHTML = Valor;
					 filas.appendChild(Col[j]);

			
				}
				tbody.appendChild(filas);
			}
	}

}




ArchivoExcel.addEventListener("change",async function leer(){
	Primera=1;
	content = await readXlsxFile(ArchivoExcel.files[0]);
	console.log(content);
	// console.log(content[0][1]);
	// console.log(content.length);
	for(var i=1; i< content.length;i++){
		// console.log(content[i][0]);
		
		MAC[i]={MAC1:content[i][0],
			

		}
		
	}
	console.log(MAC)
	Crear_Tabla(MAC)
    EjecutarAPI()
})



function EjecutarAPI1(){
// Parámetros de la URL
const ip = '10.173.32.9';
const puerto = '8080';
const mac = 'AC3B779B41F0';
const usuario = 'stechs';
const contrasena = 'stechs';

// Codifica las credenciales en Base64
const base64Credenciales = btoa(`${usuario}:${contrasena}`);

const headers = new Headers({
    'Content-Type': 'application/json', // Cambia el tipo de contenido si es necesario
    'Authorization': `Basic ${base64Credenciales}` // Agrega las credenciales codificadas
});

// URL completa con parámetros
const url = `http://${ip}:${puerto}/haas/v1.0/device/rg/${mac}/reset`;

// Datos a enviar en la solicitud POST (si es necesario)
const data = {
    // Coloca aquí los datos que deseas enviar en el cuerpo de la solicitud POST
    // Por ejemplo:
    // key1: 'valor1',
    // key2: 'valor2'
};

// Realiza la solicitud POST
fetch(url, {
    method: 'POST',
    headers: headers,
    // Convierte los datos a JSON si los tienes
    body: JSON.stringify(data),
})
.then(response => {
    if (!response.ok) {
        throw new Error(`La solicitud falló con el estado: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    // Procesa la respuesta de la API aquí
    console.log('Respuesta de la API:', data);
})
.catch(error => {
    console.error('Error al realizar la solicitud POST:', error);
});

}





function EjecutarAPI() {
    // Autenticación
const username = 'stechs';
const password = 'stechs';

// Credenciales en Base64
const credentials = btoa(`${username}:${password}`);

// URL base de la API
// const base_url = 'http://10.173.32.11:8080/haas/v1.0'; // HaaS UAT
const base_url = 'http://10.173.32.9:8080/haas/v1.0'; // HaaS Prod

// Parámetros
// const rg = '84:17:EF:31:77:9C';
// const rg = '8417EF31779C';
const rg = '3093bcc7bd15';
const ip = '10.237.0.189';
// URL completa
const url = `${base_url}/device/rg/${rg}/reset`;

// Parámetros
const params = new URLSearchParams({ ip });

// Headers
const headers = new Headers();
headers.append('Authorization', `Basic ${credentials}`);

// Request POST
fetch(url, {
  method: 'POST',
  headers: headers,
  body: params
})
  .then(response => response.json())
  .then(data => {
    if (data.result === 'success') {
      console.log('El CM se reinició exitosamente.');
    } else {
      console.log('Hubo un problema al reiniciar el CM.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });

    };


    // Ejecuta miFuncion() cada 24 horas (86400000 milisegundos)
    //setInterval(miFuncion, 2000);
    