import React, { Component } from 'react';

export default class Pagination extends Component {

    pagesLink = [];

    

    render() {
        for(let i = 1; i <= this.rops.pages + 1; i++){
            let active = this.props.currentPage == i ? 'active': '';
            this.pagesLink.push(
            <li className={`btn ${active}`} key={i} onClick={()=> this.props.nextPage(i)}>
                <a href="#">{i}</a>
            </li>)
        }
        return (
            <div className="container">
                <div className="row">
                    <ul className="pagination">
                        {this.pagesLink}
                    </ul>
                </div>
            </div>
        )
    }
}
