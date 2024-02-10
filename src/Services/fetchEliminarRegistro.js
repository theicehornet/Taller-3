


export default function eliminarRegistro(userData, registroid){
    fetch("https://calcount.develotion.com//registros.php" + "?idRegistro=" + registroid, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            apikey: userData.apiKey,
            idUser: userData.id
        }
    }).then(data => {
        if (!data.ok) {
            console.log(data)
            Promise.reject("Hubo un problema")
        }
        return data.json()
    }).catch(err => {
        throw new Error("Hubo un error: "+err.message);
    })
}