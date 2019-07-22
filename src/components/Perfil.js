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
        currentPage: 1
      }


      componentWillMount () {
        const { name } = this.props.match.params
        const registros = JSON.parse(Cookies.get('users'))

        const user = registros.filter(user => user.github === name);
        const useri = user[0];
        this.setState({user: useri})
        axios.get(`https://api.github.com/users/${useri.github}/repos`)
          .then((repos)=>{
              
            this.setState({ totalResults: repos.data.length})
          })
        
        axios.get(`https://api.github.com/users/${useri.github}/repos?per_page=5&page=1`)
        .then((reposs)=>{

            this.setState({ repos: reposs.data})
        })
    
        
      }

      nextPage = (pageNumber) =>{
          console.log(`https://api.github.com/users/${this.state.user.github}/repos?page=${pageNumber}`);
          axios.get(`https://api.github.com/users/${this.state.user.github}/repos?per_page=5&page=${pageNumber}`)
          .then((repos)=>{
            
            
            this.setState({ repos: repos.data,  currentPage: pageNumber})
            
          })
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
                             <a target="_blank" className="btn btn-sm btn-primary" href={`https://github.com/${this.state.user.github}`}>Perfil en github</a>
                         </div>
                     </div>
                 </div>
             </div>
             <div className="card">
                 <div className="card-header">
                     <h3>Repositorios</h3>
                 </div>
                 <div className="card-body">
                 <table class="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Lenguajes</th>
                        <th scope="col">Branch</th>
                        <th scope="col">Url repositorio</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.repos !== 0
                        ?
                        this.state.repos.map(repo =>{
                            return <tr>
                            <th scope="row">{repo.name}</th>
                            <td >{repo.description? repo.description: 'sin descripcion'}</td>
                            <td>{repo.language}</td>
                            <td>{repo.default_branch}</td>
                            <td><a href={repo.html_url} target="_blank" rel="noopener noreferrer">Ir a github</a></td>
                          </tr>
                        })
                        : '<div></div>'
                    
                    }
                </tbody>
                </table>
                 </div>
                 <div className="card-footer">
                 {this.state.totalResults > 5 ?  <Pagination pages={numberPage} nextPage={this.nextPage} currentPage={this.state.currentPage}/>: '' }
                 </div>
             </div>
             

              
          </div>
      }
}
