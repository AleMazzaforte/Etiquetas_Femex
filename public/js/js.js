document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById('productos-body');
    console.log('productosData:', productosData);
    console.log('clienteNombre:', clienteNombre);
    if (productosData.length > 0) {
        
      productosData.forEach(producto => {
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
        `;
  
        tbody.appendChild(tr);
      });
    } else {
      const tr = document.createElement('tr');
      tr.innerHTML = '<td colspan="11">No se encontraron productos para este cliente.</td>';
      tbody.appendChild(tr);
    }
  });
  