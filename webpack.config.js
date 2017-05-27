const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const pathIsInside = require("path-is-inside");
const findRoot = require('find-root');

const dir_js = path.resolve(__dirname, 'js');
const dir_build = path.resolve(__dirname, 'build');
const dir_node_modules = path.resolve(__dirname, 'node_modules');

const PROPKEY_ESNEXT = 'esnext';

/**
 * Find package.json for file at `filepath`.
 * Return `true` if it has a property whose key is `PROPKEY_ESNEXT`.
 */
function hasPkgEsnext(filepath) {
    const pkgRoot = findRoot(filepath);
    const packageJsonPath = path.resolve(pkgRoot, 'package.json');
    const packageJsonText = fs.readFileSync(packageJsonPath, {encoding: 'utf-8'});
    const packageJson = JSON.parse(packageJsonText);
    return {}.hasOwnProperty.call(packageJson, PROPKEY_ESNEXT);
}

module.exports = {
    entry: path.resolve(dir_js, 'main.js'),
    output: {
        filename: 'bundle.js',
        path: dir_build,
    },
    resolve: {
        // Help webpack find `esnext` source code
        mainFields: [PROPKEY_ESNEXT, 'browser', 'module', 'main'],
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                
                // Should Babel transpile the file at `filepath`?
                include: (filepath) => {
                    return pathIsInside(filepath, dir_js) || (pathIsInside(filepath, dir_node_modules) && hasPkgEsnext(filepath));
                },
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                'env'
                            ],
                        },
                    }
                ]
            }
        ]
    },
};
