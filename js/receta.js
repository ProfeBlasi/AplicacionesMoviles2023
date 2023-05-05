// se utiliza para cargar primero el documento html y despues la api
document.addEventListener('DOMContentLoaded', () => {
	
	
});


// recuperamos el querystring
const querystring = window.location.search;
//console.log(querystring) // '?s=Big%20Mac'

// usando el querystring, creamos un objeto del tipo URLSearchParams
const params = new URLSearchParams(querystring);

// recuperamos el valor del parámetro "i"
const query = params.hash('i'); // "Big Mac"
//const query = params.get('i'); // "Big Mac"




