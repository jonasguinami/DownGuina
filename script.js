document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('download-btn');

    downloadBtn.addEventListener('click', () => {
        // Salva o texto original
        const originalText = downloadBtn.textContent;
        
        // Altera o texto e adiciona a classe CSS de sucesso
        downloadBtn.textContent = 'Baixando...';
        downloadBtn.classList.add('baixando');

        // Retorna ao estado normal após 2.5 segundos
        setTimeout(() => {
            downloadBtn.textContent = originalText;
            downloadBtn.classList.remove('baixando');
        }, 2500);
    });
});