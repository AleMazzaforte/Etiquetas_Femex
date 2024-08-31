document.addEventListener('DOMContentLoaded', function() {
  cargarDatos();
});

// Obtener el contenedor de cards y el template de card
const contenedorCards = document.getElementById('contenedor-cards');
const templateCard = document.getElementById('template-card');

// Función para crear un card
function crearCard(datos) {
  const card = templateCard.content.cloneNode(true);

  if (datos.nombreRemitente) {
    card.querySelector('#nombreRemitente-card').textContent = datos.nombreRemitente;
  }

  if (datos.cuitRemitente) {
    card.querySelector('#cuitRemitente-card').textContent = datos.cuitRemitente;
  }

  if (datos.direccionRemitente) {
    card.querySelector('#direccionRemitente-card').textContent = datos.direccionRemitente;
  }

  if (datos.telefonoRemitente) {
    card.querySelector('#telefonoRemitente-card').textContent = datos.telefonoRemitente;
  }

  if (datos.cPostalRemitente) {
    card.querySelector('#cPostalRemitente-card').textContent = datos.cPostalRemitente;
  }

  card.querySelector('.btn-modificar').addEventListener('click', () => {
    // Función para modificar los datos
  });
  card.querySelector('.btn-eliminar').addEventListener('click', () => {
    // Función para eliminar los datos
  });

  return card;
}

// Función para cargar los datos
function cargarDatos() {
  const contenedorCards = document.getElementById('contenedor-cards');
  // Obtener los datos de la base de datos
  fetch('/api/datos')
    .then(response => {
      return response.json();
    })
    .then(datos => {
      // Crear un card para cada fila de datos
      datos.forEach((fila) => {
        const card = crearCard(fila);
        if (contenedorCards) {
          contenedorCards.appendChild(card);
        } else {
          console.error('No se encontró el contenedor de tarjetas con el ID "contenedor-cards"');
        }
      });
    });
}

// Agregar evento al botón de carga
document.getElementById('btn-carga').addEventListener('click', cargarDatos);