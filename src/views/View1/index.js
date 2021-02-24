import React, { Component } from 'react';
import Surburst from '../../charts/SurburstChart';
import './view1.css';

export default class View1 extends Component {
    render() {
       
        return (
            <div id='view1' className='pane'>
                <Surburst/>
            </div>
        )
    }
}
