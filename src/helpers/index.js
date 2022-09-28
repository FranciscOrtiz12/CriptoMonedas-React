//? Genera un id unico en base a la fecha actual
export const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
};

//? Toma la fecha actual y la devuelve en el formato Latino Americano
export const formatearDate = date => {
    const newDate = new Date( date );
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }
    return newDate.toLocaleDateString('es-ES', opciones);
};

//? Toma un valor en numero y lo convierte al CLP
export const cantidadToCLP = (cantidad) => {      
    return cantidad.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      });
};