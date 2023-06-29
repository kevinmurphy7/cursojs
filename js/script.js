
const tienda = document.getElementById ("tienda");
const verCarrito = document.getElementById ("ver-carrito");
const modalContainer = document.getElementById ("modal-container");
const cantidadCarrito = document.getElementById ("cantidadCarrito");



let carrito = JSON.parse (localStorage.getItem ("carrito")) || [];


alert ("Bienvenido/a a la tienda oficial del Club Estudiantes de La Plata");
function saludar (){
    alert("Que suerte tenés de ser el único campeón de la ciudad");
}
setTimeout (saludar,2000);


productos.forEach ((prod)=>{
    let content = document.createElement ("div");
    content.className ="card"
    content.innerHTML =`
                        <img src="${prod.img}">
                        <h3>${prod.nombre}</h3>
                        <p class="valor">${prod.precio}$</p>
    `;
    tienda.append (content);

    let comprar = document.createElement ("button");
    comprar.className ="btn"
    comprar.innerText = "Comprar";
    content.append (comprar);

    comprar.addEventListener ("click",()=>{
        const repeat = carrito.some ((repeatProduct)=>repeatProduct.id === prod.id);
        if (repeat){
            carrito.map ((product)=>{
                if (product.id ===prod.id){
                    product.cantidad++;
                }
            });
        } else {
            carrito.push({
                id: prod.id,
                img: prod.img,
                nombre:prod.nombre,
                precio:prod.precio,
                cantidad:prod.cantidad,
            });
        } 
        Toastify({
            text: "Has agregado un producto",
            duration:6000,
            gravity: "bottom", 
            position:"center",
            style:{
                fontSize:"25px",
                fontFamily: "Verdana",
                color: "red",
                background: "gray",
                }
            }).showToast();
        contador ();
        guardar();
    });
});

    const pintarCarrito = ()=>{
    modalContainer.innerHTML = "";
    modalContainer.style.display = "block";
    const modalHeader = document.createElement ("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML =`
        <h1 class="titulo-modal-header">Carrito</h1>
    `;
    modalContainer.append (modalHeader);

    const modalButton = document.createElement ("h1");
    modalButton.innerText = "X";
    modalButton.className = "modal-header-button";
    modalButton.addEventListener ("click",()=>{
        modalContainer.style.display = "none";
    });

    modalHeader.append (modalButton);

    carrito.forEach ((prod)=>{
        let carritoContent = document.createElement ("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
                                    <img src="${prod.img}">
                                    <h3>${prod.nombre}</h3>
                                    <span class="restar"> - </span>
                                    <p>Cantidad: ${prod.cantidad}</p>
                                    <span class="sumar"> + </span>
                                    <p>Subtotal: ${prod.cantidad * prod.precio} $</p>
                                    <span class = "borrar-producto"> X </span>
        `;
        modalContainer.append (carritoContent);

        let restar = carritoContent.querySelector(".restar");
        restar.addEventListener("click",()=>{
            if(prod.cantidad !== 1){
                prod.cantidad--;
                Toastify({
                    text: "Has quitado un producto🛒",
                    duration:6000,
                    gravity: "bottom", 
                    position:"center",
                    style:{
                        fontSize:"25px",
                        fontFamily: "Verdana",
                        color: "red",
                        background: "gray",
                        }
                    }).showToast();
            }
            pintarCarrito();
            guardar();
        })

        let sumar = carritoContent.querySelector(".sumar");
        sumar.addEventListener("click",()=>{
            prod.cantidad++;
            Toastify({
                text: "Has agregado un producto🛒",
                duration:6000,
                gravity: "bottom", 
                position:"center",
                style:{
                    fontSize:"25px",
                    fontFamily: "Verdana",
                    color: "red",
                    background: "gray",
                    }
                }).showToast();
            pintarCarrito();
            guardar();
        })

        let eliminar = carritoContent.querySelector (".borrar-producto");
        eliminar.addEventListener ("click",()=>{
            eliminarProducto(prod.id);
            Toastify({
                text: "Has eliminado el producto🛒",
                duration:6000,
                gravity: "bottom", 
                position:"center",
                style:{
                    fontSize:"25px",
                    fontFamily: "Verdana",
                    color: "red",
                    background: "gray",
                    }
                }).showToast();
            pintarCarrito();
            guardar();
        })
    });

    const total= carrito.reduce ((acu,el)=>acu+ el.precio*el.cantidad, 0);
    const totalCompra = document.createElement ("div");
    totalCompra.className = "total-content";
    totalCompra.innerHTML = `Total a pagar: ${total}$
                            <button class="btn-compra">Comprar</button>
    `; 
    modalContainer.append (totalCompra);

};

verCarrito.addEventListener ("click" ,pintarCarrito);

const eliminarProducto = (id)=>{
    const encontrarId = carrito.find ((element)=>element.id===id);

    carrito = carrito.filter ((carritoId)=>{
        return carritoId != encontrarId;
    });

    contador();
    guardar ();
    pintarCarrito ();
}

const contador = ()=>{
    cantidadCarrito.style.display = "block";
    const carritoLength =carrito.length;
    localStorage.setItem ("carritoLength",JSON.stringify(carritoLength));
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem ("carritoLength"));
};

contador();

const guardar = ()=>{
    localStorage.setItem ("carrito", JSON.stringify (carrito));
};


function position (posicion){
    let lat = posicion.coords.latitude;
    let lon = posicion.coords.longitude;
    let key= "cb70d4c84af71241c72c22cf83f8f816";

    fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=es`)
        .then(response => response.json())
        .then(data => {
            const mostrar_clima =document.createElement("div");
            mostrar_clima.className="mostrar-clima";
            mostrar_clima.innerHTML = `<p>${data.name}</p>
                                        <p>Temp:${data.main.temp}</p>
                                        <p>Clima:${data.weather[0].description}</p>
                                        `
        })
}

navigator.geolocation.getCurrentPosition (position);