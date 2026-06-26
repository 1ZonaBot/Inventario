const URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vTb0YfNfUNBNu606Dum1baz-ZjB-vYfNcN6i5bMS7wEIO7VnoAYYAjtWoKqTwoeAUQy7Y5Lp8b4tmvq/pub?gid=1161484818&single=true&output=csv";

let inventario = [];

async function cargarInventario() {
    try {

        const respuesta = await fetch(URL);
        const texto = await respuesta.text();

        const filas = texto.trim().split("\n");

        inventario = filas.slice(1).map(fila => {

            const c = fila.split(",");

            return {

                tipo: c[0] || "",
                detalle: c[1] || "",
                referencia: c[2] || "",
                entrada: c[3] || "",
                marca: c[4] || "",
                cantidad: Number(c[5]) || 0,
                color: c[6] || "",
                precio: c[7] || ""

            };

        });

        mostrarProductos(inventario);

    } catch (e) {

        document.getElementById("productos").innerHTML =
        "<p>Error cargando inventario.</p>";

        console.error(e);

    }

}

function mostrarProductos(lista){

    const contenedor=document.getElementById("productos");

    contenedor.innerHTML="";

    if(lista.length===0){

        contenedor.innerHTML="<p>No se encontraron productos.</p>";

        return;

    }

    lista.forEach(p=>{

        let clase="verde";

        if(p.cantidad<=0){

            clase="rojo";

        }else if(p.cantidad<=5){

            clase="amarillo";

        }

        contenedor.innerHTML+=`

        <div class="tarjeta">

            <h2>${p.detalle}</h2>

            <p><b>Tipo:</b> ${p.tipo}</p>

            <p><b>Referencia:</b> ${p.referencia}</p>

            <p><b>Marca:</b> ${p.marca}</p>

            <p><b>Color:</b> ${p.color}</p>

            <p class="stock ${clase}"><b>Cantidad:</b> ${p.cantidad}</p>

            <p><b>Precio:</b> $${p.precio}</p>

        </div>

        `;

    });

}

document.getElementById("buscar").addEventListener("input",function(){

    const texto=this.value.toLowerCase();

    const resultado=inventario.filter(p=>

        p.tipo.toLowerCase().includes(texto) ||

        p.detalle.toLowerCase().includes(texto) ||

        p.referencia.toLowerCase().includes(texto) ||

        p.marca.toLowerCase().includes(texto) ||

        p.color.toLowerCase().includes(texto)

    );

    mostrarProductos(resultado);

});

cargarInventario();
