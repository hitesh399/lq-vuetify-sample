'use strict';
const minimist = require('minimist');
const CopyPlugin = require('copy-webpack-plugin');
let args = minimist(process.argv.slice(2));
const portal = args.portal;
process.env['VUE_APP_PORTAL_NAME'] = portal;


const portalInst = require('./src/utils/portal-helper');
const currentPortal = portalInst.currentPortal;
const publicPath = currentPortal.getAssetsUrl() ? currentPortal.getAssetsUrl() : currentPortal.getBaseUrl();
console.log('process.env', publicPath)
module.exports = {
  devServer: {
    port: currentPortal.getPort(),
    proxy: 'http://localhost'
  },
  pages: {
    index: {
      // entry for the page
      entry: currentPortal.getEntry(),
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    //subpage: 'src/subpage/main.js'
  },
  publicPath: currentPortal.getAssetsUrl(),
  outputDir:  __dirname + currentPortal.getOutputDir(),
  indexPath:  __dirname + currentPortal.getIndexFilePath(),
  chainWebpack: config => {
      if (process.env.NODE_ENV === 'production') {
        new CopyPlugin([
          { from: __dirname + '/.htaccess', to: __dirname + currentPortal.getOutputDir() + '/.htaccess' },
          { from: __dirname + '/web.config', to: __dirname + currentPortal.getOutputDir() + '/web.config' },
        ])
      }
      config.module
      .rule('images')
        .use('url-loader')
          .loader('url-loader')
          .tap(options => Object.assign(options, { limit: 10240 }))
  },
  configureWebpack: {
    // resolve: {
    //   alias: {
    //     'lq-form': 'lq-form/src/main',
    //     'lq-vuetify': 'lq-vuetify/src/main',
    //     'lq-v-data-table': 'lq-v-data-table/src/main',
    //     'vuejs-object-helper': 'vuejs-object-helper/src/main',
    //     'lq-v-file': 'lq-v-file/src/main'
    //   }
    // }
  }
}