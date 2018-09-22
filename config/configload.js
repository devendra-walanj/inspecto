let enviro = process.env.NODE_ENV || 'dev';

// Load the configurations from the onsite config.json to the node environments.
if (enviro == 'dev' || enviro == 'test' ) {
    let config = require('./config.json')
    let enviroConfig = config[enviro];

    Object.keys(enviroConfig).forEach((okey) => {
        process.env[okey] = enviroConfig[okey];
    })
} 