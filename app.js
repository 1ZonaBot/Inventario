const URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTb0YfNfUNBNu606Dum1baz-ZjB-vYfNcN6i5bMS7wEIO7VnoAYYAjtWoKqTwoeAUQy7Y5Lp8b4tmvq/pub?gid=1161484818&single=true&output=csv";

let inventario = [];

Papa.parse(URL, {
    download: true,
    header: true,
    skipEmptyLines: true,

    complete: function(resultado) {

        inventario = resultado.data;

        mostrarProductos(inventario);

    },

    error: function(err) {

        console.log(err);

    }

});

function mostrarProductos(lista){

    const contenedor = document.getElementById("productos");

    contenedor.innerHTML = "";

    lista.forEach(p=>{

        let cantidad = Number(p["Cantidad"]) || 0;

        let clase="verde";

        if(cantidad<=0){

            clase="rojo";

        }else if(cantidad<=5){

            clase="amarillo";

        }

        contenedor.innerHTML += `

        <div class="tarjeta">

            <h2>${p["Detalle"]}</h2>

            <p><b>Tipo:</b> ${p["Tipo"]}</p>

            <p><b>Referencia:</b> ${p["Referencia"]}</p>

            <p><b>Marca:</b> ${p["Marca"]}</p>

            <p><b>Color:</b> ${p["Color"]}</p>

            <p class="${clase}"><b>Cantidad:</b> ${cantidad}</p>

            <p><b>Precio:</b> $${Object.values(p)[7]}</p>

        </div>

        `;

    });

}

document.getElementById("buscar").addEventListener("input",function(){

    const texto=this.value.toLowerCase();

    const filtrado=inventario.filter(p=>{

        return (

            (p["Tipo"] || "").toLowerCase().includes(texto) ||

            (p["Detalle"] || "").toLowerCase().includes(texto) ||

            (p["Referencia"] || "").toLowerCase().includes(texto) ||

            (p["Marca"] || "").toLowerCase().includes(texto) ||

            (p["Color"] || "").toLowerCase().includes(texto)

        );

    });

    mostrarProductos(filtrado);

});
