const irc = require('irc');
const chalk = require('chalk');
const moniker = require('moniker');

const registered = (client, config) => () =>  {
  console.log(`Connected to ${ chalk.yellow(config.server.trim())} as ${chalk.blue(config.userName)}`);
  client.removeListener('raw', logRaw);
};

const logRaw = (message) =>  console.log(message);
const messageReceived = (from, to, message) => console.log(`${chalk.yellow(from)}  =>  ${chalk.blue(to)}:  ${message}`);
const errorReceived = (message) => console.log(`error: ${chalk.red(message)}`);

const ircClient = (config) => {
  const client = new irc.Client(config.server, config.userName, config);
  client.on('registered', registered(client, config));
  client.on('raw', logRaw);
  client.addListener('message', messageReceived);
  client.addListener('error', errorReceived);
  return client;
}

const config = {
  server:'irc.freenode.org',
  userName: moniker.choose(),
  showErrors: true,
};

ircClient(config);
