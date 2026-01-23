# Simulación de Entrega de Órdenes con Promesas

Este proyecto simula el proceso de entrega de órdenes en un restaurante usando Promesas en JavaScript.

## Cómo funciona

1. **Preparación secuencial**: Los platillos se preparan y entregan en orden estricto:
   - Primero: Bebida (2 segundos)
   - Segundo: Pizza (3 segundos)
   - Tercero: Postre (2 segundos)

2. **Uso de Promesas**: Cada platillo se prepara usando una Promesa que simula el tiempo de preparación.

3. **async/await**: Se usa `async/await` para garantizar que cada platillo se complete antes de pasar al siguiente.

## Cómo ejecutar

1. Abre el archivo `index.html` en tu navegador
2. Haz clic en el botón "Iniciar Orden"
3. Observa cómo se procesan los platillos secuencialmente en la consola y en la pantalla

## Conceptos clave

- **Promesas**: Objetos que representan operaciones asíncronas
- **async/await**: Sintaxis moderna para trabajar con Promesas de forma secuencial
- **setTimeout**: Función que simula el paso del tiempo
