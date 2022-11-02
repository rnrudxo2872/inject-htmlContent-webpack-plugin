/**
 * @param {string} content
 * @param {string} target
 * @param {string} insertStr
 * @returns {string}
 */
function insertStrAfter(content, target, insertStr) {
    if (content == null || target == null || insertStr == null) throw new Error("incorrect use");

    const findIdx = content.indexOf(target);
    if (findIdx === -1) {
        return content;
    }

    const strLen = target.length;
    return content.slice(0, findIdx + strLen) + insertStr + content.slice(findIdx + strLen);
}

class InjectHtmlContentPlugin {
    /**
     * @param {string} name - plugin name
     * @param {{content: string, target: string}} options - options
     *
     * @example
     * new InjectHtmlContentPlugin("mainPage", {
     *  content: '<div class="container"></div>'
     *  target: '<div id="root">'
     * })
     */
    constructor(name, htmlPlugin, options) {
        if (htmlPlugin == null) throw new Error("does not exist htmlPlugin.");
        if (name == null) throw new Error("does not exist name.");
        if (options.target == null) throw new Error("does not exist target");

        this.htmlPlugin = htmlPlugin
        this.name = name;
        this.options = {
            content: "<div id=root/>",
            ...options,
        };
    }

    apply(compiler) {
        compiler.hooks.compilation.tap(this.name, (compilation) => {
          this.htmlPlugin.getHooks(compilation).beforeEmit.tap(this.name, (data) => {
            if (!data.outputName.includes(this.name)) return;
            data.html = insertStrAfter(
              data.html,
              this.options.target,
              this.options.content
            );
            data.html.trim();
          });
        });
    }
}

exports.default = InjectHtmlContentPlugin;