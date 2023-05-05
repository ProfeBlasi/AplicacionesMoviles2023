export const initMap = () => {
    var mapOptions = {
        zoom: 15,
        center: {
            lat: -34.77476,
            lng: -58.26758
        }
    };
    var map = new google.maps.Map(document.getElementById('mapa'), mapOptions);
    new google.maps.Marker({
        position: {
            lat: -34.77476,
            lng: -58.26758
        },
        map: map,
    });
}

export const validarFormulario = () => {
    $(document).on('click', '#enviar', function (event) {
        event.preventDefault();
        var error = false;
        $(".error").text("");
        $("#formulario input[required], #formulario textarea[required]").each(function () {
            if ($(this).val() == "") {
                $(this).next(".error").text("Este campo es obligatorio");
                error = true;
            }
        });
        if(!error){
            Swal.fire(
                'Felicitaciones',
                'Usted cargo su receta correctamente',
                'success'
            );
            $('#formulario').get(0).reset();
        }
    });
}