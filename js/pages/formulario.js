export const createMap = () => {
    console.log("Llegue a esta funcion");
    var mapOptions = {
        zoom: 14,
        center: {
            lat: -34.9224506,
            lng: -57.9559065
        }
    };
    var prueba = document.getElementById('mapa');
    console.log("Esto es prueba " + prueba);
    var map = new google.maps.Map(prueba, mapOptions);
    new google.maps.Marker({
        position: {
            lat: -34.9224506,
            lng: -57.9559065
        },
        map: map,
    });
}
