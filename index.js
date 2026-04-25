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

async function procesarOrden(onCompletado) {
    const resultado = document.getElementById('resultado');
    try {
        const bebida = await prepararPlatillo('Bebida', 2000);
        entregarPlatillo(bebida);

        const pizza = await prepararPlatillo('Pizza', 3000);
        entregarPlatillo(pizza);

        const postre = await prepararPlatillo('Postre', 2000);
        entregarPlatillo(postre);

        console.log('🎉 ¡Orden completa entregada!');
        resultado.innerHTML += '<p class="completo">🎉 ¡Orden completa entregada!</p>';
    } catch (error) {
        console.error('Error al procesar la orden:', error);
        resultado.innerHTML += '<p class="error">❌ No se puede entregar el platillo. Se canceló toda la orden.</p>';
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