---
title: Git workflow for solo web dev
description: Git workflow for solo developers in web (front-end) projects
created: 2021-08-06
tags:
  - 'Git'
---

## Workflow tale

Once upon a time, a dwarf named Krevorook took a quest from a tree elf to build a static website and host it in CDN like Netlify. His journey was full of new discoveries… And befriending a ferocious beast, called GIT, was one of those. Following is a small account of the time they spend together.

After setting up the project, Krevorook created a new git repo.
So he had his _MAIN_ branch, where deployable (production) code lived.

```shell
git init
git add .
git commit -m 'init'
```

After creating a new Github repository, he added a remote.

```shell
git remote add origin https://github.com/user/repo.git
git push -u origin main
```

And `git push` worked well for him. He made a **home** page and deployed it.

Sometimes he bringed new files.

```shell
git add .
git commit -m 'added: .gitignore'
git push
```

Sometimes he polished existing ones.

```shell
git commit -am 'my message'
```

When Krevorook had forgotten to add some files or wrote an inaccurate message, he would correct himself.

```shell
git add .
git commit --amend -m 'new message'
```

But more often he just made trivial amendments.

```shell
git commit -a --amend --no-edit
```

He also has to make **contact** and **about** pages, which were obviously not production ready just yet.
So he created a new branch _DEV_ where the “actively developed” code lived.

```shell
git checkout -b dev
git push -u origin dev
```

He worked in sessions using pomodoro technique, 30 min work / 3 min break. One session usually took 2-3 hours followed by a minimum 1 hour break or change activity (nothing to do with coding or sitting).\
At the end of each session Krevorook had the urge to commit, even without a meaningful message.

```shell
git commit -am 'up'
```

It was ok to use dummy commits, because he could always clean up history.

```shell
git rebase -i HEAD~3
```

More often than not he checked out the current state.

```shell
git status
git log --graph --decorate --pretty=oneline --abbrev-commit
```

It was very repetitive. Therefore Krevorook turned to his precious pet, Bash, who was of great help for that sort of thing.

```shell
# ~/.bash_aliases
alias gs='git status'
alias gl='git log --graph --decorate --pretty=oneline --abbrev-commit'
alias gc='git commit -m'
alias gca='git commit -am'
```

At last, pages were production ready and craved to be introduced to WWW.

And Krevorook joined _DEV_ with _MAIN_.

```shell
git checkout main
git merge dev
git push
```

He has the website live with 3 pages: **home**, **contact** and **about**.
But **contact** and **about** pages were fast made, and maybe he should try to make them better.

So he made two new branches, _NEW-ABOUT-PAGE_ and _NEW-CONTACT-PAGE_, based on _DEV_, and worked tremendously on them.

```shell
git branch new-about-page dev
git branch new-contact-page dev
```

At some point the **new contact** page looked good, there was nothing to improve. So he joined the _NEW-CONTACT-PAGE_ branch with _DEV_ as a single commit. Then he pushed it all to production and cleaned up the repo, deleting the _NEW-CONTACT-PAGE_ branch.

```shell
# make sure everything is good, some adjustment is needed?
git checkout dev
git merge --squash new-contact-page
git commit -m "merge new-contact-page"

# deploy
git checkout main
git merge dev
git push

# delete
git branch -d new-contact-page
git push origin --delete new-contact-page
```

And what about the **about** page?\
Contarly to the contact page, the **new about** page looked not so good at all. So he decided to stick with the current one and moved on.

```shell
git branch -D new-about-page
git push origin --delete new-about-page
```

The end.

---

## Commands used

Create a new local repository

```shell
git init
```

Displays the status of your working directory, (show modified files).

```shell
git status
```

Displays all commits in the current branch’s history

```shell
git log
git log --graph --decorate --pretty=oneline --abbrev-commit
```

---

Add a file to your next commit (stage)

```shell
git add [file]
```

Add all files to your next commit

```shell
git add .
```

Replaces that last commit with your new, improved commit.

```shell
git add .
git commit --amend -m 'new message'
```

Trivial amendments

```shell
git commit -a --amend --no-edit
```

Add, remove, or combine Git commits

```shell
git rebase -i HEAD~[num of commits]
```

---

Create a new branch (**dev**) and switch to it

```shell
git checkout -b dev
```

Switch to another branch (**main**) and check it out into your working directory

```shell
git checkout main
```

Create a new branch (**dev**) in a remote repository

```shell
git push -u origin dev
```

Create a new branch (**feature**) based on some existing one (**dev**)

```shell
git branch feature dev
```

Merge (join) a specified branch (**feature**) into your current branch (**dev**)

```shell
git checkout dev
git merge feature
```

Merge a specified branch (**feature**) into your current branch (**dev**)
as a single commit

```shell
git checkout dev
git merge --squash feature
git commit -m "merge feature"
```

Delete a local branch (**feature**)

```shell
# safe delete
git branch -d feature

# delete without questions
git branch -D [failed-feature-branch]
```

Delete a remote branch (**feature**)

```shell
git push origin --delete feature
```
