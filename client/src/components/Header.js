import React from "react";
import {Menu} from 'semantic-ui-react';

const HeaderComponent = (props) => {
    return (
        <Menu style = {{marginTop : '15px'}}>
            <Menu.Menu position='right'>
                <a className = 'item'>Ballz</a>
            </Menu.Menu>
        </Menu>
    )
}
export default HeaderComponent;