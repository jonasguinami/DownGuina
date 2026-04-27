document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona todos os botões de download múltiplo da página
    const downloadButtons = document.querySelectorAll('.js-download-multiple');

    downloadButtons.forEach(button => {
        button.addEventListener('click', handleMultipleDownloads);
    });

    async function handleMultipleDownloads(event) {
        const button = event.currentTarget;
        
        // Lê os dados do botão clicado
        const arquivosRaw = button.getAttribute('data-arquivos');
        const packageName = button.getAttribute('data-package-name') || 'pacote';
        
        if (!arquivosRaw) return;

        // Converte a string separada por vírgulas em uma Array limpa
        const listaArquivos = arquivosRaw.split(',').map(arq => arq.trim());
        
        // Guarda o estado original do botão
        const originalContent = button.innerHTML;

        // --- Estado: Carregando/Iniciando ---
        button.classList.add('is-loading');
        button.innerHTML = `
            <svg class="dl-icon spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="2" x2="12" y2="6"></line>
                <line x1="12" y1="18" x2="12" y2="22"></line>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                <line x1="2" y1="12" x2="6" y2="12"></line>
                <line x1="18" y1="12" x2="22" y2="12"></line>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
            </svg>
            <span>Iniciando...</span>
        `;

        // Pequeno delay para o usuário perceber a ação
        await new Promise(resolve => setTimeout(resolve, 600));

        // --- Executa os downloads ---
        // Usamos um pequeno intervalo entre cada download para evitar bloqueio de popups do navegador
        for (let i = 0; i < listaArquivos.length; i++) {
            const nomeArquivo = listaArquivos[i];
            
            // Cria o link invisível e dispara
            const link = document.createElement('a');
            link.href = `./${nomeArquivo}`; // Caminho relativo ao index.html no seu rep
            link.download = nomeArquivo; // Sugere o nome original do arquivo
            link.style.display = 'none';
            
            document.body.appendChild(link);
            link.click();
            
            // Remove o link e aguarda um tiquinho antes do próximo (150ms)
            document.body.removeChild(link);
            await new Promise(resolve => setTimeout(resolve, 150));
        }

        // --- Estado: Sucesso ---
        button.classList.remove('is-loading');
        button.classList.add('is-success');
        button.innerHTML = `
            <svg class="dl-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Downloads Iniciados!</span>
        `;

        // Lembra o usuário de permitir múltiplos downloads se necessário
        console.log(`Verifique se o navegador permitiu múltiplos downloads para o pacote: ${packageName}`);

        // Volta ao estado original após 4 segundos
        setTimeout(() => {
            button.classList.remove('is-success');
            button.innerHTML = originalContent;
        }, 4000);
    }
});

// Adiciona uma animação de rotação simples via CSS injetado pelo JS para o ícone de loading
const style = document.createElement('style');
style.textContent = `
    @keyframes spin { 100% { transform: rotate(360deg); } }
    .dl-icon.spin { animation: spin 1s linear infinite; }
`;
document.head.appendChild(style);