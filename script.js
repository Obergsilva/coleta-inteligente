// Função para lidar com o cadastro
document.getElementById('formCadastro').addEventListener('submit',async function (event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const tipo = document.getElementById('tipo').value;
    
    try {
        const response = await fetch('/api/cadastro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, tipo }),
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById('mensagemCadastro').innerText = result.mensagem;
            this.reset();
        } else {
            document.getElementById('mensagemCadastro').innerText = `Erro: ${result.mensagem}`;
        }
    } catch (error) {
        document.getElementById('mensagemCadastro').innerText = 'Erro ao conectar ao servidor.';
    }
});

// Integração do mapa (placeholder)
document.getElementById('mapaContainer').innerHTML = `
    <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093744!2d144.9537363153214!3d-37.81627927975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d07966dafe0!2sRecycling%20Center!5e0!3m2!1sen!2sbr!4v1697576149871" 
        width="100%" 
        height="400" 
        style="border:0;" 
        allowfullscreen="" 
        loading="lazy">
    </iframe>
`;
