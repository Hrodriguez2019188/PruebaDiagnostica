const letterContainer = document.getElementById("contenedor-letras");
const optionsContainer = document.getElementById("opciones-contenedor");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("nuevo-juego-contenedor");
const newGameButton = document.getElementById("boton-nuevo-juego");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("texto-resultado");

// Vector con palabras
let options = {
  Jugar: [
    "Hola",
    "Zebra",
    "Puerta",
    "Azul",
    "Perro",
    "Gato",
    "Casa",
    "Escuela",
    "Comida",
    "Sol",
    "Luna",
    "Estrella",
    "Raton",
    "Lapiz",
    "Libro",
    "Cielo",
    "Tierra",
    "Mar",
    "Montana",
    "Flor",
    "Arcoiris",
    "Familia",
    "Amigo",
    "Trabajo",
    "Deporte",
    "Musica",
    "Viaje",
    "Aventura",
    "Historia",
    "Fiesta",
    "Navidad",
    "Verano",
    "Invierno",
    "Primavera",
  ],
};


// Contadores
let winCount = 0;
let count = 0;
let chosenWord = "";

// Función para mostrar las opciones
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Ahorcado</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

// Función para bloquear todos los botones
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  // Deshabilitar todas las opciones
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });
  // Deshabilitar todas las letras
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

// Generador de palabras
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";
  let optionArray = options[optionValue];
  // Elegir una palabra al azar
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();
  // Crear un array de caracteres separados por espacios
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');
  // Mostrar cada elemento como span
  userInputSection.innerHTML = displayItem;
};

// Función inicial (llamada cuando se carga la página/el usuario presiona nuevo juego)
const initializer = () => {
  winCount = 0;
  count = 0;
  // Borrar inicialmente todo el contenido y ocultar letras y botón de nuevo juego
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";
  // Para crear botones de letras
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    // Número a ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    // Manejar el clic en el botón de caracteres
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      // Si el array contiene el valor del botón clicado, reemplazar el guión bajo correspondiente con la letra; de lo contrario, dibujar en el lienzo
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          // Si el carácter en el array es igual al botón clicado
          if (char === button.innerText) {
            // Reemplazar el guión bajo con la letra
            dashes[index].innerText = char;
            // Incrementar el contador de victorias
            winCount += 1;
            // Si winCount es igual a la longitud de la palabra
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>¡Ganaste!</h2><p>La palabra es <span>${chosenWord}</span></p>`;
              // Bloquear todos los botones
              blocker();
            }
          }
        });
      } else {
        // Incrementar el contador de derrotas
        count += 1;
        // Para dibujar al hombre
        drawMan(count);
        // Count==6 porque: cabeza, cuerpo, brazo izquierdo, brazo derecho, pierna izquierda, pierna derecha
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>Perdiste!</h2><p>La palabra era <span>${chosenWord}</span></p>`;
          // Bloquear todos los botones
          blocker();
        }
      }
      // Deshabilitar el botón clicado
      button.disabled = true;
    });
    letterContainer.append(button);
  }
  displayOptions();
  // Llamar a canvasCreator (para borrar el lienzo previo y crear el lienzo inicial)
  let { initialDrawing } = canvasCreator();
  // initialDrawing dibujará el marco
  initialDrawing();
};

// Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;
  // Para dibujar líneas
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };
  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };
  const body = () => {
    drawLine(70, 40, 70, 80);
  };
  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };
  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };
  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };
  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };
  // Marco inicial
  const initialDrawing = () => {

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    // Línea base
    drawLine(10, 130, 130, 130);
    // Línea izquierda
    drawLine(10, 10, 10, 131);
    // Línea superior
    drawLine(10, 10, 70, 10);
    // Línea superior pequeña
    drawLine(70, 10, 70, 20);
  };
  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

// Nuevo juego
newGameButton.addEventListener("click", initializer);
window.onload = initializer;
