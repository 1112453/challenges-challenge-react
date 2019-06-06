import React, { Component } from 'react';
import './loadingStyle.css';

export default class Loading extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {loading} = this.props;
        if(!loading){
            return null;
        }else{
            return(
                <div style={{position:'absolute', height: '100%', width: '100%', pointerEvents: 'none'}}>
                    <div className="loading-dialog">
                        <div className="loading-dialog--content">
                            <p><i className="loadingSpinner fa-spin"></i> Loading...</p>
                        </div>
                    </div>
                </div>
            );
        }
    }
}