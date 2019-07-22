import React, { Component } from 'react'
import axios from 'axios';
var CancelToken = axios.CancelToken;
let cancel = '';
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

    

    fetchSearchResult = (query) => {
        
        const searchUrl = `https://api.github.com/search/users?q=${query}&client_id=5bdcb6dca7a60b24e67a&client_secret=87b7273004655379d13a5790d7fc1a039068d6c4`

        cancel && cancel();

        axios.get( searchUrl, {
            CancelToken: new CancelToken(function executor(c){
                cancel = c;
            })
        }).then((response)=>{
            const noFound = !response.data.items.length
                            ? 'No encontrado'
                            : '';
            console.log(response)
            this.setState({
                results: response.data.items,
                message: noFound,
                loading: false
            })
        }).catch(error =>{
            if(axios.Cancel(error) || error){
                
                this.setState({
                    loading: false,
                    message: 'Ocurrio un error'
                })
            }
        })
    }

    renderResult = () =>{
        const { results } = this.state;
        if(Object.keys(results).length && results.length){
            return (
                <div className="result-container">
                    {
                        results.map(result =>{
                            return (
                                <h6 key={result.id} className="result-item">{result.login}</h6>
                            )
                        })
                    }
                </div>
            )
        }
    }

    handleOnInputChange = (e) =>{
        const query = e.target.value;
        this.setState({query, loading: true}, ()=>{
            this.fetchSearchResult(this.state.query);
        })
        
    };


    render() {
        
        return (
            <div className="form-group">
                <label htmlFor={this.props.title}>{this.props.title}</label>
                <input type="text" name="github" id={this.props.title} onChange={this.handleOnInputChange} className="form-control"/>
                {this.renderResult()}
            </div>
        )
    }
}
