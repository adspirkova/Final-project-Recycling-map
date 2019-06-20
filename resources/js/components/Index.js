import React, { Component } from 'react'

export default class Index extends Component {
    
    render () {
        return (       
            <div id="topwrap">
                <div class="top">
                    <h1>Where to put?</h1>
                    <h2>-Czech Garbage Bin Site-</h2><br/>
                    <img src="img/post1.png" alt="garbageBin" className="garbageBin"/><br/>
                
                    <div class="dropBin">
                            <div className="bin1">
                                <img src="img/bottle.png"/>
                            </div>
                    </div>
                
                    <a href="#" onClick={() => {this.props.handleClick()}}>
                        <button type="button" className="btn btn-green">View the map now</button>
                    </a>
                </div>   
           </div>
        )
    }
}
