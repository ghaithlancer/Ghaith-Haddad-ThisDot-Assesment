/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

//I got the pagination feature from this tutorial -> https://www.youtube.com/watch?v=IYCa1F-OWmk&t=611s

const Pagination = ({usersPerPage, totalUsers, paginate}) => {
    
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++){
        pageNumbers.push(i)
    }


    return (
        <nav style={{display: "flex", flexWrap: "warp", flexFlow: "wrap", backgroundColor: "#0077ff"}} className="pagination justify-content-center">
            <ul className="pagination justify-content-center">
                {pageNumbers.map(num => (
                    <li key={num} className="page-item">
                        <a onClick={() => paginate(num)} className="page-link">
                            {num}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination