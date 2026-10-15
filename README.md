# Forno & Brasa — Pizzaria Artesanal

Site responsivo de pizzaria feito com HTML, CSS e JavaScript puro.

## Arquivos principais
- `index.html`: estrutura do site, seções, cardápio e janela do pedido.
- `style.css`: identidade visual responsiva para celular e computador.
- `script.js`: filtros do cardápio, carrinho, cálculo de total e finalização pelo WhatsApp.

## Como visualizar
Abra `index.html` no navegador. Para desenvolver, abra a pasta no VS Code e use a extensão Live Server.

## Antes de publicar
1. Abra `script.js`.
2. Altere `WHATSAPP_NUMBER` para o número comercial no formato internacional, somente dígitos. Exemplo fictício para Santa Catarina: `5548999999999`.
3. Ajuste `DELIVERY_FEE` conforme a taxa de entrega, em reais.
4. Confira nome, preços, ingredientes, fotos e horários em `index.html`.
5. Troque o nome de demonstração “Forno & Brasa” pelo nome real da pizzaria, se necessário.
6. Teste o site no celular e no computador antes de divulgar.

## Publicar com GitHub Pages
1. Abra as configurações do repositório no GitHub.
2. Entre em **Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Selecione a branch `main` e a pasta `/(root)`, depois salve.
5. Aguarde a publicação e use o endereço informado pelo GitHub Pages.

## Observações
- Nome e preços são exemplos editáveis.
- As imagens vêm de URLs externas do Unsplash; é necessário internet para carregá-las.
- O site monta o pedido e abre o WhatsApp para confirmação. Não processa pagamentos nem armazena pedidos em banco de dados.
- O número do WhatsApp precisa ser configurado para habilitar a finalização.
