// Ejercicio 1

function piramideNumeros(num){
    let resultado = '';
    for(let i=1; i<=num; i++){
        resultado = resultado + i;
        console.log(resultado);
    }
}

piramideNumeros(6);
piramideNumeros(3);


//Ejercicio 2

function elementosCoincidentes(array1, array2){
    let coincidencias = [];
    for(let i=0; i<array1.length; i++){
      for(let j=0; j<array2.length; j++){
        if(array1[i] === array2[j]){
          //agregar coincidencias al array auxiliar
          coincidencias.push(array1[i]);
          
          //Eliminar duplicados
          for(let k=0; k<=coincidencias.length; k++){
            if(k>0){
              if(coincidencias[k] === coincidencias[k-1]){
                coincidencias.pop();
              }
            }
          }
        }
      }  
    }
    console.log(coincidencias);
  }

let array1 = ['rojo', 'azul', 'amarillo'];
let array2 = ['blanco', 'negro', 'rojo'];

elementosCoincidentes(array1, array2);  //rojo

let array3 = [4, 3, true, 'manzana'];
let array4 = ['pera', 3, false, true, 3, true];

elementosCoincidentes(array3, array4); //3 y true


//Ejercicio 3.1
/*
let carrito = {
    montoTotal: 10,
    productos: ["Leche"]
}

class Carrito {
    constructor(monto, producto){
        this.montoTotal = monto;
        this.productos = [producto];
    }
}

let carrito1 = new Carrito(10, 'Leche');

console.log(carrito);
console.log(carrito1);
*/

// Ejercicio 3.2
/*
class Carrito {
    constructor(monto, producto){
        this.montoTotal = monto;
        this.productos = [producto];
    }

    agregarProducto(nombre, precio, unidades){
        this.productos.push(nombre);
        this.montoTotal += (precio*unidades);
    }
}

let carrito2 = new Carrito(10, 'leche');

carrito2.agregarProducto('azúcar', 5, 2);
console.log(carrito2);
*/

//Ejercicio 3.3
class Carrito {
    constructor(montoTotal, producto) {
      this.montoTotal = montoTotal;
      this.productos = [producto];
    }
  
    agregarProducto(nombre, precio, unidades) {       
      //Validar duplicados
      let existe = false;
      let indexUnidades;
      for(let i=0; i<this.productos.length; i++){
        if(nombre === this.productos[i]){
          existe = true;
          indexUnidades = i-1;
        }      
      }
  
      if(existe){
        if(this.unidades[indexUnidades] === undefined){
            console.log('ya existe: ' + nombre + ' con 1 unidad/es.');    
        } else{
            console.log('ya existe: ' + nombre + ' con ' + this.unidades[indexUnidades] + ' unidad/es.');
        }        
      }else{
        this.productos.push(nombre);
        this.unidades.push(unidades);
        this.montoTotal += (precio*unidades);
      }
      
    }
  }
  
let carrito2 = new Carrito(10, 'leche');
carrito2.unidades = [];
console.log(carrito2);

//Pruebas
carrito2.agregarProducto('azúcar', 5, 6);
console.log(carrito2);

carrito2.agregarProducto('azúcar', 2, 1);

carrito2.agregarProducto('yerba', 15, 2);
console.log(carrito2);

carrito2.agregarProducto('yerba', 15, 1);
