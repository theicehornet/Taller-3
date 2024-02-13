export default function TiempoRestante() {
    const d = new Date();
    var dia = d.getDate();
    var mes = d.getMonth() + 1;
    var anio = d.getFullYear();
    if (mes < 10) {
        mes = `0${mes}`;
    }
    if (dia < 10) {
        dia = `0${dia}`;
    }
    const fechaInicial = new Date(`${anio}-${mes}-${dia}`);
    const fechaFinal = new Date("2024-03-31");
    var diferenciaEnTiempo = fechaFinal.getTime() - fechaInicial.getTime();
    var diasFaltantes = diferenciaEnTiempo / (1000 * 3600 * 24);
    diasFaltantes = Math.ceil(diasFaltantes);
    return (<p>Quedan {diasFaltantes} dias para reiniciar su dieta</p>)
}