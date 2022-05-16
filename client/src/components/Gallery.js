import React, {Component} from "react";
import {Container} from 'semantic-ui-react'
import {Table, Image } from 'semantic-ui-react';




class GalleryRow extends Component {
    // constructor(props){
    //     this.props = super.props
    // }
    render() {
        const { Row, Cell } = Table;
        const { id, link, question, answer } = this.props
        //console.log('inside gallery row')


        return ( 
            <Row>
                <Cell>{id}</Cell>
                <Cell>{question}</Cell>
                <Cell>{answer}</Cell>
                <Cell>
                    <Image
                        src={link}
                        size='tiny'

                        verticalAlign='middle'

                        onError={i=> i.target.src='./eightball.png'}
                    />
                </Cell>
            </Row>
        )
    }


}
export default GalleryRow;