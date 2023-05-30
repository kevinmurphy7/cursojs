class Producto {
    constructor (nombre, precio, stock){
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    get_datos(){
        console.log(" ");
        console.log ("Nombre: ",this.nombre);
        console.log ("Precio: ",this.precio);
        console.log ("Stock: ",this.stock);
        console.log (" ");
    }

    get_stock(){
        if (this.stock <= 0){
            return false
        } 
        else{
            return true
        }
    }

    venta_stock (unidades_compra){
        if (this.stock >= unidades_compra){
            this.stock = this.stock - unidades_compra;
            return true
        }
        else{
            return false
        }
    }
}

let carrito = [];

carrito.push (new Producto ("Camiseta Titular",16000,15));
carrito.push (new Producto ("Camiseta Suplente",15000,20));
carrito.push (new Producto ("Camiseta Arquero",16000,10));
carrito.push (new Producto ("Short",8000,12));
carrito.push (new Producto ("Camiseta Entrenamiento",10000,7));
carrito.push (new Producto ("Rompevientos",19000,5));
carrito.push (new Producto ("Jogging",17000,3));
carrito.push (new Producto ("Medias",2000,17));

console.log ("Lista de Productos");

for (let producto of carrito){
    producto.get_datos();
}

function busqueda(producto) {
    return producto.nombre == compra_usuario
}

let compra_usuario = prompt ("Ingrese el producto que desea comprar o ingrese SALIR para finalizar");
let resultado_busqueda =carrito.find (busqueda);


if (resultado_busqueda != undefined) {
    if (resultado_busqueda.get_stock()){
        let unidades_compra = parseInt (prompt ("¿Cuántas unidades del producto desea comprar?"));
        if (resultado_busqueda.venta_stock (unidades_compra)) {
            console.log (`Gracias por comprar ${unidades_compra} unidad/es de ${resultado_busqueda.nombre}`);
        }
        else{
            console.log ("No contamos con stock disponible de: ",resultado_busqueda.nombre);
            console.log ("Stock disponible: ",resultado_busqueda.stock);
        }
    }

    resultado_busqueda.get_datos();
}
else{
    console.log ("No se encontró el producto: ",compra_usuario);
}
