document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.getElementById('productos-body');

  if (productosData.length > 0) {
    console.log(productosData)
    productosData.forEach(producto => {
      if(producto.numDeEgreso === 0) {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${clienteNombre}</td>
        <td>${producto.modelo}</td>
        <td>${producto.cantidad}</td>
        <td>${producto.solicita}</td>
        <td>${producto.opLote}</td>
        <td>${producto.vencimiento}</td>
        <td>${producto.seEntrega}</td>
        <td>${producto.seRecibe}</td>
        <td>${producto.observacion}</td>
        <td>${producto.numeroDeIngreso}</td>
        <td>${producto.numDeEgreso}</td>
        <td>
         <button class="btn btn-edit" onclick="window.location.href='/gestion/editarProducto/${producto.id}'">Editar.</button>
          <form class="delete-form" action="/gestion/borrarProducto/${producto.id}" method="POST" style="display:inline;">
            <input type="hidden" name="clienteId" value="<%= cliente ? cliente.id : '' %>">
            <button type="submit" class="btn btn-delete">Borrar</button>
          </form>
        </td>
      `;

      tbody.appendChild(tr);
      }
    });

    // Aquí se agrega el manejador de eventos para los formularios de eliminación
    document.querySelectorAll('.delete-form').forEach(form => {
      form.addEventListener('submit', function (event) {
        const confirmation = confirm('¿Estás seguro de que deseas eliminar este producto?');
        if (!confirmation) {
          event.preventDefault(); // Previene el envío del formulario si el usuario cancela
        }
      });
    });

  } else {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="11">No se encontraron productos para el cliente ${clienteNombre}</td>`;
    tbody.appendChild(tr);
  }
});
