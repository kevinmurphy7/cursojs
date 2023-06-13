
const tienda = document.getElementById ("tienda");
const verCarrito = document.getElementById ("ver-carrito");
const modalContainer = document.getElementById ("modal-container");
const cantidadCarrito = document.getElementById ("cantidadCarrito");

const productos = [
    {
        id:1,
        nombre: "Camiseta Titular",
        precio: 17000,
        img: "https://http2.mlstatic.com/D_NQ_NP_866232-MLA53707740636_022023-O.webp",
        cantidad:1,
    },
    {
        id:2,
        nombre: "Camiseta Suplente",
        precio: 16000,
        img: "https://http2.mlstatic.com/D_NQ_NP_857174-MLA53707915203_022023-O.webp",
        cantidad:1,
    },
    {
        id:3,
        nombre: "Camiseta Arquero",
        precio: 17000,
        img: "https://http2.mlstatic.com/D_NQ_NP_996663-MLA53708726206_022023-O.webp",
        cantidad:1,
    },
    {
        id:4,
        nombre: "Short",
        precio: 9500,
        img: "https://afaar.vtexassets.com/arquivos/ids/155957-800-auto?v=638127783482670000&width=800&height=auto&aspect=true",
        cantidad:1,
    },
    {
        id:5,
        nombre: "Camiseta Entreno",
        precio: 12000,
        img: "https://http2.mlstatic.com/D_NQ_NP_834077-MLA54960468666_042023-O.webp",
        cantidad:1,
    },   
    {
        id:6,
        nombre: "Rompevientos",
        precio: 22000,
        img: "https://http2.mlstatic.com/D_NQ_NP_731087-MLA69362988951_052023-O.webp",
        cantidad:1,
    },    
    {
        id:7,
        nombre: "Jogging",
        precio: 17000,
        img: "https://http2.mlstatic.com/D_NQ_NP_775237-MLA54816514299_042023-O.webp",
        cantidad:1,
    },
    {id:8,
    nombre: "Medias",
    precio: 1500,
    img: "https://http2.mlstatic.com/D_NQ_NP_604931-MLA49762185246_042022-O.webp",
    cantidad:1,
    }
];

let carrito = JSON.parse (localStorage.getItem ("carrito")) || [];

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
                                    <p>Cantidad: ${prod.cantidad}</p>
                                    <p>Subtotal: ${prod.cantidad * prod.precio} $</p>
                                    <span class = "borrar-producto"> X </span>
        `;
        modalContainer.append (carritoContent);

        let eliminar = carritoContent.querySelector (".borrar-producto");
        eliminar.addEventListener ("click",()=>{
            eliminarProducto(prod.id);
        })
    });
    
    const total= carrito.reduce ((acu,el)=>acu+ el.precio*el.cantidad, 0);
    const totalCompra = document.createElement ("div");
    totalCompra.className = "total-content";
    totalCompra.innerHTML = `Total a pagar: ${total}$`; 
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