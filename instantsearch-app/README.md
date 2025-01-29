# instantsearch-app

python_robyn

---

[![MIT](https://img.shields.io/npm/l/@ritchie/instantsearch-widget-instantsearch-app)](./LICENSE) [![NPM version](http://img.shields.io/npm/v/@ritchie/instantsearch-widget-instantsearch-app.svg)](https://npmjs.org/package/@ritchie/instantsearch-widget-instantsearch-app)

## Install

```bash
npm install @ritchie/instantsearch-widget-instantsearch-app
# or
yarn add @ritchie/instantsearch-widget-instantsearch-app
```

## Widget

### Usage

```js
import instantsearch from 'instantsearch.js';
import algoliasearch from 'algoliasearch/lite';
import { instantsearchApp } from '@ritchie/instantsearch-widget-instantsearch-app';

const searchClient = algoliasearch('appId', 'apiKey');

const search = instantsearch({
  indexName: 'indexName',
  searchClient,
});

search.addWidgets([
  instantsearchApp({
    // widget parameters
  }),
]);

search.start();
```

### Options

| Option | Type | Required | Default | Description |
| :-- | :-- | :-- | :-- | --- |
| [`container`](#container) | `string` or `HTMLElement` | true | - | The element to insert the widget into. |
| [`option1`](#option1) | `...` | true | - | REPLACE WITH THE DESCRIPTION FOR THIS OPTION |

#### container

> `string | Element` | **required**

The element to insert the widget into.

This can be either a valid CSS Selector:

```js
instantsearchApp({
  container: '#instantsearch-app',
  // ...
});
```

or an `HTMLElement`:

```js
instantsearchApp({
  container: document.querySelector('#instantsearch-app'),
  // ...
});
```

#### option1

> `...` | **required**

REPLACE WITH THE DESCRIPTION FOR THIS OPTION

```js
instantsearchApp({
  option1: 'value',
  // ...
});
```

## Connector

### Usage

```js
import { connectInstantsearchApp } from '@ritchie/instantsearch-widget-instantsearch-app';

// 1. Create a render function
const renderInstantsearchApp = (renderOptions, isFirstRender) => {
  // Rendering logic
};

// 2. Create the custom widget
const customInstantsearchApp = connectInstantsearchApp(
  renderInstantsearchApp
);

// 3. Instantiate
search.addWidgets([
  customInstantsearchApp({
    // instance params
  }),
]);
```

### Options

#### option1

> `...`

REPLACE WITH THE DESCRIPTION FOR THIS RENDERING ITEM

```js
const renderInstantsearchApp = (renderOptions, isFirstRender) => {
  // show how to use this render option
};

const customInstantsearchApp = connectInstantsearchApp(
  renderInstantsearchApp,
);

search.addWidgets([
  customInstantsearchApp({
    // ...
  }),
]);
```

#### widgetParams

> `object`

All original widget options forwarded to the render function.

```js
const renderInstantsearchApp = (renderOptions, isFirstRender) => {
  const { widgetParams } = renderOptions;
  widgetParams.container.innerHTML = '...';
};

const customInstantsearchApp = connectInstantsearchApp(
  renderInstantsearchApp,
);

search.addWidgets([
  customInstantsearchApp({
    container: document.querySelector('#instantsearch-app'),
    // ...
  }),
]);
```

## Contributing

To start contributing to code, you need to:

1. [Fork the project](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
2. [Clone the repository](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository)
3. Install the dependencies: `yarn`
4. Run the development mode: `yarn start`

Please read [our contribution process](./CONTRIBUTING.md) to learn more.

---

_This project was generated with [create-instantsearch-app](https://github.com/algolia/instantsearch/tree/master/packages/create-instantsearch-app) by [Algolia](https://algolia.com)._
