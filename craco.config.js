const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@black': '#313430',
              '@white': '#fbfdfb',
              '@text-color': '#323431',
              '@primary-color': '#658e49',
              '@body-background': '@white',
              '@component-background': '#f5f7f5',
              '@layout-body-background': '@white',
              '@font-family': 'Montserrat',
              '@checkbox-border-radius': '3px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};