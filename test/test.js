var assert = require('assert');
describe('package-installer', function(){
    it('does the package-installer has the function', function(){
        var pkgInstaller = require('../index');
        assert.notEqual(undefined, pkgInstaller.createDependencyOrder);
    });
});