const carrito = JSON.parse(localStorage.getItem("carrito"));

let tbody = document.querySelector("#tbody");

function rellenarCarrito(arrayCarrito){
    for(let producto of arrayCarrito){

        let row = document.createElement("tr");

        row.innerHTML = 
        `<td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td>${producto.cantidad}</td>
        <td>${producto.subtotal}</td>
        <td><button id="${producto.id}" class="btn btn-danger fs-4 eliminar-producto">Eliminar</button></td>
        `
        tbody.appendChild(row);
    }
}
rellenarCarrito(carrito);

let botonEliminar = document.querySelectorAll(".eliminar-producto");

botonEliminar.forEach(elemento => {
    elemento.addEventListener("click", eliminarProducto)
})

function eliminarProducto(e){

    let indice = carrito.findIndex (producto => producto.id == e.target.id)
    carrito.splice(indice, 1)

    e.target.parentNode.parentNode.remove();

    localStorage.setItem("carrito",JSON.stringify(carrito));
}
