const minimist = require('minimist')
const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');

module.exports = () => {
  const args = minimist(process.argv.slice(2))
  let cmd = args._[0] || 'help'

  clear();
  console.log(
    chalk.red(
      figlet.textSync('Phaser 3', { horizontalLayout: 'full' })
    )
  );

  if (args.version || args.v) {
    cmd = 'version'
  }

  if (args.help || args.h) {
    cmd = 'help'
  }

  switch (cmd) {
    case 'new':
      require('./cmds/new')(args)
      break

    case 'version':
      require('./cmds/version')(args)
      break

    case 'help':
      require('./cmds/help')(args)
      break

    default:
      console.error(`"${cmd}" is not a valid command!`)
      break
  }
}
