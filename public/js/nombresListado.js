console.log('nombresListado.js enlazado correctamente');
document.addEventListener('DOMContentLoaded', () => {
    // Cambiado para seleccionar por clase en lugar de ID
    const input = document.querySelector('.autocompleteNombres'); 
    let suggestionsList = document.getElementById('suggestionsList');
    let currentIndex = -1;

    input.addEventListener('input', async function() {
        const query = input.value.trim().toLowerCase();

        if (query.length === 0) {
            suggestionsList.innerHTML = '';
            suggestionsList.style.display = 'hidden';
            return;
        }

        try {
            const response = await fetch(`/buscarNombres?q=${encodeURIComponent(query)}`);
            const nombres = await response.json();

            suggestionsList.innerHTML = '';
            suggestionsList.style.display = 'block';
                nombres.forEach((nombre, index) => {
                const li = document.createElement('li');
                li.textContent = nombre;
                li.addEventListener('click', () => {
                    input.value = nombre;
                    suggestionsList.innerHTML = '';
                });
                li.addEventListener('mouseenter', () => {
                    currentIndex = index;
                    highlightSuggestion(index);
                });
                suggestionsList.appendChild(li);
            });

        } catch (error) {
            /*console.error('Error fetching nombres:', error);*/
        }
    });

    input.addEventListener('keydown', function(e) {
        const items = suggestionsList.getElementsByTagName('li');
        if (items.length === 0) return;
        if (e.key === 'ArrowDown') {
            currentIndex = (currentIndex + 1) % items.length;
            highlightSuggestion(currentIndex);
        } else if (e.key === 'ArrowUp') {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            highlightSuggestion(currentIndex);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (currentIndex >= 0) {
                input.value = items[currentIndex].textContent;
                suggestionsList.innerHTML = '';
            }
        }
    });

    function highlightSuggestion(index) {
        const items = suggestionsList.getElementsByTagName('li');
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('highlight');
        }
        if (index >= 0) {
            items[index].classList.add('highlight');
        }
    }
});
