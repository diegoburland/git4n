import React, { Component } from 'react'

export default class Search extends Component {
    constructor(props){
        
        super(props)
        this.state = {
            query: '',
            results: '',
            loading: false,
            message: '',
            
        }

    }

    handleOnInputChange = (e) =>{
        const query = e.target.value;
        this.setState({query, loading: true})
        console.log(query);
    };


    render() {
        console.log(this.state)
        return (
            <div className="form-group">
                <label htmlFor={this.props.title}>{this.props.title}</label>
                <input type="text" name={this.props.title} id={this.props.title} onChange={this.handleOnInputChange} className="form-control"/>
            </div>
        )
    }
}
