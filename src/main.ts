const FILAS = 8;
const COLS = 10;
const LIBRE = 8;
const OCUPADO = 1;

//Tamaño de la sala
function iniciarSala(): number[][] {
  return Array.from({ length: FILAS }, () => Array(COLS).fill(LIBRE));
}

// Pinta el mapa en la consola con una X para los lugares ocupados y una L para los libres, además de numerar filas y columnas para facilitar la lectura
function verSala(sala: number[][]): void {
  let cabecera = "  ";
  for (let c = 1; c <= COLS; c++) {
    cabecera += c + " ";
  }
  console.log(cabecera);

  for (let f = 0; f < FILAS; f++) {
    let filaTexto = `${f + 1} `;
    for (let c = 0; c < COLS; c++) {
      if (sala[f][c] === OCUPADO) {
        filaTexto += "X ";
      } else {
        filaTexto += "L ";
      }
    }
    console.log(filaTexto);
  }
}

// Intenta guardar el lugar y devuelve un mensaje de éxito o error según corresponda
function reservar(sala: number[][], fila: number, col: number): string {
  const f = fila - 1;
  const c = col - 1;
  
  if (sala[f][c] === OCUPADO) {
    return `El asiento de la fila ${fila}, columna ${col} ya está ocupado.`;
  } else {
    sala[f][c] = OCUPADO;
    return `Asiento de la fila ${fila}, columna ${col} reservado.`;
  }
}

// Cuenta y te devuelve cuántos lugares hay libres y cuántos ocupados en total
function contarAsientos(sala: number[][]): { ocupados: number, libres: number } {
  let ocupados = 0;
  let libres = 0;
  
  sala.flat().forEach(asiento => {
    if (asiento === OCUPADO) {
      ocupados++;
    } else {
      libres++;
    }
  });
  
  return { ocupados, libres };
}

// Busca dos asientos pegados en la misma fila y devuelve un mensaje con su ubicación o un aviso de que no hay disponibles  
function buscarJuntos(sala: number[][]): string {
  for (let f = 0; f < FILAS; f++) {
    for (let c = 0; c < COLS - 1; c++) {
      if (sala[f][c] === LIBRE && sala[f][c + 1] === LIBRE) {
        return `Asientos contiguos encontrados: Fila ${f + 1}, lugares ${c + 1} y ${c + 2}.`;
      }
    }
  }
  return "No hay asientos contiguos disponibles en toda la sala.";
}

// ==========================================
// ZONA DE PRUEBAS
// ==========================================

console.log("\n--- ESCENARIO 1: SALA VACÍA ---");
let salaCine = iniciarSala();
verSala(salaCine);
console.log(buscarJuntos(salaCine));
console.log("Estado:", contarAsientos(salaCine));


console.log("\n--- ESCENARIO 2: SALA PARCIALMENTE OCUPADA ---");
console.log(reservar(salaCine, 1, 1));
console.log(reservar(salaCine, 1, 1)); // Intentamos reservar el mismo para que falle
console.log(reservar(salaCine, 4, 5));
console.log(reservar(salaCine, 8, 10));
verSala(salaCine);
console.log("Estado:", contarAsientos(salaCine));


console.log("\n--- ESCENARIO 3: SALA CASI LLENA (Asientos sueltos) ---");
// Llenamos la sala a la fuerza
salaCine = salaCine.map(fila => fila.map(() => OCUPADO));
// Liberamos un par pero separados
salaCine[2][3] = LIBRE;
salaCine[5][7] = LIBRE;
verSala(salaCine);
console.log(buscarJuntos(salaCine));
console.log("Estado:", contarAsientos(salaCine));


console.log("\n--- ESCENARIO 4: SALA COMPLETAMENTE LLENA ---");
// Ocupamos el último lugar que quedaba libre
salaCine = salaCine.map(fila => fila.map(() => OCUPADO));
verSala(salaCine);
console.log(buscarJuntos(salaCine));
console.log(reservar(salaCine, 5, 5)); // Prueba extra de reserva sin lugar
console.log("Estado:", contarAsientos(salaCine));
