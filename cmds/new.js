const inquirer = require("inquirer")
var clone = require('git-clone');
var Git = require("nodegit");
const ora = require('ora');


module.exports = async () => {

  const questions = [
    {
      type: 'text',
      name: 'name',
      message: 'Name for your project',
    },
    {
      type: 'checkbox',
      name: 'specification',
      message: 'Select a specification for your project',
      choices: ["typescript", "javascript"],
      default: ['javascript']
    }
  ];
  
  const responses = await inquirer.prompt(questions);
  let repository = "javascript"
  let commit = ""
  let name = "boirplate"
  
  if(responses.name){
    name = responses.name
  }

  if(responses.specification[0] == "javascript") {
    repository = "boirplate-phaser-js"
  } else {
    repository = "boirplate-phaser-ts"
    commit = "b0b93b2d728aa37227791af805ae9a03af833061"
  }

  const spinner = ora(`Create Project ${name}`).start();

  Git.Clone(`https://github.com/juniornelson123/${repository}.git`, `./${name}`)
  // Look up this known commit.
  .then(function(repo) {
    // Use a known commit sha from this repository.
    return repo.getCommit(commit);
  })
  // Look up a specific file within that commit.
  .then(function(commit) {
    return commit.getEntry("README.md");
  })
  // Get the blob contents from the file.
  .then(function(entry) {
    // Patch the blob to contain a reference to the entry.
    return entry.getBlob().then(function(blob) {
      blob.entry = entry;
      return blob;
    });
  })
  // Display information about the blob.
  .then(function(blob) {
    // Show the path, sha, and filesize in bytes.
    // console.log(blob.entry.path() + blob.entry.sha() + blob.rawsize() + "b");

    // // Show a spacer.
    // console.log(Array(72).join("=") + "\n\n");

    // // Show the entire file.
    // console.log(String(blob));
    spinner.stop();

  })
  .catch(function(err) { 
    spinner.stop();
    console.log(err); 
  });
}
