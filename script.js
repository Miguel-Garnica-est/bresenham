/** 
 * Implementación del algoritmo de líneas de Bresenham.
 * @param {number} x0 - Coordenada X inicial.
 * @param {number} y0 - Coordenada Y inicial.
 * @param {number} x1 - Coordenada X final.
 * @param {number} y1 - Coordenada Y final.
 * @param {Function} plot - Función para dibujar el píxel (x, y).
 */
const canvas = document.getElementById("canvas")// canvas
const ctx = canvas.getContext("2d") // canvas con el contexto en 2d
const tabla = document.getElementById("tabulacion").getElementsByTagName("tbody")[0]// datos de la tabla
const resultado = document.getElementById("resultado")// texto que indica el resultado al intentar dibujar

function bresenham() {
    //consigue las coordenadas
    let x1 = document.getElementsByName("x1")[0].value
    let y1 = document.getElementsByName("y1")[0].value
    let x0 = document.getElementsByName("x0")[0].value
    let y0 = document.getElementsByName("y0")[0].value
    //convierte las coordenadas de string a float
    x1 = parseFloat(x1)
    y1 = parseFloat(y1)
    x0 = parseFloat(x0)
    y0 = parseFloat(y0)
    //limpia el canvas y dibuja los ejes
    ejes(x0,y0,x1,y1)
    if (verificacion(x0, y0, x1, y1)) {
        //termina si las coordenadas son invalidas
        return
    } else {
        //convierte las coordenadas a pixeles y las invierte en y
        x1 = (x1/500)*10
        y1 = ctx.canvas.height - ((y1/500) * 10)
        x0 *= 10
        y0 = 500 - (y0 * 10)
        //numero del paso actual
        let paso = 1
        // Cálculo de diferenciales y dirección del paso
        let dx = Math.abs(x1 - x0);
        let dy = Math.abs(y1 - y0);
        let sx = (x0 < x1) ? 1 : -1;
        let sy = (y0 < y1) ? 1 : -1;
        let err = dx - dy;

        while (true) {
            // Dibujar el punto actual
            plot(x0, y0);
            // crear nueva fila en la tabla con las coordenadas por cada punto
            const fila = tabla.insertRow();
            fila.insertCell(0).textContent = paso
            fila.insertCell(1).textContent = x0 / 10  
            fila.insertCell(2).textContent = (500 - y0) / 10
            paso++

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
}

function ejes() {
    //limpia la tabla
    tablaClear()
    //limpia el canvas
    ctx.clearRect(0, 0, 500, 500)
    
    //dibuja linea en y cada 50 pixeles y la numera
    for (let i = 0; i <= 10; i++) {
        const y = 500 - (i * 50)
        //rejilla gris de fondo
        ctx.strokeStyle = "gray"
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(500, y)
        ctx.stroke()
        //linea de distancia
        ctx.strokeStyle = "green"
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(5, y)
        ctx.stroke()
        //correccion de ubicacion para numero 0 y 50
        if (i == 0) {
            ctx.fillText(i, 5, 493)
        } else {
            if ((i * 5) == 50) {
                ctx.fillText(i * 5, 5, 7);
            } else {
                ctx.fillText(i * 5, 5, y);
            }
        }
        


    }
    
    
    //dibuja linea en x cada 50 pixeles y la numera
    for (let i = 0; i <= 10; i++) {
        const x = i * 50
        //rejilla gris de fondo
        ctx.strokeStyle = "gray"
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, 500)
        ctx.stroke()
        //linea de distancia
        ctx.strokeStyle = "red"
        ctx.beginPath()
        ctx.moveTo(x, 495)
        ctx.lineTo(x, 500)
        ctx.stroke()
        //correccion de ubicacion para numero 50
        if ((i * 5) == 50) {
            ctx.fillText(i * 5, x - 10, 493)
        } else {
            ctx.fillText(i * 5, x - 7, 493)
        }
        

    }
    //dibuja linea de y
    ctx.strokeStyle = "green"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(0, 500)
    ctx.stroke()
    //dibuja linea de x
    ctx.strokeStyle = "red"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, 500)
    ctx.lineTo(500, 500)
    ctx.stroke()

}
function plot(x, y) {
    //dibuja un punto
    ctx.fillStyle = "blue"
    ctx.beginPath()
    ctx.arc(x, y, 1, 0, Math.PI * 2)
    ctx.fill();


}
function tablaClear(){
    //elimina las filas de la tabla
    const tbody = document.querySelector("#tabulacion tbody")
    if (tbody) {
        tbody.innerHTML = ""
    } else {
        console.log("no hay filas")
    }


}
function verificacion(x0, y0, x1, y1) {
    //verifica si esta vacio el cuadro
    if (isNaN(x0) || isNaN(y0) || isNaN(x1) || isNaN(y1)) {
        console.log("Valores invalidos")
        resultado.innerHTML = "❌ Los puntos no son<br>validos"
        return true
    }
    //verifica que este dentro del rango
    if (x0 > 1000 || x0 < 0 || y0 > 1000 || y0 < 0 || x1 > 1000 || x1 < 0 || y1 > 1000 || y1 < 0) {
        console.log("Valores invalidos")
        resultado.innerHTML = "❌ Los puntos no son<br>validos"
        return true

    }
    //devuelve que los valores son validos
    else {
        console.log("Valores validos")
        resultado.innerHTML = "✔️ Los puntos son<br>validos"
        return false
    }

}