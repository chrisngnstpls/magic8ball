import React from "react";
import { Container, Divider,Header,Statistic,Image } from 'semantic-ui-react';


const Stats = (props) => {
    //const {totals, owned} = this.props;
    return (
        <div className='statsHead'>
        <Header class='ui card centered' as='h2' textalign = 'center' >
            <Statistic.Group  widths='three'>
                <Statistic size='tiny' color="teal">
                    <Statistic.Value>{props.totals}</Statistic.Value>
                    <Statistic.Label>Total Balls Minted</Statistic.Label>
                </Statistic>
                <Statistic size='tiny' color="teal">
                    <Statistic.Value>{props.owned} </Statistic.Value>
                    <Statistic.Label>🎱 owned</Statistic.Label>
                </Statistic>
                <Statistic size='tiny' color="teal">
                    <Statistic.Value>
                    <Image src='https://ethereum.org/static/a183661dd70e0e5c70689a0ec95ef0ba/cdbe4/eth-diamond-purple.webp' className='circular inline' />
                         {props.totalSpent}
                    </Statistic.Value>
                    <Statistic.Label>spent on eightballs</Statistic.Label>
                </Statistic>                                
            </Statistic.Group>
            
        </Header>
    </div>
    )
}

export default Stats;
