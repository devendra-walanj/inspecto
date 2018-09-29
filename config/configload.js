let enviro = process.env.NODE_ENV || 'dev';

// Load the configurations from the onsite config.json to the node environments.
if (enviro == 'dev' || enviro == 'test' ) {
    let config = require('./config.json')
    let enviroConfig = config[enviro];

    Object.keys(enviroConfig).forEach((okey) => {
        // console.log(`config load : ${enviroConfig[okey].constructor} `);        
        // if (enviroConfig[okey].constructor === {}.constructor) {
        //     console.log(`okey: ${okey}; ${JSON.stringify(enviroConfig[okey])}`);            
        // }
        process.env[okey] = enviroConfig[okey];
    })
} 