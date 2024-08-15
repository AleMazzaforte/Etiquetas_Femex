function confirmDelete(clienteNombre) {
    // Usa `confirm` en lugar de `alert` para que el usuario pueda confirmar o cancelar
    return confirm(`¿Está seguro de que desea eliminar al cliente ${clienteNombre}?`);
}