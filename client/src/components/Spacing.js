import React from "react";
import { Container, Divider,Header } from 'semantic-ui-react';


const SpaceIng = (props) => {
    return (
        <Container textAlign="center" fluid style={{padding:'50px'}}>
            <Divider horizontal fluid style={{padding:'10px'}}>
                <h3 className="spaceIt">{props.message}</h3>
            </Divider>
        </Container>
    )
}

export default SpaceIng;
