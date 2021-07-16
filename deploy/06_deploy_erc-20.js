let { networkConfig} = require('../helper-hardhat-config')
 
module.exports = async ({
  getNamedAccounts,
  deployments
}) => {
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = await getChainId()
  let linkTokenAddress
  let oracle
  let additionalMessage = ""
  //set log level to ignore non errors
  ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.ERROR)
  let totalSupply = 100000000
 
  const erc20 = await deploy('ERC20Basic', {
    from: deployer,
    args: [totalSupply],
    log: true
  })
 
  log("ERC-20 deployed to: " + erc20.address)
  log("----------------------------------------------------")
}
module.exports.tags = ['all', 'bonus']
