const IdeaRegistry = artifacts.require("IdeaRegistry");

module.exports = function (deployer) {
  deployer.deploy(IdeaRegistry);
};
