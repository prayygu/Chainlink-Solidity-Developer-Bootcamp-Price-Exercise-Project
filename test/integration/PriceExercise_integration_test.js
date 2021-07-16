const chai = require('chai')
const { expect } = require('chai')
const BN = require('bn.js')
chai.use(require('chai-bn')(BN))
const skipIf = require('mocha-skip-if')
const { developmentChains } = require('../../helper-hardhat-config')
 
skip.if(developmentChains.includes(network.name)).
  describe('PriceExercise Integration Tests', async function () {
 
    let priceExercise
 
    beforeEach(async () => {
      const PriceExercise = await deployments.get('PriceExercise')
      priceExercise = await ethers.getContractAt('PriceExercise', PriceExercise.address)
    })
 
    it('price feed return a positive value', async () => {
        let result = await priceExercise.getLatestPrice()
        console.log("Price Feed Value: ", new web3.utils.BN(result._hex).toString())
        expect(new web3.utils.BN(result._hex).toString()).to.be.a.bignumber.that.is.greaterThan(new web3.utils.BN(0))
      })
 
    it('Should successfully make an external API request and get a result', async () => {
      const transaction = await priceExercise.requestPriceData()
      const tx_receipt = await transaction.wait()
      const requestId = tx_receipt.events[0].topics[1]
 
      //wait 30 secs for oracle to callback
      await new Promise(resolve => setTimeout(resolve, 30000))
 
      //Now check the result
      const result = await priceExercise.storedPrice()
      console.log("Price obtained from API Call: ", new web3.utils.BN(result._hex).toString())
      expect(new web3.utils.BN(result._hex)).to.be.a.bignumber.that.is.greaterThan(new web3.utils.BN(0))
    })
  })
 
