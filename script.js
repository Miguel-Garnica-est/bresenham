/** 
 * Implementación del algoritmo de líneas de Bresenham.
 * @param {number} x0 - Coordenada X inicial.
 * @param {number} y0 - Coordenada Y inicial.
 * @param {number} x1 - Coordenada X final.
 * @param {number} y1 - Coordenada Y final.
 * @param {Function} plot - Función para dibujar el píxel (x, y).
 */
const canvas = document.getElementById("canvas")// canvas
const ctx = canvas.getContext('2d') // canvas con el contexto en 2d
const tabla = document.getElementById("tabulacion")// tabla de coordenadas usadas

function bresenham(x0, y0, x1, y1, plot) {
    // Cálculo de diferenciales y dirección del paso
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        // Dibujar el punto actual
        plot(x0, y0);

        // Condición de finalización
        if (x0 === x1 && y0 === y1) break;

        let e2 = 2 * err;

        // Ajuste en el eje X
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }

        // Ajuste en el eje Y
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}

function ejes() {
    //dibuja linea de y
    ctx.strokeStyle = "green"
    ctx.lineWidth = 2
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 500);
    ctx.stroke();
    //dibuja linea en y cada 50 pixeles y la numera
    for (let i = 0; i <= 10; i++) {
        const y = 500-(i*50);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(5, y);
        ctx.stroke();
        ctx.fillText(i*5, 5, y);
    }
    //dibuja linea de x
    ctx.strokeStyle = "red"
    ctx.lineWidth = 2
    ctx.beginPath();
    ctx.moveTo(0, 500);
    ctx.lineTo(500, 500);
    ctx.stroke();
    //dibuja linea en x cada 50 pixeles y la numera
    for (let i = 0; i <= 10; i++) {
        const x = i*50;
        ctx.beginPath();
        ctx.moveTo(x, 495);
        ctx.lineTo(x, 500);
        ctx.stroke();
        ctx.fillText(i*5, x-7, 493);
    }

}