document.getElementById("notacion").addEventListener("submit", (e) => {
    e.preventDefault(); 
  
    const input = document.getElementById("entrada").value.trim(); // Obtener el valor ingresado
  
    if (!esValido(input)) {
      Swal.fire({
        icon: 'error',
        title: 'Entrada inválida',
        text: 'Ingresa una notación polaca válida. No se permiten números negativos.',
      });
      return; 
    }
  
    try {
      const tokens = input.split(" "); 
      const resultadoInfix = convertirAPrefija(tokens); 
      const resultado = evaluarInfix(resultadoInfix); 

      document.getElementById("resultadoFinal").innerHTML = `
        <p><strong>Notación Polaca:</strong> ${input}</p>
        <p><strong>Convertido a Infijo:</strong> ${resultadoInfix}</p>
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
  
  const esValido = (input) => {
    const regex = /^([-+*/]|\d+)(\s+[-+*/]|\s+\d+)*$/;
    const numeros = input.match(/\d+/g); 
    return regex.test(input) && numeros.every(num => parseInt(num) >= 0);
  };
  
  const convertirAPrefija = (tokens) => {
    const operadores = new Set(["+", "-", "*", "/"]); 
    let pila = []; 
  
    for (let i = tokens.length - 1; i >= 0; i--) {
      const token = tokens[i];
  
      if (operadores.has(token)) {
        if (pila.length < 2) { 
          throw new Error("Expresión inválida"); 
        }
        const operando1 = pila.pop(); 
        const operando2 = pila.pop();
        pila.push(`(${operando1} ${token} ${operando2})`);
      } else {
        pila.push(token);
      }
    }
  
    if (pila.length !== 1) { 
      throw new Error("Expresión inválida");
    }
  
    return pila.pop(); 
  };
  
  const evaluarInfix = (infix) => {
    return Function(`return ${infix}`)(); 
  };