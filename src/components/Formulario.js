import React, { Component } from 'react';

import axios from 'axios';
var CancelToken = axios.CancelToken;
let cancel = '';

const initialState = {
    name : '',
    lastname : '',
    personal_id : '',
    birthday: '',
    email : '',
    github : '',
    nameError: '',
    lastnameError: '',
    personal_idError: '',
    birthdayError: '',
    emailError: '',
    githubError: '',
    query: '',
    results: '',
    loading: false,
    message: '',


}
export default class Formulario extends Component {


    state = initialState;

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

    selectName = (e) =>{
        var el = e.target;
        var text = el.textContent || el.innerText;
        document.getElementById('github').value = text
        el.parentElement.style.display = 'none'
    }

    renderResult = () =>{
        const { results } = this.state;
        
        if(Object.keys(results).length && results.length){
            return (
                <div id='result-container' style={{display:'block'}} className="result-container">
                    {   
                        results.map(result =>{
                            
                            return (
                                <h6 key={result.id} onClick={ this.selectName }  className="result-item">{result.login}</h6>
                            )
                        })
                    }
                </div>
            )
        }
    }

    validate = () =>{
        let nameError =  '';
        let lastnameError =  '';
        let personal_idError =  '';
        let birthdayError =  '';
        let emailError =  '';
        let githubError =  '';

        if(!this.state.name){
            nameError = 'Este campo no puede estar vacio';
        }

        if(!this.state.lastname){
            lastnameError = 'Este campo no puede estar vacio';
        }

        if(!this.state.personal_id){
            personal_idError = 'Este campo no puede estar vacio';
        }

        if(!this.state.birthday){
            birthdayError = 'Este campo no puede estar vacio';
        }

        if(!this.state.github){
            githubError = 'Este campo no puede estar vacio';
        }

        if(!this.state.email){
            emailError = 'Este campo no puede estar vacio';
        }else if(!this.state.email.includes('@')){
            emailError = 'Email invalido';
            
        }
        

        if(nameError || lastnameError || personal_idError || emailError || birthdayError || githubError){
            this.setState({nameError})
            this.setState({lastnameError})
            this.setState({personal_idError})
            this.setState({birthdayError})
            this.setState({emailError})
            this.setState({githubError})
            return false;
        }else{
            return true
        }
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        const valido = this.validate();
        if(valido){
            this.props.addUser(this.state.name, this.state.lastname, this.state.personal_id, this.state.birthday, this.state.email, this.state.github);
            this.setState(initialState);
        }
    }

    onChange = (e) =>{
        if(e.target.name !== 'github'){
            this.setState({
                [e.target.name] : e.target.value
            })
        }else{
            this.setState({
                [e.target.name] : e.target.value
            })

            const query = e.target.value;
        
            this.setState({query, loading: true}, ()=>{
                this.fetchSearchResult(this.state.query);
            })
            
        }
       
    }

    render() {
        return (
            
                <div className="col-md-8 col-sm-12 mx-auto">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h4>Formulario Registro</h4>
                        </div>
                        <div className="card-body">
                            <form method="post"  onSubmit={ this.onSubmit } autoComplete="off" id="mainform">
                                <div className="row">
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="name">Nombres</label>
                                            <input type="text"  autoComplete="off"   name="name" id="" onChange={this.onChange} className="form-control"/>
                                            <div className="error">{this.state.nameError}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="lastname">Apellidos</label>
                                            <input type="text" name="lastname" id="lastname" onChange={this.onChange} className="form-control"/>
                                            <div className="error">{this.state.lastnameError}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="personal_id">Cedula</label>
                                            <input type="text" name="personal_id" id="personal_id" onChange={this.onChange} className="form-control"/>
                                            <div className="error">{this.state.personal_idError}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="birthday">Fecha de Nacimiento</label>
                                            <input type="text" name="birthday" id="birthday" onChange={this.onChange} className="form-control"/>
                                            <div className="error">{this.state.birthdayError}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" name="email" id="email" onChange={this.onChange} className="form-control"/>
                                            <div className="error">{this.state.emailError}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        {/* <Search title={'github'} change={this.state.github}/> */}
                                        <div className="form-group">
                                            <label htmlFor="github">Github</label>
                                            <input type="text" name="github" id="github" onChange={this.onChange} className="form-control"/>
                                            <div className="error">{this.state.githubError}</div>
                                            {this.renderResult()}
                                        </div>
                                    </div>
                                    <div className="col-12 pt-3">
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary btn-block">Agregar</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        )
    }
}
