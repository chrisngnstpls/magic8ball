import {abi} from '../src/contracts/MagicEightBall.json'
import getWeb3  from './getWeb3';
const address = '0x963C87D6e27D6f2e5041d558503Ce8e49B27076F'



const EightBall = () => {
    new Promise((resolve, reject) => {
        try{
            const Eightball = new getWeb3.eth.Contract(JSON.parse(abi), address);
            resolve(Eightball)
        }catch (err){
            reject(err)
        }
    }
    )
}
console.log(EightBall)

export default EightBall;