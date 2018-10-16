const bin_dir = `${__dirname}/node_modules/.bin/`;
const exec = require('child_process').execSync;
const e = c => exec(c, { shell: '/bin/bash', stdio: 'inherit' });

const me = exec('npm whoami') + '';
if (me !== 'react-one\n') {
    console.log('ERROR: You must log in to npm, use "npm login" command');
    process.exit(1);
}
const is_clean = exec('git status') + '';
if (!is_clean.includes('On branch master') || !is_clean.includes('working tree clean')) {
    console.log('ERROR: Make sure you are on the master branch and your git tree is clean');
    process.exit(1);
}

console.log('===== preparing release package.json');
e(`mv ./package.json ./package.dev.json`);
e(`mv ./package.release.json ./package.json`);

console.log('===== building dist files');
e(`rm -rf ./dist && ${bin_dir}babel ./src/libs/react-one-ui --out-dir dist`);

console.log('===== patching version');

try {
    e(`npm version -f --no-commit-hooks --no-git-tag-version patch`);
    e(`npm publish`);
} catch (a) {
    e(`mv ./package.json ./package.release.json`);
    e(`mv ./package.dev.json ./package.json`);
    e(`git reset --hard`);
    process.exit(1);
}

console.log('=====returing dev package.json');
e(`mv ./package.json ./package.release.json`);
e(`mv ./package.dev.json ./package.json `);
