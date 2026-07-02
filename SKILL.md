---
name: criar-login-saea
description: Cria uma tela de login padrão SAEA (HTML, CSS, TS) exatamente igual ao projeto de referência, incluindo o header com cor institucional, logo do sistema, painel centralizado (Material UI) e rodapé de copyright SAEA.
---

# Template de Login SAEA Completo

Quando o usuário pedir para criar ou configurar uma tela de login usando esta skill, siga estas instruções rigorosamente para implementar o template de login padrão da SAEA.

## Instruções

0. **LOGIN JÁ EXISTENTE (fazer diff, não substituir cegamente):** Antes de copiar qualquer coisa, verifique se o projeto JÁ possui uma tela de login funcionando. Se possuir, trate os arquivos de `resources` como **referência**, não como substituição literal: faça um diff e traga apenas o que falta ou está fora do padrão (estrutura visual header/card/footer, estilos, ícones responsivos, toast, mensagens de erro seguras). **Preserve a lógica de negócio que o projeto já resolveu** — em especial o método de autenticação (ex.: cookie HttpOnly vs. JWT em `sessionStorage`), a assinatura do `AuthService` e a rota de redirecionamento pós-login (pode ser `/home`, `/signature`, etc.). Não troque comportamento existente só para bater com o texto da skill; adapte o template ao projeto.

1. Localize ou crie o componente de login no projeto (ex: `src/app/login/`).

2. Copie rigorosamente todo o conteúdo dos 3 arquivos de referência (`login.component.html`, `login.component.scss`, `login.component.ts`) localizados na pasta `resources` desta skill para o componente de destino.

3. Importante: Você DEVE garantir que a estrutura contemple o `<div class="auth-page-wrapper">` externo, o header (`<header class="auth-top-header">`) e o footer (`<footer class="saea-footer">`), mantendo as classes flexíveis.

   **RODAPÉ SEM FUNDO (UI/UX)**: O rodapé de copyright (`.saea-footer`, com o texto "© {ano} DESENVOLVIDO POR SISTEMAS SAEA") NUNCA deve ter cor de fundo (nada de `background-color`). Ele deve ficar transparente (`background: transparent;`) para se integrar à página, e usar `pointer-events: none;` para não interceptar cliques. Um fundo cinza/colorido atrás do texto é considerado erro visual.

4. Verifique os arquivos de imagens/logos. A tela espera que existam 3 arquivos de imagem específicos:
   - `logo-saea-header.png` (Logo branco do globo, usado no Header Superior)
   - `logo-saea-navegador.png` (Logo pequeno selo cinza, usado no Footer)
   - `logo.png` (Selo redondo do globo SAEA, logo principal usada centralizada dentro do card de login, na classe `.logo-login`). IMPORTANTE: use este arquivo `logo.png` (selo circular), NÃO a versão horizontal com o texto "SAEA" ao lado — a `.logo-login` é calibrada para um emblema quadrado/circular.

   **OBRIGATÓRIO — DESCUBRA A PASTA DE ASSETS ANTES DE COPIAR/REFERENCIAR IMAGENS:** NÃO assuma que os assets ficam em `src/assets/img/`. Abra o `angular.json` e leia `architect.build.options.assets` (campo `input`/`glob`) para descobrir qual pasta é realmente servida — em muitos projetos Angular modernos é `public/` (então `src="assets/img/logo.png"` resolve para `public/assets/img/logo.png`, e uma pasta `src/assets/img/` pode existir mas NÃO ser servida). Coloque/gere os 3 arquivos na pasta servida correta. Sintoma clássico de erro: o `<img>` aparece quebrado mostrando só o texto do `alt` — quase sempre é caminho apontando para uma pasta que não é servida. Se precisar gerar o `logo.png` (selo circular) a partir de uma logo horizontal existente, recorte o quadrado à esquerda (lado = altura da imagem) e salve na pasta servida.

5. No `login.component.ts`, garanta as importações do Angular Material e o ajuste da injeção do `AuthService` e roteamento conforme a arquitetura daquele projeto.

6. Substitua o texto "Nome do Sistema" no HTML pelo nome real do projeto atual.
7. OBRIGATÓRIO: Verifique o arquivo `src/styles.scss` (estilos globais) do projeto e adicione a regra `body { margin: 0; }` caso não exista, para que o cabeçalho grude perfeitamente no topo e laterais da tela.

8. DEPENDÊNCIA: O componente depende nativamente do Angular Material. Você deve certificar-se de que o projeto do usuário já possui o Material instalado. Se não possuir, execute o comando: `npx @angular/cli add @angular/material` (ou via npm) e garanta que estilos, fontes Roboto e ícones do Material sejam configurados.

9. ALINHAMENTO E ALTURA DO CARD: Para o cabeçalho do card de login (onde ficam o logo e o título), NUNCA envolva o conteúdo na tag `<mat-card-header>`. Além de inserir classes padrão (`mat-mdc-card-header-text`) que quebram o alinhamento centralizado, o `<mat-card-header>` aplica margens/paddings próprios do Material que **comprimem a altura vertical do card**, deixando-o visivelmente mais baixo do que o padrão da skill. A estrutura correta usa APENAS uma `<div class="login-header-section">` como filha direta do `<mat-card>` (logo + `<mat-card-title>` dentro dela), exatamente como nos arquivos de referência. Estrutura correta:

    ```html
    <mat-card class="login-card">
      <div class="login-header-section">
        <img src="assets/img/logo.png" alt="SAEA Logo" class="logo-login">
        <mat-card-title>Entre com suas credenciais do <br class="mobile-break">TOTVS</mat-card-title>
      </div>
      <mat-card-content>...</mat-card-content>
    </mat-card>
    ```

    **VERIFICAÇÃO:** Ao adaptar um login já existente, confira se há um `<mat-card-header>` sobrando envolvendo a `.login-header-section` e remova-o — esse é o erro mais comum que faz o card ficar com altura menor que a do template.

