//variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];
cargarEventListener();
function cargarEventListener(){

    //CUando agregas un curso presionando Agregar carrito
    listaCursos.addEventListener('click',agregarCurso);
    // Elimina cursos del carrito
    carrito.addEventListener('click',eliminarCurso);
    //vacia carrito
    vaciarCarrito.addEventListener('click',()=>{
       articulosCarrito = [];
       limpiarCarrito();
    })
}


//FUNCIONES
function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado =e.target.parentElement.parentElement;
        leerDatosFuncion(cursoSeleccionado);
    }
    
}
function eliminarCurso (e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoID= e.target.getAttribute('data-id');
        //Elimina del arreglo por el id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoID);
        carritoHTML(); //iterar sobre el carrito y mostrar su html
    }
}
//lee el contenidoo del html al que le dimos click y extrae la informacion del curso
function leerDatosFuncion(curso){
  

    //crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }


    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        const cursos = articulosCarrito.map(curso => {
            if(curso.id=== infoCurso.id){
                curso.cantidad++;
                return curso;   //retorna el objeto actualizado
            }else{
                return curso;   //retorna los objetos que no son los duplicados
            }
        })
    }else{
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    //Agrega elementos al carrito
    
    console.log(articulosCarrito);

    carritoHTML();
}



//Muestra el carrito de compras en el html
function carritoHTML(){


        //Limpiar el HTML
        limpiarCarrito();


        //REcorre el carrito y genera el html
    articulosCarrito.forEach(curso =>{
        const {imagen, titulo, precio,cantidad,id} = curso;
        console.log(curso);
        const row = document.createElement('tr');
        row.innerHTML= `
        <td><img src= "${imagen}" width="100"></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#"class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;

        //Agregar el HTML del carrito en el body
        contenedorCarrito.appendChild(row);
    })
}

//elimina los cursos del tbody
function limpiarCarrito(){
    //forma lenta
    //contenedorCarrito.innerHTML='';

    while(contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}