const menus = {
  main: `
    phaser [command] <options>

    new ................ create new boirplate
    version ............ show package version
    help ............... show help menu for a command`,

  new: `
    
    phaser new <options>

    --name, -n ..... name package`,
}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(menus[subCmd] || menus.main)
}