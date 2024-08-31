

// document.getElementById('buscarClienteForm').addEventListener('submit', async function (event) {
//     event.preventDefault();
  
//     const clienteNombre = document.getElementById('name').value;
  
//     // Realiza la petición al servidor para obtener los datos del cliente
//     const response = await fetch(`/etiquetas/buscar?name=${encodeURIComponent(clienteNombre)}`);
//     const { cliente, productos } = await response.json();
  
//     if (productos.length > 0) {
//       alert(`El cliente ${cliente.nombreCliente} tiene RMA asociado.`);
//     }
  
//     if (cliente) {
//       // Oculta el formulario y header
//       document.querySelector('form').style.display = 'none';
//       document.querySelector('header').style.display = 'none';
  
//       // Inyecta el div con los datos del cliente
//       const clienteDataContainer = document.getElementById('clienteDataContainer');
//       clienteDataContainer.innerHTML = `
//         <div>
//           <h3>Datos del Cliente</h3>
//           <p>Nombre: <strong>${cliente.nombreCliente}</strong></p>
//           <p>CUIT: <strong>${cliente.cuit}</strong></p>
//           <p>Provincia: <strong>${cliente.provincia}</strong></p>
//           <p>Localidad: <strong>${cliente.localidad}</strong></p>
//           <p>Domicilio: <strong>${cliente.domicilio}</strong></p>
//           <p>Teléfono: <strong>${cliente.telefono}</strong></p>
//           <p>Transporte: <strong>${cliente.transporte}</strong></p>
//           <p>Seguro: <strong>${cliente.seguro}</strong></p>
//           <p>Condición de Entrega: <strong>${cliente.condicionDeEntrega}</strong></p>
//           <p>Condición de Pago: <strong>${cliente.condicionDePago}</strong></p>
//         </div>
//         <button id="printButton">Imprimir Etiqueta</button>
//       `;
//     }
//   });
  
//   // Lógica para manejar el botón de imprimir
//   document.addEventListener('click', function (event) {
//     if (event.target.id === 'printButton') {
//       // Aquí puedes agregar la funcionalidad para generar la etiqueta de envío
//       window.print();
//     }
//   });
  
document.getElementById('buscarClienteForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const clienteNombre = document.getElementById('name').value;

  // Realiza la petición al servidor para obtener los datos del cliente
  const response = await fetch(`/etiquetas/buscar?name=${encodeURIComponent(clienteNombre)}`);
  const { cliente, productos, remitente } = await response.json();

  if (productos.length > 0) {
    alert(`El cliente ${cliente.nombreCliente} tiene RMA asociado.`);
  }

  if (cliente) {
    // Oculta el formulario y header
    document.querySelector('form').style.display = 'none';
    document.querySelector('header').style.display = 'none';

    // Inyecta el div con los datos del cliente
    const clienteDataContainer = document.getElementById('clienteDataContainer');
    clienteDataContainer.innerHTML = `
      <div>
        <h3>Datos del Cliente</h3>
        <p>Nombre: <strong>${cliente.nombreCliente}</strong></p>
        <p>CUIT: <strong>${cliente.cuit}</strong></p>
        <p>Provincia: <strong>${cliente.provincia}</strong></p>
        <p>Localidad: <strong>${cliente.localidad}</strong></p>
        <p>Domicilio: <strong>${cliente.domicilio}</strong></p>
        <p>Teléfono: <strong>${cliente.telefono}</strong></p>
        <p>Transporte: <strong>${cliente.transporte}</strong></p>
        <p>Seguro: <strong>${cliente.seguro}</strong></p>
        <p>Condición de Entrega: <strong>${cliente.condicionDeEntrega}</strong></p>
        <p>Condición de Pago: <strong>${cliente.condicionDePago}</strong></p>
      </div>
      ${remitente ? `
        <div>
          <h3>Datos del Remitente</h3>
          <p>Nombre: <strong>${remitente.nombreRemitente}</strong></p>
          <p>CUIT: <strong>${remitente.cuitRemitente}</strong></p>
          <p>Dirección: <strong>${remitente.direccionRemitente}</strong></p>
          <p>Teléfono: <strong>${remitente.telefonoRemitente}</strong></p>
          <p>Código postal: <strong>${remitente.cPostalRemitente}</strong></p>
        </div>
      ` : ''}
      <button id="printButton">Imprimir Etiqueta</button>
    `;
  }
});

// Lógica para manejar el botón de imprimir
document.addEventListener('click', function (event) {
  if (event.target.id === 'printButton') {
    // Aquí puedes agregar la funcionalidad para generar la etiqueta de envío
    window.print();
  }
});