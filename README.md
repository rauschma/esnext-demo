# esnext-demo

This repo shows how to enable `pkg.esnext` for _untranspiled_ source code.

If you build this repo, Babel transpiles:

* All JavaScript files inside `esnext-demo/js`
* All npm-installed modules that have a `package.json` with the property `esnext`.
    * That property works similarly to `main`: it points to the `.(m)js` file “implementing” the package.
* No other JavaScript file is transpiled by Babel.

Rationale for the `package.json` property `esnext`: http://2ality.com/2017/04/transpiling-dependencies-babel.html

## Installation

```text
cd esnext-demo
npm install
npm run install-aaa
```

## Running the web app

```text
npm run wp
open esnext-demo/index.html
```
