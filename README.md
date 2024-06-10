# Weather App
Este é um aplicativo de previsão do tempo desenvolvido como parte de um teste de emprego. Ele permite aos usuários buscar informações meteorológicas de diferentes cidades.

- Funcionalidades
Busca por nome de cidade para obter informações detalhadas.
Exibição de previsão do tempo atual e dos próximos dias.
Unidade de temperatura configurável (Celsius ou Fahrenheit).
Interface responsiva e intuitiva.

# Pré-requisitos
Antes de iniciar, verifique se você tem instalado:

Node.js (versão 12 ou superior)
Angular CLI
Para Dockerização (opcional):

Docker



Clone o repositório:


# Copiar código
git clone -----
cd weather-app
Instale as dependências:


# Copiar código
npm install

# Configuração
Obtenha uma chave de API do Weather API:

Vá para Weather API e obtenha uma chave de API gratuita.
Configure a chave de API:

Renomeie o arquivo .env.example para .env.

Insira sua chave de API no arquivo .env:

plaintext
Copiar código
API_KEY=sua_chave_de_api_aqui
Uso
Inicie o servidor de desenvolvimento:

bash
Copiar código
npm start
Acesse o aplicativo:

Abra o navegador e vá para http://localhost:4200.

Pesquise uma cidade:

Digite o nome de uma cidade na caixa de pesquisa e pressione "Enter".
Clique nos botões "Detalhes" ou "Previsão do Tempo" para mais informações
