# vue-easy-print

[![npm](https://img.shields.io/npm/v/vue-easy-print.svg) ![npm](https://img.shields.io/npm/dm/vue-easy-print.svg)](https://www.npmjs.com/package/vue-easy-print)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

Use the vue component slot for template printing Use iframe to copy the print area

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)

# Installation

```
npm install --save vue-easy-print
```

## Default import

Install all the components:

```javascript
import Vue from 'vue'
import VueEasyPrint from 'vue-easy-print'

Vue.use(VueEasyPrint)
```

Use specific components:

```javascript
import Vue from 'vue'
import { Test } from 'vue-easy-print'

Vue.component('test', Test)
```

**⚠️ A css file is included when importing the package. You may have to setup your bundler to embed the css in your page.**

## Distribution import

Install all the components:

```javascript
import 'vue-easy-print/dist/vue-easy-print.css'
import VueEasyPrint from 'vue-easy-print/dist/vue-easy-print'

Vue.use(VueEasyPrint)
```

Use specific components:

```javascript
import 'vue-easy-print/dist/vue-easy-print.css'
import { Test } from 'vue-easy-print/dist/vue-easy-print'

Vue.component('test', Test)
```

**⚠️ You may have to setup your bundler to embed the css file in your page.**


The plugin should be auto-installed. If not, you can install it manually with the instructions below.

Install all the components:

```javascript
Vue.use(VueEasyPrint)
```

Use specific components:

```javascript
Vue.component('test', VueEasyPrint.Test)
```

## Source import

Install all the components:

```javascript
import Vue from 'vue'
import VueEasyPrint from 'vue-easy-print/src'

Vue.use(VueEasyPrint)
```

Use specific components:

```javascript
import Vue from 'vue'
import { Test } from 'vue-easy-print/src'

Vue.component('test', Test)
```

**⚠️ You need to configure your bundler to compile `.vue` files.** More info [in the official documentation](https://vuejs.org/v2/guide/single-file-components.html).

# Usage

> TODO

# Example

> TODO

---

# Plugin Development

## Installation

The first time you create or clone your plugin, you need to install the default dependencies:

```
npm install
```

## Watch and compile

This will run webpack in watching mode and output the compiled files in the `dist` folder.

```
npm run dev
```

## Manual build

This will build the plugin into the `dist` folder in production mode.

```
npm run build
```

---

## License

[MIT](http://opensource.org/licenses/MIT)
