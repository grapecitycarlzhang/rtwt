import * as React from 'react'
import { Component } from 'react'

interface IState {
    count: number
}

interface IProp {

}

export class Counter extends React.PureComponent< IProp, IState >{
    
        static defaultProps = { };
    
        constructor( ) {
            super( );
            this.state = {
                count: 1
            }
        }
    
        add = ( ) => {
            let { count } = this.state;
            this.setState({
                count: ++count
            });
        }
    
        del = ( ) => {
            let { count } = this.state;
            this.setState({
                count: --count
            })
        }
    
        render( ) {
            let { count } = this.state;
            return <div>
                <h3 className="title">{ count }</h3>
                <button onClick={this.add}>+</button>
                <button onClick={this.del}>-</button>
            </div>
        }
    }