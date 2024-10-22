document.getElementById("notacion").addEventListener("submit", (event) => {
  event.preventDefault(); 

  const input = document.getElementById("entrada").value.trim();

  if (!validarInput(input)) {
    Swal.fire({
      icon: 'error',
      title: 'Entrada inválida',
      text: 'Ingresa una notación polaca válida. No se permiten números negativos.',
    });
    return; 
  }

  try {
    const espacios = input.split(" "); 
    const resultado_Prefija = convertirPrefija(espacios); 
    const resultado = evaluarExpresion(resultado_Prefija); 

    document.getElementById("resultadoFinal").innerHTML = `
      <p><strong>Notación Polaca:</strong> ${input}</p>
      <p><strong>Convertido a Infijo:</strong> ${resultado_Prefija}</p>
      <p><strong>Resultado:</strong> ${resultado}</p>
    `;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message,
    });
  }
});

const validarInput = (input) => {
  const expresion = /^([-+*/]|\d+)(\s+[-+*/]|\s+\d+)*$/;
  const numeros = input.match(/\d+/g); 
  return expresion.test(input) && numeros.every(num => parseInt(num) >= 0);
};

const convertirPrefija = (espacios) => {
  const operadores = new Set(["+", "-", "*", "/"]); 
  let arreglo = []; 

  for (let i = espacios.length - 1; i >= 0; i--) {
    const espacio = espacios[i];

    if (operadores.has(espacio)) {
      if (arreglo.length < 2) { 
        throw new Error("Expresión inválida"); 
      }
      const operando1 = arreglo.pop(); 
      const operando2 = arreglo.pop();
      arreglo.push(`(${operando1} ${espacio} ${operando2})`);
    } else {
      arreglo.push(espacio);
    }
  }

  if (arreglo.length !== 1) { 
    throw new Error("Expresión inválida");
  }

  return arreglo.pop(); 
};

const evaluarExpresion = (infix) => {
  return Function(`return ${infix}`)(); 
};
