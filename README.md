# Skill: criar-login-saea

Plugin do **Claude Code** que gera a **tela de login padrão SAEA** (Angular + Material):
header com a cor institucional, logo do sistema, painel de login centralizado e rodapé
de copyright SAEA. A skill copia os arquivos de referência, ajusta assets, ícones
responsivos, toast de feedback e mensagens de erro seguras.

---

## ⚠️ Onde rodar os comandos `/plugin` (leia antes)

Os comandos `/plugin` **só funcionam no Claude Code CLI** (o `claude` rodando no terminal).

| Ambiente | `/plugin` funciona? |
|---|---|
| **Claude Code CLI** (`claude` no terminal) | ✅ **Sim** |
| Claude Desktop (app) | ❌ Não → dá *"Habilidade desconhecida: plugin"* |
| CMD / PowerShell puro | ❌ Não → `/plugin` não é comando do Windows |

O terminal pode ser **CMD, PowerShell, Windows Terminal, Git Bash ou o terminal da sua IDE** —
tanto faz. O importante é entrar no `claude` primeiro.

## Pré-requisitos

- **Node.js** instalado (LTS) — necessário para o Claude Code CLI e para o Angular.
- **Git** instalado (o Claude Code usa internamente para baixar o plugin; você **não**
  digita comandos git).
- **Claude Code CLI atualizado** (versão recente). Se der erro na instalação, rode
  `claude update` e confira com `claude --version`.
- Para **aplicar** a skill: um **projeto Angular** com **Angular Material**. Se ainda não
  tiver, a skill orienta a criar (`ng new`) e instalar o Material (`ng add @angular/material`).

## Instalação (uma vez só)

1. Abra o terminal e inicie o Claude Code CLI:
   ```text
   claude
   ```
   (na primeira vez ele pede login — faça o login no navegador que abrir).

2. Já **dentro** do `claude`, rode os comandos **um por vez** (não cole os dois na mesma linha):
   ```text
   /plugin marketplace add BrunoSaeaOrg/SkillLoginSaea
   ```
   ```text
   /plugin install criar-login-saea@SkillLoginSaea
   ```

3. **Reinicie a sessão do Claude Code** para a skill carregar.

Pronto — a skill fica disponível como **`/criar-login-saea`**.

## Como usar

Abra o Claude Code **na pasta do seu projeto Angular** e rode:

```text
/criar-login-saea
```

Ou peça em linguagem natural: *"crie a tela de login padrão SAEA"*.

### O que a skill faz
- Cria/atualiza o componente de login (`login.component.ts/html/scss`).
- Cria o `FeedbackService` (toast padrão SAEA) e configura os estilos globais.
- Ajusta `index.html` (favicon + fontes de ícones Material, incluindo os *outlined* no mobile).
- Configura a rota de login e o Angular Material.
- Se já existir um login, faz **diff** e preserva a lógica de autenticação existente.

### O que você precisa fornecer / ajustar depois
- **3 imagens** na pasta de assets servida (normalmente `public/assets/img/` em Angular
  moderno — a skill lê o `angular.json` para descobrir a pasta certa):
  - `logo.png` — selo circular do card de login
  - `logo-saea-header.png` — logo branca do header
  - `logo-saea-navegador.png` — selo do rodapé/favicon
- **Autenticação**: a skill não inclui o `AuthService`. Crie/ajuste o endpoint real
  (ex.: middleware TOTVS RM em `/api_ramais/api/auth/login`) e a rota de destino pós-login.
- Troque o texto **"Nome do Sistema"** pelo nome real do sistema.

## Atualizar / desinstalar

```text
/plugin marketplace update SkillLoginSaea
/plugin uninstall criar-login-saea@SkillLoginSaea
```

## Solução de problemas

| Erro | Causa | Solução |
|---|---|---|
| `Habilidade desconhecida: plugin` | Você está no **Claude Desktop**, não no CLI | Use o `claude` no terminal |
| `'... /plugin install ...' is not a valid GitHub owner/repo` | Colou os **dois comandos juntos** no campo do source | Responda o source só com `BrunoSaeaOrg/SkillLoginSaea` e rode o `install` **depois**, separado |
| `This plugin uses a source type your Claude Code version does not support` | CLI desatualizado **ou** erro no `marketplace.json` | `claude update`; e valide o manifesto com `claude plugin validate .` |
| Skill não aparece após instalar | Sessão precisa recarregar | Feche e reabra o `claude` |
| `<img>` quebrado (só o texto do `alt`) | Imagem na pasta de assets errada | Coloque os PNGs na pasta servida (veja `assets` no `angular.json`) |

> Dica para mantenedores: antes de publicar mudanças no `marketplace.json`/`plugin.json`,
> valide com `claude plugin validate .` na raiz do repositório.

## Estrutura do repositório

```text
SkillLoginSaea/
├── .claude-plugin/
│   ├── plugin.json          # metadados do plugin
│   └── marketplace.json     # habilita o /plugin marketplace add
├── skills/
│   └── criar-login-saea/
│       ├── SKILL.md         # instruções da skill
│       └── resources/       # arquivos de referência (componente, toast, etc.)
└── README.md
```
