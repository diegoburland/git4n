import React, { Component } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';

import Pagination from './Pagination';

export default class Perfil extends Component {

    state = {
        user: null,
        data: null,
        repos: 0,
        totalResults: 0,
        currentPage: 1,
        allRepo: '',
        pagination: true,
        initialState: ''
    }

    componentWillMount () {
    const { name } = this.props.match.params
    const registros = JSON.parse(Cookies.get('users'))

    const user = registros.filter(user => user.github === name);
    if(user.length === 0){
        window.location.href = 'http://localhost:3000';
    }
    const useri = user[0];
    this.setState({user: useri})
    axios.get(`https://api.github.com/users/${useri.github}/repos`)
        .then((repos)=>{
            
        this.setState({ totalResults: repos.data.length, allRepo: repos.data})
        })
    
    axios.get(`https://api.github.com/users/${useri.github}/repos?per_page=5&page=1`)
    .then((reposs)=>{

        this.setState({ repos: reposs.data, initialState: reposs.data})
    })
    }

    nextPage = (pageNumber) =>{
        console.log(`https://api.github.com/users/${this.state.user.github}/repos?page=${pageNumber}`);
        axios.get(`https://api.github.com/users/${this.state.user.github}/repos?per_page=5&page=${pageNumber}`)
        .then((repos)=>{
        this.setState({ repos: repos.data,  currentPage: pageNumber})
        })
    }

    filterList = (e) =>{
        if(e.target.value.length > 2){
            var updatedList = this.state.allRepo;
            this.setState({ repos:updatedList, pagination : false})
            
            updatedList = updatedList.filter(item =>{
                
            return item.name.toLowerCase().search(
                e.target.value.toLowerCase()) !== -1;
            });
            
            this.setState({repos: updatedList});

        }else{
            this.setState({repos: this.state.initialState, pagination: true, currentPage: 1})
        }
    }
    render() {
    const numberPage = Math.floor(this.state.totalResults / 5);
        return  <div className="container mb-5">
            <div className="card mb-4">
                <div className="row">
                    <div className="col-md-2 col-sm-12">
                        <div className="card-body">
                        <img src={this.state.user.avatar} alt="img" className="img-profile img-fluid rounded-circle"/>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="card-body">
                            <h2 className="name-profile">{ this.state.user.name } {this.state.user.lastname}</h2>
                            <p className="email-profile">{ this.state.user.email } {this.state.user.lastname}</p>
                            <a target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary" href={`https://github.com/${this.state.user.github}`}>Perfil en github</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header">
                    <h3>Repositorios</h3>
                    <div className="buscador">
                        <input type="text" name="buscador" onChange={ this.filterList } id="buscador" placeholder="Buscar"  className="form-control"/>
                    </div>
                </div>
                <div className="card-body pt-0">
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Lenguajes</th>
                        <th scope="col">Branch</th>
                        <th scope="col">Url repositorio</th>
                        </tr>
                    </thead>
                    <tbody id="container_repos">
                    {
                        this.state.repos !== 0
                        ?
                        this.state.repos.map(repo =>{
                            return <tr key={repo.id}>
                            <th scope="row">{repo.name}</th>
                            <td >{repo.description? repo.description: 'sin descripcion'}</td>
                            <td>{repo.language}</td>
                            <td>{repo.default_branch}</td>
                            <td><a href={repo.html_url} target="_blank" rel="noopener noreferrer">Ir a github</a></td>
                            </tr>
                        })
                        : '<tr></tr>'
                    
                    }
            </tbody>
                </table>
                </div>
                <div className="card-footer">
                    {this.state.totalResults > 5 ? this.state.pagination ? <Pagination pages={numberPage} nextPage={this.nextPage} currentPage={this.state.currentPage}/>: '' : '' }
                </div>
            </div>
        </div>
        
    }
}
