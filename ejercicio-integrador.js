// Cada producto que vende el super es creado con esta clase
class Producto {
    sku;            // Identificador único del producto
    nombre;         // Su nombre
    categoria;      // Categoría a la que pertenece este producto
    precio;         // Su precio
    stock;          // Cantidad disponible en stock

    constructor(sku, nombre, precio, categoria, stock) {
        this.sku = sku;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;

        // Si no me definen stock, pongo 10 por default
        if (stock) {
            this.stock = stock;
        } else {
            this.stock = 10;
        }
    }

}

// Creo todos los productos que vende mi super
const queso = new Producto('KS944RUR', 'Queso', 10, 'lacteos', 4);
const gaseosa = new Producto('FN312PPE', 'Gaseosa', 5, 'bebidas');
const cerveza = new Producto('PV332MJ', 'Cerveza', 20, 'bebidas');
const arroz = new Producto('XX92LKI', 'Arroz', 7, 'alimentos', 20);
const fideos = new Producto('UI999TY', 'Fideos', 5, 'alimentos');
const lavandina = new Producto('RT324GD', 'Lavandina', 9, 'limpieza');
const shampoo = new Producto('OL883YE', 'Shampoo', 3, 'higiene', 50);
const jabon = new Producto('WE328NJ', 'Jabon', 4, 'higiene', 3);

// Genero un listado de productos. Simulando base de datos
const productosDelSuper = [queso, gaseosa, cerveza, arroz, fideos, lavandina, shampoo, jabon]; 

// Cada cliente que venga a mi super va a crear un carrito
class Carrito {
    productos;      // Lista de productos agregados
    categorias;     // Lista de las diferentes categorías de los productos en el carrito
    precioTotal;    // Lo que voy a pagar al finalizar mi compra

    // Al crear un carrito, empieza vacío
    constructor() {
        this.precioTotal = 0;
        this.productos = [];
        this.categorias = [];
    }

    /**
     * función que agrega @{cantidad} de productos con @{sku} al carrito
     */
    async agregarProducto(sku, cantidad) {
        console.log(`Agregando ${cantidad} ${sku}`);

        try{
            // Busco el producto en la "base de datos"
            const productoBD = await findProductBySku(sku);

            console.log("Producto encontrado", productoBD);
            
            // Verificar si el producto ya está en el carrito
            const productoExistente = this.productos.find(producto => producto.sku === sku);

            if(productoExistente){
                if(cantidad < productoBD.stock){
                    //Si el producto existe en el carrito y la cantidad de stock es mayor a la deseada por el usuario, actualizo cantidad y precio
                    productoExistente.cantidad += cantidad;
                    this.precioTotal += productoBD.precio * cantidad;

                    //Actualizo stock del producto
                    productoBD.stock -= cantidad;
                }else{
                    //Si el producto existe en el carrito y la cantidad de stock es menor a la deseada por el usuario, agrego la cantidad disponible de ese producto
                    productoExistente.cantidad += productoBD.stock;
                    this.precioTotal += productoBD.precio * productoBD.stock;
                    
                    //Actualizo stock del producto
                    productoBD.stock = 0;                   
                }
                
            }else{
                // Creo un producto nuevo
                const nuevoProducto = new ProductoEnCarrito(sku, productoBD.nombre, cantidad);
                this.productos.push(nuevoProducto);

                //Actualizo el stock y seteo la cantidad y precio del producto en el carrito con la cantidad disponible en stock
                if(cantidad < productoBD.stock){
                    productoBD.stock -= cantidad;
                    this.precioTotal += productoBD.precio * cantidad;
                }else{
                    nuevoProducto.cantidad = productoBD.stock;
                    this.precioTotal += productoBD.precio * productoBD.stock;
                    productoBD.stock = 0;
                }

                //Verifico si la categoría ya esta en la lista
                const categoriaExistente = this.categorias.find(categoria => categoria === productoBD.categoria);

                if(!categoriaExistente){
                    //Si no esta la categoría, la agrego a la lista
                    this.categorias.push(productoBD.categoria);
                }
            }
        }catch (e){
            console.log('Producto no encontrado');
        }
    }

