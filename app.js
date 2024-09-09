function crearArbol() {
  const expresion = document
    .getElementById("expresion")
    .value.replace(/\s+/g, ""); // Eliminar espacios
  const circulos = document.querySelectorAll(
    ".circle1, .circle2, .circle3, .circle4, .circle5, .circle6, .circle7"
  );

  //Expresiones regulares para evaluar los tipos de expresiones
  const expresionSimple = /^\d+[\+\-\*\/\%]\d+$/;
  const expresionDoble = /^\(\d+[\+\-\*\/\%]\d+\)[\+\-\*\/\%]\d+$/;
  const expresionParentesis = /^[^\(\)]*(\(\d+[\+\-\*\/\%]\d+\))[^\(\)]*$/;


  // Validar la expresión con paréntesis
  // Match: se utiliza para buscar una coincidencia de una expresión regular en una cadena
  if (
    /^\(\d+[\+\-\*\/\%]\d+\)[\+\-\*\/\%]\(\d+[\+\-\*\/\%]\d+\)$/.test(expresion)
  ) {
    const match = expresion.match(
      /\((\d+)([\+\-\*\/\%])(\d+)\)([\+\-\*\/\%])\((\d+)([\+\-\*\/\%])(\d+)\)/
    );
    const [, num1, op1, num2, opExterno, num3, op2, num4] = match;

    circulos[0].querySelector(".texto").textContent = opExterno;
    circulos[1].querySelector(".texto").textContent = op1;
    circulos[2].querySelector(".texto").textContent = op2;
    circulos[3].querySelector(".texto").textContent = num1;
    circulos[4].querySelector(".texto").textContent = num2;
    circulos[5].querySelector(".texto").textContent = num3;
    circulos[6].querySelector(".texto").textContent = num4;

    // Mostrar los círculos
    circulos.forEach((circulo) => (circulo.style.display = "block"));
    document.querySelector(".circle1 .linea1").style.display = "block";
    document.querySelector(".circle2 .linea2").style.display = "block";
    document.querySelector(".circle3 .linea3").style.display = "block";
    document.querySelector(".circle4 .linea4").style.display = "block";
    document.querySelector(".circle5 .linea5").style.display = "block";
    document.querySelector(".circle6 .linea6").style.display = "block";
    document.querySelector(".circle7 .linea7").style.display = "block";
  } else if (
    expresionDoble.test(expresion) &&
    expresionParentesis.test(expresion)
  ) {
    const match = expresion.match(
      /\((\d+)([\+\-\*\/\%])(\d+)\)([\+\-\*\/\%])(\d+)/
    );
    const [, numero1, operadorInterno, numero2, operadorExterno, numero3] =
      match;

    circulos[0].querySelector(".texto").textContent = operadorExterno;
    circulos[1].querySelector(".texto").textContent = operadorInterno;
    circulos[3].querySelector(".texto").textContent = numero1;
    circulos[4].querySelector(".texto").textContent = numero2;
    circulos[2].querySelector(".texto").textContent = numero3;

    circulos[0].style.display = "block";
    circulos[1].style.display = "block";
    circulos[2].style.display = "block";
    circulos[3].style.display = "block";
    circulos[4].style.display = "block";

    document.querySelector(".circle1 .linea1").style.display = "block";
    document.querySelector(".circle2 .linea2").style.display = "block";
    document.querySelector(".circle4 .linea4").style.display = "block";
    document.querySelector(".circle5 .linea5").style.display = "block";
  } else if (expresionSimple.test(expresion)) {
    const match = expresion.match(/(\d+)([\+\-\*\/\%])(\d+)/);
    const [, numero1, operador, numero2] = match;

    circulos[0].querySelector(".texto").textContent = operador;
    circulos[1].querySelector(".texto").textContent = numero1;
    circulos[2].querySelector(".texto").textContent = numero2;

    circulos[0].style.display = "block";
    circulos[1].style.display = "block";
    circulos[2].style.display = "block";

    document.querySelector(".circle1 .linea1").style.display = "block";
    document.querySelector(".circle2 .linea2").style.display = "block";
  } else if (expresion.includes("(") || expresion.includes(")")) {
    Swal.fire({
      icon: "error",
      title: "Error de sintaxis",
      text: "Por favor, asegúrate de que los paréntesis estén correctamente balanceados.",
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Expresión inválida",
      text: "Por favor ingresa una expresión válida.",
    });
    return;
  }

  document.getElementById("arbol").style.display = "block";
  document.getElementById("arbolCSS").style.display = "block";
  document.getElementById("limpiarBtn").style.display = "inline-block";
}
for (const circulo of circulo) {
  circulo.querySelector(".texto").textContent = "";
  circulo.style.display = "none";
  const lineas = circulo.querySelectorAll(
    ".linea1, .linea2, .linea3, .linea4, .linea5, .linea6, .linea7"
  );
  for (const linea of lineas) {
    linea.style.display = "none";
  }
}
function limpiarArbol() {
  document.getElementById("expresion").value = "";
  document.getElementById("arbol").style.display = "none";
  const circulos = document.querySelectorAll(
    ".circle1, .circle2, .circle3, .circle4, .circle5, .circle6, .circle7"
  );
  circulos.forEach((circulo) => {
    circulo.querySelector(".texto").textContent = "";
    circulo.style.display = "none";
  });
  const lineas = document.querySelectorAll(
    ".linea1, .linea2, .linea3, .linea4, .linea5, .linea6, .linea7"
  );
  lineas.forEach((linea) => {
    linea.style.display = "none";
  });
  document.getElementById("limpiarBtn").style.display = "none";
}
