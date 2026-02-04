const PORCENTAJE_ERROR = 25; // 25% de probabilidad de que falle cada ítem

function prepararPlatillo(nombrePlatillo, tiempoPreparacion) {
    return new Promise(function(resolver, rechazar) {
        setTimeout(function() {
            const fallo = Math.random() * 100 < PORCENTAJE_ERROR;
            if (fallo) {
                rechazar(new Error('No se pudo preparar ' + nombrePlatillo));
            } else {
                resolver(nombrePlatillo);
            }
        }, tiempoPreparacion);
    });
}

function entregarPlatillo(nombrePlatillo) {
    console.log(`✅ ${nombrePlatillo} entregado`);
    const resultado = document.getElementById('resultado');
    resultado.innerHTML += `<p>✅ ${nombrePlatillo} entregado</p>`;
}

function mostrarFallo(nombrePlatillo) {
    console.log(`❌ No se pudo entregar ${nombrePlatillo}`);
    const resultado = document.getElementById('resultado');
    resultado.innerHTML += `<p class="error">❌ No se pudo entregar ${nombrePlatillo}</p>`;
}

async function procesarOrden(onCompletado) {
    const resultado = document.getElementById('resultado');
    const fallos = [];
    try {
        try {
            const bebida = await prepararPlatillo('Bebida', 2000);
            entregarPlatillo(bebida);
        } catch (e) {
            mostrarFallo('Bebida');
            fallos.push('Bebida');
        }
        try {
            const pizza = await prepararPlatillo('Pizza', 3000);
            entregarPlatillo(pizza);
        } catch (e) {
            mostrarFallo('Pizza');
            fallos.push('Pizza');
        }
        try {
            const postre = await prepararPlatillo('Postre', 2000);
            entregarPlatillo(postre);
        } catch (e) {
            mostrarFallo('Postre');
            fallos.push('Postre');
        }
        if (fallos.length === 0) {
            console.log('🎉 ¡Orden completa entregada!');
            resultado.innerHTML += '<p class="completo">🎉 ¡Orden completa entregada!</p>';
        } else {
            console.log('⚠️ Orden entregada con incidencias');
            resultado.innerHTML += '<p class="incidencias">⚠️ Orden con incidencias. No se entregó: ' + fallos.join(', ') + '</p>';
        }
    } catch (error) {
        console.error('Error al procesar la orden:', error);
    } finally {
        if (typeof onCompletado === 'function') {
            onCompletado();
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const boton = document.getElementById('iniciarBtn');
    const estadoOrden = document.getElementById('estadoOrden');
    
    boton.addEventListener('click', function() {
        boton.hidden = true;
        estadoOrden.hidden = false;
        document.getElementById('resultado').innerHTML = '';
        
        procesarOrden(function() {
            estadoOrden.hidden = true;
            boton.hidden = false;
        });
    });
});