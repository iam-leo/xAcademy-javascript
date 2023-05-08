# 🚀 xAcademy-javascript

## 🗒 Ejercicios módulo javascript del programa xAcademy

1. Realizar una funcion que reciba un numero y escriba una piramide desde 1 hasta ese numero de la siguiente forma:
``` 
    // Para valor 6 
    1
    12
    123
    1234
    12345
    123456
```

``` 
    // Para valor 3 
    1
    12
    123
```

2. Escribir una funcion que reciba 2 array y devuelva un array con todos los elementos que coinciden entre ellos

```
    //Ejemplo:
    Array1: ['rojo', 'azul', 'amarillo']
    Array2: ['blanco', 'negro', 'rojo']
    Resultado: ['rojo']

    //Ejemplo 2:
    Array1: [4, 3, true, 'manzana']
    Array2: ['pera', 3, f alse, true, 3, true]
    Resultado: [3, true]
```

3. <br>

    1. Dado el siguiente objeto
    ```
        let carrito = {
            montoTotal: 10,
            productos: ["Leche"]
        }
    ```
    Crear las clases necesarias para generar carritos respetando la estructura del objeto dado.

    2. Agregar un metodo a la clase que agregue un producto al carrito y actualice el montoTotal
    ```
        agregarProducto(nombre, precio, unidades) {
            // Completar aca...
        }
    ```


    Ej: agregarProducto("Azucar", 5, 2);
    ```
        //Resultado esperado
        carrito = {
            montoTotal: 20,
            productos: ["Leche", "Azucar"]
        }
    ```

    3. Agregar al ejercicio anterior una validación para no permitir duplicados e imprimir un mensaje si el item ya existe “ya existe xxx con yyy unidades”.
