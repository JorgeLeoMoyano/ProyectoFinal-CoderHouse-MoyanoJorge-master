let carrito = [];

class PorductoCarrito {
    constructor(nombre , precio , imagen ,id ,subtotal){
        this.nombre=nombre;
        this.precio=precio;
        this.imagen=imagen;
        this.id=id;
        this.cantidad = 1;
        this.subtotal= precio;
        

    }
}

let divContainer = document.getElementById("row");


function rellenarPagina(arrayProductos){
        
        for( let producto of arrayProductos){

            let div = document.createElement("div");
            div.classList = "col-4 mt-3"

            div.innerHTML =
            `<div class="card rounded animaciones fs-3" style="width: 18rem;">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.id}">
                <div class="card-body">
                        <h5 class="card-title fs-3">${producto.nombre}</h5>
                        <p class="card-text fs-3">$ <strong>${producto.precio}</strong></p>
                        <button id="btnSweet" class="btn btn-primary anadirCarrito fs-3">Añadir al carrito</button>
                </div>
            </div>`

            divContainer.appendChild(div)
            
        } 

        let carritoLocalStorage =JSON.parse(localStorage.getItem("carrito"));

        if(carritoLocalStorage)
        {
            navCarritoCompras(carritoLocalStorage);
        }

}

rellenarPagina(productos);


let botones = document.querySelectorAll(".anadirCarrito");

botones.forEach(elemtno => {
    elemtno.addEventListener("click",anadirCarrito)
    elemtno.addEventListener("click",alerta)
})

function alerta()
{
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto agregado!',
        showConfirmButton: false,
        timer: 1500
    });
}

function anadirCarrito(e){

    let carritoLocalStorage=JSON.parse(localStorage.getItem("carrito"));

    if(carritoLocalStorage){
        carrito = carritoLocalStorage;
    }

    let indice = carrito.findIndex(producto => producto.id == e.target.parentNode.parentNode.children[0].alt);

    let nombre  = e.target.parentNode.children[0].textContent;
    let precio  = e.target.parentNode.children[1].children[0].textContent;
    let imagen  = e.target.parentNode.parentNode.children[0].src;
    let id      = e.target.parentNode.parentNode.children[0].alt;

    if(indice ==-1){
    const producto = new PorductoCarrito(nombre,precio, imagen, id);

    carrito.push(producto);
    
    }else{

        carrito[indice].cantidad ++;
        carrito[indice].subtotal = carrito[indice].precio * carrito[indice].cantidad;
    }

     localStorage.setItem("carrito",JSON.stringify(carrito));
     navCarritoCompras(carrito);
}

function navCarritoCompras(arrayCarrito){
    
    let textoCarrito = document.getElementById("total-carrito");

    let totalProductos = 0;

    for(let producto of arrayCarrito){
        totalProductos += producto.cantidad
    }
    textoCarrito.innerHTML="";
    textoCarrito.innerHTML= `<p>carrito (${totalProductos})</p>`
}