---
title: Install Neovim
description: Install Neovim on a linux distro as an appimage
created: 2021-12-27
updated: 2022-11-04
tags:
  - 'linux'
  - 'neovim'
---

## Install

Install Neovim on linux as an appimage in [the recommended directory](https://docs.appimage.org/user-guide/faq.html#question-where-do-i-store-my-appimages)
`~/.local/bin/` (Ubuntu / Debian), or in `~/bin/` (OpenSUSE).

```bash
cd .local/bin/

curl -LO https://github.com/neovim/neovim/releases/latest/download/nvim.appimage
chmod u+x nvim.appimage
./nvim.appimage
```

This should install and open Neovim. Then run a health check. You may need to install additional dependencies, like **build-essential** or equivalent.

```bash
:checkhealth
```

Update shell aliases.

```bash
alias nvim='/home/[USERNAME]/.local/bin/nvim.appimage'

# .local/bin is often added to $PATH, so
alias nvim='nvim.appimage'

alias vi='nvim'
```

Create config file.

```bash
touch ~/.config/nvim/init.vim
# or symlink it if you have one
ln -s ~/.dotfiles/nvim ~/.config/nvim
```

Separate config if nvim is embedded in VSCode.

```vim
if exists('g:vscode')
  " vscode-neovim config
  finish
endif

" neovim config
```

---

## Using with VSCode.

1. Install [VSCode Neovim plugin](https://marketplace.visualstudio.com/items?itemName=asvetliakov.vscode-neovim)

2. Update settings

```json
{
	"vscode-neovim.neovimExecutablePaths.linux": "/home/[USERNAME]/.local/bin/nvim.appimage",

	"editor.cursorBlinking": "solid",
	"keyboard.dispatch": "keyCode" // if CapsLock changed to Esc
}
```

3. Optional: add [which-key plugin](https://marketplace.visualstudio.com/items?itemName=VSpaceCode.whichkey)

4. Optional: add keybindings

---

## Customize

Make CapsLock an additional Esc.

May need some build libs for tree-sitter to compile (for Ubuntu / Debian).

```bash
sudo apt install build-essential
```

Install plugin manager [Plug](https://github.com/junegunn/vim-plug).

```bash
sh -c 'curl -fLo "${XDG_DATA_HOME:-$HOME/.local/share}"/nvim/site/autoload/plug.vim --create-dirs \
       https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
```

Then open Neovim `$ nvim` and install plugins.

```bash
:PlugIstall
```

Prerequisites: Node and NPM to use LSP, install with [FNM](https://github.com/Schniz/fnm), for faster shell startup, or with [NVM](https://github.com/nvm-sh/nvm)

Install [LSP servers](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md)

```bash
# javascript & typescript (.js & .ts)
npm i -g typescript typescript-language-server

# css & html & json
npm i -g vscode-langservers-extracted

# svelte
npm i -g svelte-language-server

# vim
npm i -g vim-language-server

# emmet
npm i -g emmet-ls

# all
npm i -g typescript typescript-language-server vscode-langservers-extracted svelte-language-server vim-language-server emmet-ls
```

Install utils for typescript server development.

```bash
npm i -g ts-node @swc/core @swc/helpers
```

Install [nodemon](https://github.com/remy/nodemon/), for automatically restart your server.

```bash
npm install -g nodemon
```

Install [prettierd](https://github.com/fsouza/prettierd), for instant formatting.

```bash
npm install -g @fsouza/prettierd
```

Install [ripgrep](https://github.com/BurntSushi/ripgrep) & [fd](https://github.com/sharkdp/fd) for faster search with [Telescope](https://github.com/nvim-telescope/telescope.nvim).

```bash
sudo apt install ripgrep fd-find
```

Clipboard copy/paste support.

```shell
sudo apt install xsel
```

All deps for Ubuntu / Debian

```shell
sudo apt install build-essential xsel ripgrep fd-find
```

---

Recommended terminal: [kitty](https://sw.kovidgoyal.net/kitty/binary/)

---

Here [my nvim config](https://github.com/diogenesofweb/dotfiles/tree/main/nvim)
