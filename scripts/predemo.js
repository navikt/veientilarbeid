const fs = require('fs');

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
pkg.homepage = '/veientilarbeid/demo';

fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2), 'utf-8');
