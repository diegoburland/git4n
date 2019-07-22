import React, { Component } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';

import Pagination from './components/Pagination';

export default class Perfil extends Component {




    state = {
        user: null,
        data: null,
        repos: null,
        totalResults: 0,
        currentPage: 1
      }


      componentDidMount () {
        const { name } = this.props.match.params
        const registros = JSON.parse(Cookies.get('users'))

        const user = registros.filter(user => user.github === name);
        this.setState({user})
        
    
        // axios.get(`https://api.github.com/users/${name}/repos`)
        //   .then((repos) => {
        //     this.setState(() => ({ repos.data }))
        //   })
      }

      nextPage = (pageNumber) =>{
          axios.get(`https://api.github.com/users/${this.state.user.github}/repos?page=${pageNumber}`)
          .then((repos)=>{
            this.setState({ repos: repos.data,  currentPage: pageNumber})
          })
      }
      
      render() {
        const numberPage = Math.floor(this.state.totalResults / 5);
         return  <div className="container">
              {this.state.totalResultss > 5 ?  <Pagination pages={numberPage} nextPage={this.nextPage} currentPage={this.state.currentPage}/>: '' }

          </div>
      }
}
