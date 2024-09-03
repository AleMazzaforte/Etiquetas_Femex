function confirmDelete(clienteNombre) {
    // Usa `confirm` en lugar de `alert` para que el usuario pueda confirmar o cancelar
    return confirm(`¿Está seguro de que desea eliminar al cliente ${clienteNombre}?`);
}

//Confirmacion de borrado total de productos de la base de datos

document.getElementById('deleteForm').addEventListener('submit', function(e) {
    const action = e.submitter.value;
    if (action === 'borrarSeleccionados' && !confirm('¿Está seguro de que desea borrar los productos seleccionados?')) {
        e.preventDefault(); // Evita que el formulario se envíe
    } else if (action === 'borrarTodos' && !confirm('¿Está seguro de que desea borrar todos los productos?')) {
        e.preventDefault(); // Evita que el formulario se envíe
    }
});
