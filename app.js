// Función para limpiar el árbol
const limpiarArbol = () => {
  document.getElementById("expression-input").value = ""; // Limpiar el input
  document.getElementById("tree-container").innerHTML = ""; // Limpiar el contenedor del árbol

  // Esconder botones que no se deben mostrar al limpiar
  document.getElementById("preorder-btn").style.display = "none";
  document.getElementById("inorder-btn").style.display = "none";
  document.getElementById("postorder-btn").style.display = "none";
  document.getElementById("limpiarBtn").style.display = "none";
};

// Definir eventos antes de usar las funciones
document.getElementById("generate-btn").addEventListener("click", () => {
  const expression = document.getElementById("expression-input").value;
  
  if (!validarEntrada(expression)) {
    Swal.fire({ icon: "error", title: "Error", text: "Expresión inválida" });
    return;
  }

  const parsedExpression = parseExpression(expression);
  const treeContainer = document.getElementById("tree-container");
  treeContainer.innerHTML = ""; // Limpiar el árbol anterior si existe
  buildTree(parsedExpression, treeContainer); // Construir nuevo árbol

  // Mostrar botones después de generar el árbol
  document.getElementById("preorder-btn").style.display = "inline-block";
  document.getElementById("inorder-btn").style.display = "inline-block";
  document.getElementById("postorder-btn").style.display = "inline-block";
  document.getElementById("limpiarBtn").style.display = "inline-block";
});

document.getElementById("preorder-btn").addEventListener("click", () => {
  const expression = document.getElementById("expression-input").value;
  const parsedExpression = parseExpression(expression);
  Swal.fire("Preorden", preorder(parsedExpression), "success");
});

document.getElementById("inorder-btn").addEventListener("click", () => {
  const expression = document.getElementById("expression-input").value;
  const parsedExpression = parseExpression(expression);
  Swal.fire("Inorder", inorder(parsedExpression), "success");
});

document.getElementById("postorder-btn").addEventListener("click", () => {
  const expression = document.getElementById("expression-input").value;
  const parsedExpression = parseExpression(expression);
  Swal.fire("Postorden", postorder(parsedExpression), "success");
});

document.getElementById("limpiarBtn").addEventListener("click", limpiarArbol);

// Función para construir el árbol
const buildTree = (node, container) => {
  const nodeElement = document.createElement("div");
  nodeElement.classList.add("node");
  nodeElement.textContent = typeof node === "string" ? node : node.operator;
  container.appendChild(nodeElement);

  if (typeof node !== "string") {
    const childContainer = document.createElement("div");
    childContainer.classList.add("child");
    
    buildTree(node.left, childContainer);
    buildTree(node.right, childContainer);
    
    container.appendChild(childContainer);
  }
};

// Funciones de recorrido del árbol
const preorder = (node) => typeof node === "string" ? node + " " : node.operator + " " + preorder(node.left) + preorder(node.right);
const inorder = (node) => typeof node === "string" ? node + " " : inorder(node.left) + node.operator + " " + inorder(node.right);
const postorder = (node) => typeof node === "string" ? node + " " : postorder(node.left) + postorder(node.right) + node.operator + " ";

// Validar la expresión de entrada
const validarEntrada = (expression) => /^[0-9+\-*/\(\)\s]+$/.test(expression);

// Parsear la expresión en un árbol
const parseExpression = (expression) => {
  const operators = ["+", "-", "*", "/"];
  let stack = [], lastOpIndex = -1, lastOp = "";

  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === "(") stack.push(i);
    else if (expression[i] === ")") stack.pop();
    else if (operators.includes(expression[i]) && stack.length === 0) {
      lastOpIndex = i;
      lastOp = expression[i];
    }
  }

  if (lastOpIndex === -1 && expression[0] === "(" && expression[expression.length - 1] === ")")
    return parseExpression(expression.slice(1, -1).trim());

  if (lastOpIndex !== -1) {
    let left = expression.slice(0, lastOpIndex).trim();
    let right = expression.slice(lastOpIndex + 1).trim();
    return { operator: lastOp, left: parseExpression(left), right: parseExpression(right) };
  }
  return expression.trim();
};
