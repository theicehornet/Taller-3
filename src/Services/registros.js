export default async function fetchRegistros(userData ) {
    try {
        const response = await fetch(`https://calcount.develotion.com/registros.php?idUsuario=${userData.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "apikey": userData.apiKey,
                "iduser": userData.id,
            },
        })
        if (!response.ok) {
            throw new Error("Hubo un error al conseguir las comidas")
        }
        const data = await response.json();
        const registros = data.registros;
        return registros;
    } catch (error) {
        throw new Error('Ocurrio un error al conseguir los registros');
    }

}