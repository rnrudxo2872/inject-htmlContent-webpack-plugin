# Install
```bash
npm install inject-html-content-webpack-plugin
```
or  
```bash
yarn add inject-html-content-webpack-plugin
```

# Usage
```js
// import module
const InjectHtmlContentPlugin = require("inject-html-content-webpack-plugin").default;

module.exports = {
    entry: {...},
    output: {...},
    module: {...},
    plugins: [
        new HtmlPlugin({
            inject: false,
            filename: "index.html",
            templateContent: '<div id="root"></div>',
            // entryName must match the value of name in InjectHtmlContentPlugin.
            entryName: "home" 
        }),
        new InjectHtmlContentPlugin("home", {
            content: '<span>html</span>',
            target: '<div id="root">'
        })
    ]
};
```
<br>

The above result is as below.
```html
<div id="root"><span>html</span></div>
```