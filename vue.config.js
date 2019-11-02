'use strict';
const minimist = require('minimist');
const CopyPlugin = require('copy-webpack-plugin');
// const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

let args = minimist(process.argv.slice(2));
const portal = args.portal ? args.portal : 'admin';
process.env['VUE_APP_PORTAL_NAME'] = portal;


const portalInst = require('./src/utils/portal-helper');
const currentPortal = portalInst.currentPortal;
const publicPath = currentPortal.getAssetsUrl() ? currentPortal.getAssetsUrl() : currentPortal.getBaseUrl();
console.log('process.env', publicPath, currentPortal.getOutputDir())

const copyFiles = (process.env.NODE_ENV === 'production') ? [
  { from: __dirname + '/.htaccess', to: __dirname + currentPortal.getOutputDir() },
  { from: __dirname + '/web.config', to: __dirname + currentPortal.getOutputDir() },
] : [];

module.exports = {
  devServer: {
    port: currentPortal.getPort(),
    proxy: 'http://localhost'
  },
  pages: {
    index: {
      // entry for the page
      entry: [currentPortal.getEntry()],
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
  outputDir: __dirname + currentPortal.getOutputDir(),
  indexPath: __dirname + currentPortal.getIndexFilePath(),
  // css: {
  //   loaderOptions: {
  //     css: {
  //       localIdentName: '[name]-[hash]',
  //       camelCase: 'only'
  //     }
  //   }
  // }, 
  chainWebpack: config => {

    const imgRule = config.module.rule('images')
    imgRule.uses.clear()
    imgRule
      .use("file-loader")
      .loader("file-loader")
      .options({
        limit: 10000,
        name: process.env.NODE_ENV === 'production' ? 'assets/images/[name]-[hash].[ext]' : 'assets/images/[name].[ext]'
      })
      .end();
  },
  configureWebpack: {
    plugins: [new CopyPlugin(copyFiles)],
    resolve: {
      alias: {
        // 'lq-form': 'lq-form/src/main',
        // 'lq-vuetify': 'lq-vuetify/src/main',
        // 'lq-v-data-table': 'lq-v-data-table/src/main',
        // 'vuejs-object-helper': 'vuejs-object-helper/src/main',
        // 'lq-v-file': 'lq-v-file/src/main',
        // 'moment-timezone': 'moment-timezone/moment-timezone',
        // 'moment': 'moment/src/moment'
      }
    }
  },
  pwa: {
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: "src/firebase-messaging-sw.js"
    }
  }
}