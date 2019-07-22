import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Cookies from 'js-cookie';


//components
import Navbar from './components/Navbar';
import Formulario from './components/Formulario';
import Perfil from './components/Perfil';


export default class App extends Component{

  
  state = {
    users : Cookies.get('users') === undefined? [] : JSON.parse(Cookies.get('users'))
  }



  addUser = (name, lastname, personal_id, birthday, email, github, avatar, repos) => {
    let id = this.state.users.length +1;
    const newUser = {
        id,
        name,
        lastname,
        personal_id,
        birthday,
        email,
        github,
        avatar,
        repos
    }


    
    this.setState({
      users: [...this.state.users, newUser]
    })

  }

  render(){
    
    if(Cookies.get('users') === undefined){ Cookies.set('users', []) }else{
      Cookies.set('users', this.state.users);

    }
    return <div>
              <Router>
                <Navbar/>
                <main className="mainContent">
                  <Route exact path="/" render={()=>{
                    return <div className="container">
                      <Formulario addUser={this.addUser} users ={this.state.users}/>
                    </div>
                  }}>
                  </Route>
                  <Route path="/perfil/:name" component={Perfil}/>
                </main>
              </Router>
            </div>
  }

}


