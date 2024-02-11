export default function SelectComidas( props) {
    
    return (
        <select id="comidas" name="idComida" onChange={props.onChange}>
             <option value='' >Seleccione una comida</option>
             {
                 props.comidas.map(comida => (<option key={comida.id} value={comida.id}>{comida.nombre}</option>))
             }
         </select>
    )
}