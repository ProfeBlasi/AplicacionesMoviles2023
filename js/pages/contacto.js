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
        if (!error) {
            //enviarMailFormsPree();
            enviarMailTo();
            Swal.fire(
                'Felicitaciones',
                'Usted cargo su receta correctamente',
                'success'
            );
            $('#formulario').get(0).reset();
        }
    });
}

const enviarMailFormsPree = async () => {
    const form = document.getElementById('formulario');
    const fd = new FormData(form);
    fd.append('Agradecimiento','Muchas gracias por enviarnos tu receta');
    const response = await fetch('https://formspree.io/f/xnqywwbo', {
        method: 'POST',
        body: fd,
        headers: {
            Accept: 'application/json'
        }
    });

    if (response.ok) {
        console.log('Mensaje enviado');
    } else {
        console.log('Error al enviar el mensaje')
    }

}

const enviarMailTo = () => {
    const form = document.getElementById('formulario');
    const fd = new FormData(form);
    const sendMail = document.getElementById('emailA');
    sendMail.setAttribute(
        'href',
        `mailto:profeblasi@gmail.com?subject=${fd.get('receta')}&body=${fd.get('descripcion')}`);
    sendMail.click();
}