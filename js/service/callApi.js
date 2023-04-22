export const get = (endpoint) => {
    return $.ajax({
        method: "GET",
        url: endpoint
    });
}

export const message = (pon) => {
    return pon + "Boca";
}