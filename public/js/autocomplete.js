console.log('js enlazado')
//funcion de busqueda de modelo
document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("modelo");
    const autocompleteList = document.getElementById("autocomplete-list");
    const listado = window.listado; // Ahora `listado` está disponible aquí

    input.addEventListener("input", function() {
        const val = this.value;
        autocompleteList.innerHTML = ""; // Limpia la lista anterior
        autocompleteList.style.display= "block"
        if (!val) {
            return false;
        }

        listado.forEach(item => {
            if (item.toLowerCase().includes(val.toLowerCase())) {
                const div = document.createElement("div");
                div.innerHTML = `<strong>${item.substr(0, val.length)}</strong>${item.substr(val.length)}`;
                div.addEventListener("click", function() {
                    input.value = item; // Establece el valor seleccionado
                    autocompleteList.innerHTML = ""; // Limpia la lista
                });
                autocompleteList.appendChild(div);
            }
        });

        if (autocompleteList.childNodes.length === 0) {
            autocompleteList.innerHTML = "<div>No se encontraron coincidencias</div>";
        }
    });

    input.addEventListener("keydown", function(e) {
        let activeItem = document.querySelector(".autocomplete-active");

        if (e.keyCode === 40) { // Flecha abajo
            moveSelection(1);
        } else if (e.keyCode === 38) { // Flecha arriba
            moveSelection(-1);
        } else if (e.keyCode === 13) { // Enter
            e.preventDefault();
            if (activeItem) {
                activeItem.click();
            }
        }
    });

    function moveSelection(direction) {
        const items = autocompleteList.getElementsByTagName("div");
        if (!items.length) return;

        let index = Array.from(items).indexOf(document.querySelector(".autocomplete-active"));
        if (index >= 0) items[index].classList.remove("autocomplete-active");

        index = (index + direction + items.length) % items.length;
        items[index].classList.add("autocomplete-active");

        items[index].scrollIntoView({ behavior: "smooth", block: "nearest" });

        input.value = items[index].textContent.trim();
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('modelo');
    const autocompleteList = document.getElementById('autocomplete-list');
    
    input.addEventListener('focus', function () {
        const rect = input.getBoundingClientRect();
        autocompleteList.style.top = `${rect.bottom}px`; // Ajusta la posición vertical
        autocompleteList.style.left = `${rect.left}px`; // Ajusta la posición horizontal si es necesario
        autocompleteList.style.width = `${input.offsetWidth}px`; // Asegúrate de que el ancho coincida con el campo de entrada
    });

    
});

//Logica para autocompletado de Nombres de clientes
/*
document.addEventListener("DOMContentLoaded", () => {
    const inputNombre = document.querySelector('#nombreCliente'); // Selecciona el elemento de input, no su valor
    
    // Verifica si el elemento existe
    if (inputNombre) {
        console.log('inputNombre tiene: ', inputNombre.value , 'despues del if');

        const listaSugerencias = document.createElement('ul');
        listaSugerencias.classList.add('autocomplete-suggestions');
        inputNombre.parentNode.appendChild(listaSugerencias);

        inputNombre.addEventListener('input', async () => {
            const term = inputNombre.value;

            if (term.length > 0) {
                const response = await fetch(`/gestion/buscarNombres?term=${term}`);
                const sugerencias = await response.json();

                listaSugerencias.innerHTML = '';
                sugerencias.forEach(sugerencia => {
                    const item = document.createElement('li');
                    item.textContent = sugerencia;
                    item.addEventListener('click', () => {
                        inputNombre.value = sugerencia;
                        listaSugerencias.innerHTML = '';
                    });
                    listaSugerencias.appendChild(item);
                });
            } else {
                listaSugerencias.innerHTML = '';
            }
        });

        document.addEventListener('click', (event) => {
            if (!inputNombre.contains(event.target) && !listaSugerencias.contains(event.target)) {
                listaSugerencias.innerHTML = '';
            }
        });
    } else {
        console.error('El elemento #nombreCliente no se encontró en el DOM.');
    }
});  
*/