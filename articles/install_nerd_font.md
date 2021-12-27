---
title: Install Nerd Font
description: Install Nerd Font on a linux distro
created: 2021-12-27
tags:
  - 'linux'
---

Go to [Nerd Fonts](https://www.nerdfonts.com/font-downloads) and download a font (for example, Hack)

```bash
cd Downloads/
unzip Hack.zip -d ~/.local/share/fonts/
fc-cache -fv
```
