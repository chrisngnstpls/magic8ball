import React, { Component } from "react";
import MagicEightBall from "./contracts/MagicEightBall.json";
import getWeb3 from "./getWeb3";
import "./App.css";
import answers from "./answers";
import Layout from "./components/Layout";
import GalleryRow from "./components/Gallery";
import SpaceIng from "./components/Spacing";
import Stats from "./components/Statistics";
import {Input, Table, Button, Icon, Image, Statistic} from 'semantic-ui-react';
import Web3 from "web3";



//console.log(MagicEightBall)
class App extends Component {
    state = {
        mintValue : 11000000000000000,
        gas:2500000,
        instance : null,
        accounts : null,
        web3 : null,
        id : 0,
        balances:[],
        totalmints : 0,
        tokensOwned : 0,
        totalSpent:0,
        question:'',
        answerPicked:'',
        randomList:null,
        itemList : []
        }

    // contract alpha0 0x4235EB03d1348d3742Dd362d180a327de42fa272
    componentDidMount = async () => {
        try{

            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = MagicEightBall.networks[networkId];
            const instance = new web3.eth.Contract(
                MagicEightBall.abi, deployedNetwork && "0x31e3525469418EbAbDD00cAeCC90Bc8c672E4A2E" // you need to replace this address with your compiled contract address
            )
            //console.log(instance)

            this.setState({web3, accounts, instance})
            this.getTokenBalances()
            .then(console.log(this.state.itemList))
    
        } catch(err) {
            console.log(err)
        }
    }

    pickRandom = (answerSet) => {
        //console.log(`Answer pool:${answerSet.length}`)
        let toPick = function getRandomAnswer(max) {
            return Math.floor(Math.random() * max)
        }
        let _len = answerSet.length
        let answerNo = toPick(_len)
        let _answer = answerSet[answerNo][0]
        let _link = answerSet[answerNo][1]
        //console.log(_answer, _link)
        return [_answer, _link]
    }
    mintToken = async () => {
        
        const {accounts, instance, mintValue, gas} = this.state
        //console.log(instance)
        const id = await instance.methods.publiMint('..', '..','..').send({from:accounts[0], value:mintValue, gas:gas})
        this.setState({id})
        //console.log(id)
    }
    
    
    freemint = async () => {
        const {accounts, instance} = this.state
        //console.log(instance)
        const id = await instance.methods.mintNFT('0x5ff1a5c9BE37777EB3F4Ea69d15C6779329A2362', '..', '..').send({from:accounts[0],gas:200000}) // this is an admin mint function, you need to replace this address with admin wallet
        this.setState({id})
    }
    
    
    onSubmit = async (event) => {
        event.preventDefault();
        //console.log(this.state.question)
        const {accounts, instance, question, gas, mintValue} = this.state
        //await instance.methods.publiMint(question,'test').send({from:accounts[0], value:11000000000000000, gas:200000})
        let answer = this.pickRandom(answers)
        //console.log(answer[0],answer[1])
        await instance.methods.publiMint(question,answer[0],answer[1]).send({from:accounts[0], value:mintValue, gas:gas})
    }
    
    
    getTokenBalances = async () => {
        const {accounts, instance,itemList, gas, mintValue} = this.state
        let balances =[]
        balances = await instance.methods.getEightBalls().call({gas:gas})
        let totalMints = balances.length
        //console.log(balances)
        let counter = 0
        let totalSpent = balances.length * Web3.utils.fromWei(mintValue.toString())
        //console.log(balances[0].recipientAddress)
        for(let i = 0; i<balances.length ; i++) {
            //console.log(balances[i])
            
            let tokenRecipient = await balances[i]
            //console.log(tokenRecipient, accounts[0])
            //console.log(tokenRecipient.recipientAddress)
            if (tokenRecipient.recipientAddress === accounts[0]){
                let myItems = {
                    id:'',
                    link:'',
                    question:'',
                    answer:''
                }
                let tokenId = tokenRecipient.tokenIndex
                let tokenLink = tokenRecipient.uri
                let tokenQuestion = tokenRecipient.question
                let tokenAnswer = tokenRecipient.answer

                myItems.id = tokenId
                myItems.question = tokenQuestion
                myItems.answer = tokenAnswer
                myItems.link = `https://ipfs.io/ipfs/${tokenLink}`
                counter++
                itemList.push(myItems)

            } else {
                //
            }
        }
        
        this.setState({tokensOwned : counter, totalmints:totalMints, totalSpent:parseFloat(totalSpent).toFixed(5)})
    }
    renderRows() {
        return this.state.itemList.map((i) =>{
            return ( <GalleryRow 
                        id={i.id}
                        question={i.question}
                        answer={i.answer}
                        link={i.link}
                    />    
                )
        })
    
    }
    render() {
        const {Header, Row, HeaderCell, Body} = Table;
        if (!this.state.web3) {
          return <div>Loading Web3, accounts, and contract...</div>;
        }
        return (
            <Layout>
                <div className="App">
                    <Stats
                        owned = {this.state.tokensOwned}
                        totals = {this.state.totalmints}
                        totalSpent = {this.state.totalSpent}
                    />
                    <SpaceIng message='Ask the magic eight ball' />
                    <form onSubmit = {this.onSubmit}>
                        <div>
                            <Input
                                label= 'Ask a question 🎱:'
                                type='text'
                                value={this.state.question}
                                maxLength='32'
                                onChange = {event => this.setState({question : event.target.value})}
                            />
                            <Button color='teal'>Mint</Button>
                        </div>
                    </form>
                </div>
                
                <SpaceIng message='Your eightBalls' />
                <Table color='teal' inverted celled selectable>
                    <Header>
                        <Row>
                            <HeaderCell>Id</HeaderCell>
                            <HeaderCell>Question</HeaderCell>
                            <HeaderCell>Answer</HeaderCell>
                            <HeaderCell>8Ball</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
            </Layout>
        );
      }
}

export default App;