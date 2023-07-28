---
title: Install Nerd Font
description: Install Nerd Font on a linux distro
created: 2021-12-27
updated: 2023-07-28
tags:
  - 'linux'
---

## Install Fonts on [Ubuntu](https://ubuntu.com/) / [Debian](https://www.debian.org/)

Go to [Nerd Fonts](https://www.nerdfonts.com/font-downloads) and download a font (for example [Hack](https://github.com/source-foundry/Hack))

```bash
cd Downloads/
unzip Hack.zip -d ~/.local/share/fonts/
rm Hack.zip
fc-cache -fv
```

Font family name - `Hack Nerd Font`.

Or download the latest release of [Intel One Mono Typeface](https://github.com/intel/intel-one-mono/releases).
`.ttf` format is recommended for desktop use.

```bash
cd Downloads/
unzip intel-one-mono-1.2.1
cp intel-one-mono-1.2.1/fonts/ttf/* ~/.local/share/fonts/
rm -rf intel-one-mono-1.2.1
rm intel-one-mono-1.2.1.zip
fc-cache -fv
```

Font family name - `IntelOne Mono`.
