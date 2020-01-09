var path = require('path');

module.exports = {
    mode: 'development',
    entry: './lib/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'fric.bundle.js'
    }
}