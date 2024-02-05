export default function SelectComidas({comidas}) {
    
    return (
        <>
         <select id="comidas" name="idComida">
             <option value='' >Seleccione una comida</option>
             {
                 comidas.map(comida => (<option key={comida.id} value={comida.id}>{comida.nombre}</option>))
             }
         </select>
        </>
    )
}