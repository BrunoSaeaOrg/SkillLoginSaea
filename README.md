# Skill: criar-login-saea

Skill do Claude Code que cria a tela de login padrão SAEA (HTML, CSS, TS) — header com a
cor institucional, logo do sistema, painel centralizado e rodapé de copyright SAEA.

Este repositório é distribuído como um **plugin do Claude Code**: a instalação é feita
pelos comandos `/plugin`, sem precisar clonar nada nem criar pasta na mão.

## Como instalar (recomendado — via plugin)

Dentro do Claude Code, rode os dois comandos abaixo (uma vez só):

```text
/plugin marketplace add BrunoSaeaOrg/SkillLoginSaea
/plugin install criar-login-saea@SkillLoginSaea
```

O Claude Code baixa o plugin, coloca tudo no lugar certo e ativa a skill sozinho.
Depois disso ela fica disponível como `/criar-login-saea`.

> O usuário **não digita nenhum comando git**. O Claude Code usa o git internamente
> para baixar o plugin, então o git só precisa estar **instalado** na máquina
> (pré-requisito normal de quem usa Claude Code).

## Como atualizar

```text
/plugin marketplace update SkillLoginSaea
```

Isso puxa a versão mais nova publicada no repositório.

## Como desinstalar

```text
/plugin uninstall criar-login-saea@SkillLoginSaea
```

## Estrutura do repositório

```text
SkillLoginSaea/
├── .claude-plugin/
│   ├── plugin.json          # metadados do plugin
│   └── marketplace.json     # permite o /plugin marketplace add
├── skills/
│   └── criar-login-saea/
│       ├── SKILL.md         # instruções da skill
│       └── resources/       # arquivos de referência (login component, toast, etc.)
└── README.md
```
