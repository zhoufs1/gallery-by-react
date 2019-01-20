/***
 * 圣杯demo
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.less';

export default class Grail extends Component {
    constructor() {
        super();
    }

    render() {
        return <div className='container'>
            <div className='main'></div>
            <div className='left'></div>
            <div className='right'></div>
        </div>
    }
}
