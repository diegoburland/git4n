import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//components
import Navbar from './components/Navbar';
import Formulario from './components/Formulario';


export default class App extends Component{

  addUser = (name, lastname, personal_id, birthday, email, github)=>{
    const newUser = {
      name,
      lastname,
      personal_id,
      birthday,
      email,
      github
    }

    console.log(newUser);
  }

  render(){
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


