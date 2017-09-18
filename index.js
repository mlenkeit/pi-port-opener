'use strict';

const check = require('check-types');
const program = require('commander');
const winston = require('winston');

program
  .version('0.1.0')
  .option('-c, --tunnel-config-filepath [filepath]', 'Filepath to tunnel config')
  .parse(process.argv);

check.assert.string(program.tunnelConfigFilepath, '--tunnel-config-filepath argument missing');

const tunnelConfig = require(program.tunnelConfigFilepath)
  .map(tunnelConfig => {
    const cb = require(tunnelConfig.cbPath);
    check.assert.function(cb, `Callback for ${tunnelConfig.port} must a function`);
    return {
      port: tunnelConfig.port,
      cb: cb
    };
  });

require('./lib/index')({
  tunnelConfig: tunnelConfig
});

winston.log('info', 'Started pi-localtunnel-opener');