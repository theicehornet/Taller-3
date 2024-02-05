export default async function fetchPaises() {
    try {
        const response = await fetch("https://calcount.develotion.com/paises.php", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) {
            throw new Error("Hubo un error al conseguir los paises")
        }
        const jsonData = await response.json();
        return jsonData.paises;
    } catch (error) {
        throw new Error('Ocurrio un error al conseguir los paises');
    }

}