---
title: Snippets for vscode
description: My javascript & vue snippets for vscode
created: 2021-06-01
tags:
  - 'VSCode'
  - 'JS'
  - 'Vue'
  - 'CSS'
---

## `javascript.json`

Javascript:

```json
{
  "log as obj prop": {
    "prefix": "clgo",
    "body": "console.log({ $1 })\n${2}",
    "description": "log value as object prop"
  },
  "import module": {
    "prefix": "imm",
    "body": "import ${1} from '${1:module}'\n${3}",
    "description": "import entire module"
  },
  "import name": {
    "prefix": "imn",
    "body": "import {${2:name}} from '${1:module}'\n${3}",
    "description": "import { name } from module"
  },
  "function()": {
    "prefix": "fn",
    "body": ["function ${1:name}(${2:params}) {\n\t${3}\n}"],
    "description": "normal function()"
  },
  "async function()": {
    "prefix": "asfn",
    "body": ["async function ${1:name}(${2:params}) {\n\t${3}\n}"],
    "description": "async function()"
  },
  "export function": {
    "prefix": "efn",
    "body": ["export ${1:default} ${2:async} function ${3:name}(${4:params}) {\n\t${5}\n}"],
    "description": "async function()"
  },
  "anonymous =>": {
    "prefix": "aaf",
    "body": "(${1:params}) => {\n\t${2}\n}",
    "description": "anonymous arrow function"
  },
  "named =>": {
    "prefix": "naf",
    "body": "const ${1:name} = (${2:params}) => {\n\t${3}\n}",
    "description": "named arrow function"
  },
  "return": {
    "prefix": "r",
    "body": "return ${0}",
    "description": "return keyword"
  },
  "await": {
    "prefix": "a",
    "body": "await ${0}",
    "description": "await keyword"
  },
  "const variable": {
    "prefix": "cconst",
    "body": "const ${1} = ${2}",
    "description": "const variable"
  },
  "let variable": {
    "prefix": "llet",
    "body": "let ${1} = ${2}",
    "description": "let variable"
  },
  "destruct variable": {
    "prefix": "dconst",
    "body": "const {${2:name}} = ${1}\n${3}",
    "description": "destruct variable"
  },
  "ternary": {
    "prefix": "ternary",
    "body": "${1:condition} ? ${2:true} : ${3:false}",
    "description": "ternary statement"
  },
  "stringify JSON": {
    "prefix": "str",
    "body": "JSON.stringify($0)",
    "description": "JSON.stringify()"
  }
}
```

Vue:

```json
{
  "vue data": {
    "prefix": "vdata",
    "body": "data: () => ({ ${1:key}: ${2:false}, ${3} }),\n${4}",
    "description": "vue data()"
  },
  "vue components": {
    "prefix": "vcomponents",
    "body": "components: { \n\t${1:name}, \n},\n${2}",
    "description": "vue components"
  },
  "vue props": {
    "prefix": "vprops",
    "body": "props: { ${1:name}: ${2|String,Number,Boolean,Array,Object,Function,Promise|}, ${3} },\n${4}",
    "description": "vue props"
  },
  "vue setup": {
    "prefix": "vsetup",
    "body": "setup(${1:props}) {\n\t${2}\n}",
    "description": "vue setup"
  }
}
```

## `css.json`

CSS:

```json
{
  "Variable": {
    "prefix": "var",
    "body": ["var(--$1)"],
    "description": "Variable"
  },
  "Clamp": {
    "prefix": "clamp",
    "body": ["clamp(${1:1rem}, ${2:5vw}, ${3:2.5rem})"],
    "description": "Clamp"
  },
  "Media screen": {
    "prefix": "media screen",
    "body": ["@media only screen and (${1|min-width,max-width|}: ${2:740}px) { \n\t$3\n}"],
    "description": "Media screen"
  },
  "Supports hover": {
    "prefix": "media hover",
    "body": ["@media (hover: hover) { \n\t$1\n}"],
    "description": "Supports hover"
  }
}
```
