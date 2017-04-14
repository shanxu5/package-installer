module.exports = {
    createDependencyOrder: function (inputArray){
        // parse the original input into key value pair and return a new input
        var parseInput = function(input) {
            var newInput = {};
            input.forEach(function(line) {
                var pieces = line.split(':').map(function(element){
                    return element.trim();
                });
                var package = pieces[0];
                var dependencies = pieces[1].length ? pieces[1].split(',') : [];
                newInput[package] = dependencies;
            });
            return newInput;
        };

        var parsedInput = parseInput(inputArray);
        console.log('parsedInput', parsedInput);

        // variable to keep track of handled dependencies output
        var current_handled_dependencies = [];

        // handle dependencies
        var handleDependencies = function(package) {
            // check to see if it's already handled
            if( -1 == current_handled_dependencies.indexOf(package)) {
                if (parsedInput[package] && parsedInput[package].length) {
                    parsedInput[package].forEach(function(dependency){
                        handleDependencies(dependency);
                    });
                }
                current_handled_dependencies.push(package);
            }

        };

        // loop through the parsed input and call handleDependencies function to handle dependencies
        Object.keys(parsedInput).forEach(function(package){
            handleDependencies(package);
        });

        console.log('current_handled_dependencies ', current_handled_dependencies);
        // join the final output array to a comma separated string
        return current_handled_dependencies.join(', ');
    }
};