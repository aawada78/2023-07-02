const { shareAll } = require('@angular-architects/module-federation/webpack');


const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.base.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "flightApp",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },   
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
        library: { type: "module" },

        // For remotes (please adjust)
        // name: "flightApp",
        // filename: "remoteEntry.js",
        // exposes: {
        //     './Component': './apps/flight-app/src/app/app.component.ts',
        // },        
        
        // For hosts (please adjust)
        // remotes: {
        //     "passenger": "http://localhost:4204/passengerRE.js",
        // },

        // shared: share({
        //   "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
        //   "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
        //   "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
        //   "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },

        //   ...sharedMappings.getDescriptors()
        // })

        shared: {
          ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
        },
        
    }),
    sharedMappings.getPlugin()
  ],
};
