# Skill: criar-login-saea

Skill do Claude Code que cria a tela de login padrão SAEA (HTML, CSS, TS) — header com a
cor institucional, logo do sistema, painel centralizado e rodapé de copyright SAEA.

O repositório é a própria skill: `SKILL.md` + a pasta `resources/` com os arquivos de referência.

## Como instalar

A skill precisa ficar em `~/.claude/skills/criar-login-saea/` (skill pessoal) ou em
`.claude/skills/criar-login-saea/` dentro de um projeto (skill compartilhada via git do projeto).

Entre na sua própria pasta de skills e clone com o nome `criar-login-saea`.
O `~` já aponta para a pasta do usuário logado — cada pessoa cai no próprio perfil,
sem caminho fixo de ninguém.

### Windows (PowerShell)

```powershell
mkdir "$HOME\.claude\skills" -Force
git clone https://github.com/BrunoSaeaOrg/SkillLoginSaea.git "$HOME\.claude\skills\criar-login-saea"
```

### macOS / Linux / Git Bash

```bash
mkdir -p ~/.claude/skills
git clone https://github.com/BrunoSaeaOrg/SkillLoginSaea.git ~/.claude/skills/criar-login-saea
```

> Importante: o nome da pasta de destino deve ser `criar-login-saea` (igual ao campo
> `name:` no `SKILL.md`), não `SkillLoginSaea`.

Reinicie o Claude Code e a skill fica disponível como `/criar-login-saea`.

## Como atualizar

```bash
cd ~/.claude/skills/criar-login-saea
git pull
```