10. FAVICON: Atualize o arquivo `src/index.html` para substituir o favicon padrão do Angular/Vite pelo logo preto e branco/cinza. Altere a tag `<link rel="icon">` para `<link rel="icon" type="image/png" href="assets/img/logo-saea-navegador.png">`.

11. VISÃO MOBILE: No CSS (`login.component.scss`), garanta que na visão padrão (mobile) a classe `.login-card` tenha fundo transparente (`background: transparent !important;`) e sem sombra, e que a aparência de "card" seja ativada apenas a partir da media query de 601px.

12. ÍCONES RESPONSIVOS: Os ícones dos campos de login devem ser "vazados" (outlined) na versão mobile e "sólidos" (filled) no desktop. Para isso, o `index.html` deve carregar ambas as fontes: `<link href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined" rel="stylesheet">`. No HTML, utilizamos uma única tag `<mat-icon>` com a classe `.responsive-icon`, que altera dinamicamente a propriedade `font-family` via media query no CSS, garantindo performance e evitando bugs de sobreposição.

13. **HIERARQUIA VISUAL E LOGO CENTRAL (UI/UX)**: A nova identidade de login utiliza a logo principal do sistema (`.logo-login`, o selo circular `logo.png`) centralizada dentro do card. O título da página (`<mat-card-title>`) deve ser mantido puro, sem classes adicionais de estilo (não force tamanhos ou pesos), para que ele herde a tipografia centralizada e o tamanho adequado do Angular Material. O card de login em desktop possui bordas mais arredondadas (`border-radius: 16px`) e, na visão mobile (`max-width: 600px`), deve perder suas bordas e fundo (`background: transparent !important; box-shadow: none !important;`) integrando-se perfeitamente com a página. O CSS deve seguir as media-queries com breakpoints (`max-width: 768px`, `600px`, `380px`) para escalar os componentes (tamanho da logo, fontes, inputs e botões) dinamicamente.

    **TAMANHO DA LOGO CENTRAL (`.logo-login`)**: Por se tratar de um selo circular/quadrado, a logo NUNCA deve ficar maior no mobile do que no desktop (erro comum ao herdar valores pensados para logos horizontais). Use esta escala como padrão recomendado (`max-width`): desktop `90px` → `≤768px`: `80px` → `≤600px`: `72px` → `≤380px`: `64px`. Regra geral de UI/UX: para emblemas circulares em telas de login, mantenha a logo mobile entre **64px e 80px**. (Se algum projeto usar uma logo horizontal com texto, aí sim é aceitável uma largura maior, ~120px.)

14. **ESTADO DESABILITADO DO BOTÃO (UI/UX)**: Nunca aplique cores via `style="background-color: ..."` inline na tag `<button>`, pois isso impede que o Material Design aplique as elevações corretas. Defina a cor principal na classe `.login-button` no SCSS através das variáveis nativas do MDC (ex: `--mdc-protected-button-container-color: #2e9cb5;`). E defina a cor para o estado `:disabled` / `.mat-mdc-button-disabled` (ex: `#e2e8f0`) para dar o feedback visual de botão "apagado/mutado" quando o formulário estiver incompleto.

15. NOTIFICAÇÕES (TOAST): O login pode precisar emitir alertas (senha incorreta, etc.). Copie o arquivo `feedback.service.ts` da pasta `resources` desta skill para o projeto (ex: `src/app/core/services/`). Em seguida, copie o conteúdo do arquivo `toast-styles.css` presente em `resources` e adicione no final do arquivo `src/styles.css` global do projeto para garantir o funcionamento visual e as animações do toast padrão da SAEA.

## Autenticação com TOTVS RM

Ao implementar o login, siga esta recomendação para consumir a API da TOTVS RM:

16. **Abordagem via Middleware (Recomendada)**: O Angular deve enviar o `username` e `password` via POST para uma API intermediária (Backend próprio em C# ou Node.js, como `/api_ramais/api/auth/login`). Esta API própria assumirá a responsabilidade de validar as credenciais diretamente com a TOTVS RM e então gerar/devolver um Token JWT para a aplicação Angular gravar no `sessionStorage`. Essa abordagem previne erros de CORS e mantém as credenciais/sessões da TOTVS protegidas no servidor.

17. **Abordagem Direta (Basic Auth)**: Se for estritamente requisitado pelo usuário consumir o RM direto do Angular: configure o arquivo `proxy.conf.json` para criar uma rota que passe pelo proxy (evitando bloqueio de CORS). No `auth.service.ts`, implemente as chamadas HTTP enviando o cabeçalho de autenticação utilizando Base64: `Authorization: Basic ' + btoa(usuario + ':' + senha)`.

18. **MENSAGENS DE ERRO (SEGURANÇA)**: Ao tratar a requisição de login (ex: no `login.component.ts`), **NUNCA** exiba as mensagens de erro brutas devolvidas pelo ERP/API para o usuário (pois podem conter dados sensíveis ou jargões de sistema). Intercepte o erro: se for 401, exiba um Toast genérico `"Usuário ou senha inválidos."`. Para demais erros, exiba `"Falha de comunicação com o servidor."`.
