const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8082/'
    },
    devServer: {
        port: 8082,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
          name: 'container',
          remotes: {
              marketing: 'marketing@http://localhost:8081/remoteEntry.js',
              auth: 'auth@http://localhost:8083/remoteEntry.js' 
          },
          shared: packageJson.dependencies
        })
    ],
};

module.exports = merge(commonConfig, devConfig);