    //Función que elimina un producto
    async eliminarProducto(sku, cantidad){
        
        return new Promise((resolve, reject) => {
            setTimeout(async () => {                
            
                //Obtengo el producto del carrito
                const productoCarrito = this.productos.find(producto => producto.sku === sku);
                let productoBD;
                
                try {
                    //Recupero el producto de la base de datos
                    productoBD = await findProductBySku(sku);            

                    if(productoCarrito && cantidad < productoCarrito.cantidad){
                        //Actualizo la cantidad de ese producto en el carrito si existe, el precio total  y la cantidad de stock
                        productoBD.stock += 1;
                        
                        this.precioTotal -= productoBD.precio * cantidad;
                        
                        productoCarrito.cantidad -= cantidad;
                        
                        //Devuelvo las unidades eliminadas
                        resolve(`Se eliminaron ${cantidad} unidad/es de ${productoCarrito.nombre}`) 
                    
                    } else if(productoCarrito && cantidad >= productoCarrito.cantidad){
                        //Actualizo el stock del producto en la BD y el carrito actual quitando ese producto y recalculando el precio
                        productoBD.stock += productoCarrito.cantidad;
                        
                        this.precioTotal -= (productoBD.precio * productoCarrito.cantidad);
                        
                        this.productos = this.productos.filter(producto => producto !== productoCarrito)

                        const existeCategoria = this.productos.some(producto => producto.categoria === productoBD.categoria)

                        //Actualizo las categorías existentes en el carrito
                        if(!existeCategoria){
                            this.categorias = this.categorias.filter( categoria => categoria !== productoBD.categoria)
                        }
                        
                        resolve(`Se eliminaron ${cantidad} unidad/es de ${productoCarrito.nombre}`);
                    } else{
                        //Error cuando se ingresa un producto que no está en el carrito
                        reject(`El producto ${sku} no se encuentra en el carrito`)
                    }
                } catch (error) {
                    console.log(error)
                }
            }, 2000);
        })
        
    }
}

// Cada producto que se agrega al carrito es creado con esta clase
class ProductoEnCarrito {
    sku;       // Identificador único del producto
    nombre;    // Su nombre
    cantidad;  // Cantidad de este producto en el carrito

    constructor(sku, nombre, cantidad) {
        this.sku = sku;
        this.nombre = nombre;
        this.cantidad = cantidad;
    }

}

// Función que busca un producto por su sku en "la base de datos"
function findProductBySku(sku) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const foundProduct = productosDelSuper.find(product => product.sku === sku);
            if (foundProduct) {
                resolve(foundProduct);
            } else {
                reject(`Product ${sku} not found`);
            }
        }, 1500);
    });
}



//Pruebas

//Creo una instancia de carrito, agrego y elimino algunos productos
const carrito = new Carrito();

carrito.agregarProducto('WE328NJ', 2); // agrego 3 unidades de jabon -> stock 3 - 3 = 0
carrito.agregarProducto('WE328NJ', 2); // agrego 2 unidades de jabon -> stock 0 - 2 = 0  no se agrega nada al carrito 
carrito.agregarProducto('KS944RUR', 2); // agrego 2 unidades de queso -> stock 4 - 2 = 2
carrito.agregarProducto('OL883YE', 2); // agrego 2 unidades de shampoo -> stock 50 - 2 = 48

carrito.eliminarProducto('OL883YE', 2) // elimino 2 shampoo -> stock 48 + 2 = 50
    .then(res => {
        console.log(res)
    }) 
    .catch(e => console.log(e))

carrito.eliminarProducto('WE328NJ', 3) // elimino 3 jabon -> stock 0 + 3 = 3
    .then(res => {
        console.log(res)
    }) 
    .catch(e => console.log(e))

carrito.agregarProducto('FN312PPE', 3) // agrego 3 gaseosas -> stock 10 - 3 = 7 

carrito.eliminarProducto('KS944RUR', 2) // elimino 2 quesos -> stock 2 + 2 = 4
    .then(res => {
        console.log(res)
    }) 
    .catch(e => console.log(e))

//Carrito Final
setTimeout(() => {                           //gaseosas -> 3 unidades
    console.log('Carrito Final: ', carrito)  //Categorias -> bebidas solamente 
}, 4000);                                    //Precio final -> 15