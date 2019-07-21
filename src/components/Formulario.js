import React, { Component } from 'react'

export default class Formulario extends Component {

    state = {
        name : '',
        lastname : '',
        personal_id : '',
        birthday: '',
        email : '',
        github : ''

    }
    
    onSubmit = (e) => {
        e.preventDefault();
        this.props.addUser(this.state.name, this.state.lastname, this.state.personal_id, this.state.birthday, this.state.email, this.state.github);
    }

    onChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })

       
    }

    render() {
        return (
            
                <div className="col-md-8 col-sm-12 mx-auto">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h4>Formulario Registro</h4>
                        </div>
                        <div className="card-body">
                            <form  onSubmit={ this.onSubmit } autoComplete="off">
                                <div className="row">
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="name">Nombres</label>
                                            <input type="text"  autoComplete="off"   name="name" id="" onChange={this.onChange} className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="lastname">Apellidos</label>
                                            <input type="text" name="lastname" id="lastname" onChange={this.onChange} className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="personal_id">Cedula</label>
                                            <input type="text" name="personal_id" id="personal_id" onChange={this.onChange} className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="birthday">Fecha de Nacimiento</label>
                                            <input type="text" name="birthday" id="birthday" onChange={this.onChange} className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" name="email" id="email" onChange={this.onChange} className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="github">Github</label>
                                            <input type="text" name="github" id="github" onChange={this.onChange} className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="col-12">
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
