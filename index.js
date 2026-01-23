function prepararPlatillo(nombrePlatillo, tiempoPreparacion) {
    return new Promise(function(resolver) {
        setTimeout(function() {
            resolver(nombrePlatillo);
        }, tiempoPreparacion);
    });
}

function entregarPlatillo(nombrePlatillo) {
    console.log(`✅ ${nombrePlatillo} entregado`);
    
    const resultado = document.getElementById('resultado');
    resultado.innerHTML += `<p>✅ ${nombrePlatillo} entregado</p>`;
}

async function procesarOrden() {
    try {
        const bebida = await prepararPlatillo('Bebida', 2000);
        entregarPlatillo(bebida);
        
        const pizza = await prepararPlatillo('Pizza', 3000);
        entregarPlatillo(pizza);
        
        const postre = await prepararPlatillo('Postre', 2000);
        entregarPlatillo(postre);
        
        console.log('🎉 ¡Orden completa entregada!');
        const resultado = document.getElementById('resultado');
        resultado.innerHTML += '<p class="completo">🎉 ¡Orden completa entregada!</p>';
        
    } catch(error) {
        console.error('Error al procesar la orden:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const boton = document.getElementById('iniciarBtn');
    
    boton.addEventListener('click', function() {
        document.getElementById('resultado').innerHTML = '';
        
        procesarOrden();
    });
});
