async function enviarDatos() {
    const nombre = document.getElementById('nombre').value;
    try {
      const resultado = await enviarDatosAlServidor(nombre);
      mensajeAgradecimiento(resultado);
    } catch (e) {
      mensajeError(e);
    }
  }
   
  function enviarDatosAlServidor(nombre) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const exito = nombre.toLowerCase() !== 'error';
        const resultado = exito ? 'Bienvenido al sistema' : 'Acceso denegado';
        exito ? resolve(resultado) : reject(resultado);
      }, 2000);
    });
  }
   
  function mensajeAgradecimiento(mensaje) {
    const mensajeElement = document.getElementById('mensaje');
    mensajeElement.textContent = mensaje;
    mensajeElement.classList.remove('oculto');
  }
   
  function mensajeError(error) {
    const mensajeElement = document.getElementById('mensaje');
    mensajeElement.textContent = error;
    mensajeElement.classList.remove('oculto');
  }