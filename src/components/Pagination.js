import React from 'react';

const Pagination = (props) => {
    const pagesLink = [];

    for(let i = 1; i <= props.pages + 1; i++){
        let active = props.currentPage === i ? 'active': '';
        pagesLink.push(
        <li className={`page-item ${active}`} key={i} onClick={()=> props.nextPage(i)}>
            <a className="page-link" href="javascript:void(0)">{i}</a>
        </li>)
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <ul className="pagination text-center">
                    {pagesLink}
                </ul>
            </div>
        </div>
    )
}

export default Pagination;