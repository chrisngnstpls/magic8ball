const EightBall = artifacts.require('MagicEightBall');



let instance;

contract('test eightball publimint', async accounts => {
    beforeEach(async () => {
        instance = await EightBall.deployed();
        await instance.publiMint('query', 'predict','uri', {from:accounts[1], value: 10000000000000000})
    })
    it('should mint a token', async () => {
        // const instance = await EightBall.deployed();
        // await instance.publiMint('...', '......', {from:accounts[1], value: 10000000000000000})
        const ownerBalance = await instance.balanceOf(accounts[1], {from:accounts[0]})
        assert.equal(ownerBalance, 1)
    })
    it('token should have the right owner', async () => {
        // const instance = await EightBall.deployed();
        // await instance.publiMint('firstarg', 'secondarg', {from:accounts[1], value: 10000000000000000})
        const tokenOwner = await instance.ownerOf(1,{from:accounts[0]})
        assert.equal(tokenOwner, accounts[1])
    })
})
