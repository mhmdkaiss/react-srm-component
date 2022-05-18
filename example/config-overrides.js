const path = require('path');
const { override, addWebpackResolve } = require('customize-cra');

module.exports = {
    webpack: override(
        addWebpackResolve({
            alias: {
                'webapp__package.json': path.resolve('./package.json')
            }
        }),
    )
}
