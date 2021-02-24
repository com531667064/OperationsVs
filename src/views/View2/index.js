import React, { Component } from 'react';
import './view2.css';
import Statistical from '../../charts/StatisticalChart';

export default class View2 extends Component {
    render() {
     
        return (
            <div id='view2' className='pane'>
               <Statistical/>
            </div>
        )
    }
}