const { expect } = require('chai')
const chai = require('chai')
const BN = require('bn.js')
const skipIf = require('mocha-skip-if')
chai.use(require('chai-bn')(BN))
const { deployments, getChainId } = require('hardhat')
const { networkConfig, developmentChains } = require('../../helper-hardhat-config')
 
skip.if(!developmentChains.includes(network.name)).
  describe('ERC20 Unit Tests', async function () {
    let erc20
 
    beforeEach(async () => {
      await deployments.fixture(['bonus'])
      const ERC20Basic = await deployments.get("ERC20Basic")
      erc20 = await ethers.getContractAt("ERC20Basic", ERC20Basic.address)
    })
 
    it('initial token supply should be a positive value', async () => {
      let result = await erc20.totalSupply()
      console.log("Token Total Supply Value: ", new web3.utils.BN(result._hex).toString())
      expect(new web3.utils.BN(result._hex).toString()).to.be.a.bignumber.that.is.greaterThan(new web3.utils.BN(0))
    })
  })
