---
title: Write linux bootable USB
description: How to create a bootable Live-USB stick of a linux distro in the terminal
created: 2021-12-27
tags:
  - 'linux'
---

A lot of distros have some sort of live-USB creator pre-installed.
But not all, and sometimes that creator doesn't allow other distros images to be made.

So, it's much faster just to use the terminal than search for a good USB maker and install it.

---

Commands used.

```bash
sudo fdisk -l
readlink -f [FILE]
sudo dd bs=4M if=[PATH/TO/IMAGE] of=/dev/sd[letter] status=progress oflag=sync
```

---

Find the path of the inserted USB-key.

```bash
sudo fdisk -l
```

Example, usually `/dev/sdb` is the path of the USB-key.

```bash
$ sudo fdisk -l
# ...
Disk /dev/sdb: 7,47 GiB, 8019509248 bytes, 15663104 sectors
Disk model: USB Flash Drive
# ...
```

---

Full path of the file.

```bash
readlink -f [FILE]
```

Example, first I downloaded [Kubuntu](https://kubuntu.org/) 20.04 image.

```bash
~
$ cd Downloads/

~/Downloads
$ ls
kubuntu-20.04.3-desktop-amd64.iso

~/Downloads
$ readlink -f kubuntu-20.04.3-desktop-amd64.iso
/home/diogenes/Downloads/kubuntu-20.04.3-desktop-amd64.iso
```

---

Write Live-USB.
The USB-key must be unmounted.

```bash
sudo dd bs=4M if=[PATH/TO/IMAGE] of=/dev/sd[letter] status=progress oflag=sync
```

Example.

```bash
sudo dd bs=4M if=/home/diogenes/Downloads/kubuntu-20.04.3-desktop-amd64.iso
 of=/dev/sdb status=progress oflag=sync
```
