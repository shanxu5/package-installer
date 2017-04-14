var assert = require('assert');
describe('package-installer', function(){
    it('does the package-installer has the function', function(){
        var pkgInstaller = require('../index');
        assert.notEqual(undefined, pkgInstaller.createDependencyOrder);
    });
    it('does the createDependencyOrder output a string', function(){
        var pkgInstaller = require('../index');
        var inputArray = [
            "KittenService: ",
            "Leetmeme: Cyberportal",
            "Cyberportal: Ice",
            "CamelCaser: KittenService",
            "Fraudstream: Leetmeme",
            "Ice: "
        ];
        assert.equal('string', typeof(pkgInstaller.createDependencyOrder(inputArray)));
    });
    describe('input output tests', function(){
        it('valid input test', function(){
            var pkgInstaller = require('../index');
            var inputArray = [
                "KittenService: ",
                "Leetmeme: Cyberportal",
                "Cyberportal: Ice",
                "CamelCaser: KittenService",
                "Fraudstream: Leetmeme",
                "Ice: "
            ];
            var outputStr = pkgInstaller.createDependencyOrder(inputArray);
            console.log('what is the output ', outputStr);
            assert.equal(outputStr, 'KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream');
        });
        it('invalid input test', function(){
            var pkgInstaller = require('../index');
            var inputArray = [
                "KittenService: ",
                "Leetmeme: Cyberportal",
                "Cyberportal: Ice",
                "CamelCaser: KittenService",
                "Fraudstream: ",
                "Ice: Leetmeme"
            ];
            var outputStr = pkgInstaller.createDependencyOrder(inputArray);
            console.log('what is the output ', outputStr);
            assert.equal(outputStr.startsWith('Error, cyclical dependency found'), true);
        });
    });
});