---
title: Multiple git accounts
description: Manage multiple git accounts on same linux machine
created: 2022-01-30
tags:
  - 'git'
  - 'linux'
---

# Multiple git accounts

Recently, I've reinstalled linux on my old laptop. And I wanted to set up git in a way that I could manage multiple accounts. Essentially, I aimed to be able to do `git pull & push` without typing every time username and password.

So, I googled a little bit and found a good starting point - make separation by directories. Example: `~/code/work/` and `~/code/personal/` - for work and personal usage respectively.

It's okay, but I want to have a default account available from the HOME directory `~/` for _.dotfiles_ and other stuff. And then in `~/code/[USER]/` - switch to another account for specific use.

---

Let's have two users: Diogenes (default) and Epicurus (secondary).

After installing git, I set it up as usual.

```bash
git config --global user.name "Diogenes the Cynic"
git config --global user.email diogenes@example.com

git config --global credential.helper store
```

Last line just tells git to store credentials in a default file, `~/.git-credentials`. This is a file where I place personal access token (PAT) for default account (Diogenes). Note, it is all in plain text, so not secure. But I am willing to take the risk, besides I am not storing passwords, only PAT. PAT actually is a pretty good idea. I can generate one with limited/minimum rights, just read/write permissions, and use in my laptop (where I may experiment with stuff). So even if PAT is stolen or something, my password is secure. I just revoke that PAT.

The format is `https://[USERNAME]:[ACCES_TOKEN]@[gitlab.com | github.com]`. So, I go to gitlab, generate PAT, and add following the line.

```git
https://diogenes:super-secure-PAT@gitlab.com
```

So, now I can `git pull & push` to gitlab without typing credentials in any directory as Diogenes.

Up to this point `~/.gitconfig` looks like this:

```git
[user]
  name = Diogenes
  email = diogenes@example.com

[credential]
  helper = store
```

Now it's time to add a new account, Epicurus.

First, I make new dir `~/code/epicurus/`

Second, I add to `~/.gitconfig` lines that tell git to apply different config depending on the directory I am currently in.

```git
[includeIf "gitdir:~/code/epicurus/"]
  path = ~/code/epicurus/.gitconfig
```

Third, I configure new git user `~/code/epicurus/.gitconfig` and specify where to find credentials.

```git
[user]
  name = Epicurus
  email = epicurus@example.com

[credential]
  helper = store --file=/home/diogenes/code/epicurus/.git-credentials
```

Fourth, I grab PAT and store it in `~/code/epicurus/.git-credentials`

```git
https://epicurus:[ACCES_TOKEN]@gitlab.com
```

And now in directory tree `~/code/epicurus/` I can `git pull & push` to gitlab without typing credentials as Epicurus, and everywhere else as Diogenes.

---

File structure

```git
.git-credentials
.gitconfig

└─ code
   └─ epicurus
      ├─ .git-credentials
      └─ .gitconfig
```

Content

`~/.gitconfig`

```git
[user]
  name = Diogenes
  email = diogenes@example.com

[credential]
  helper = store

[includeIf "gitdir:~/code/epicurus/"]
  path = ~/code/epicurus/.gitconfig
```

`~/.git-credentials`

```git
https://diogenes:[ACCES_TOKEN]@gitlab.com
```

`~/code/epicurus/.gitconfig`

```git
[user]
  name = Epicurus
  email = epicurus@example.com

[credential]
  helper = store --file=/home/diogenes/code/epicurus/.git-credentials
```

`~/code/epicurus/.git-credentials`

```git
https://epicurus:[ACCES_TOKEN]@gitlab.com
```
