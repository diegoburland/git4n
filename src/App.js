import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Cookies from 'js-cookie';


//components
import Navbar from './components/Navbar';
import Formulario from './components/Formulario';


export default class App extends Component{

  
  state = {
    users : Cookies.get('users') === undefined? [] : JSON.parse(Cookies.get('users'))
  }

  cancelCourse = () => { 
    document.getElementById("mainform").reset();
  }

  addUser = (name, lastname, personal_id, birthday, email, github) => {
    let id = this.state.users.length +1;
    const newUser = {
        id,
        name,
        lastname,
        personal_id,
        birthday,
        email,
        github
    }

    this.cancelCourse()
    
    this.setState({
      users: [...this.state.users, newUser]
    })

  }

  render(){
    console.log(this.state.users)
    if(Cookies.get('users') === undefined){ Cookies.set('users', []) }else{
      Cookies.set('users', this.state.users);

    }
    return <div>
              <Router>
                <Navbar/>
                <main className="mainContent">
                  <div className="container">
                    <div className="row">
                      <Formulario addUser={this.addUser} />
                    </div>
                  </div>
                </main>
              </Router>
            </div>
  }

}


