import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class Navbar extends Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
                    <div className="container">
                        <Link className="navbar-brand" to="/">Git4n</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="#">Home <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">Link</Link>
                            </li>
                            </ul>
                        </div>
                    </div>
                    
                </nav>
            </header>
        )
    }
}
