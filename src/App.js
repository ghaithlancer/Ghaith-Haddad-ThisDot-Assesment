/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react'
import { Navbar, Form, Button, FormControl, Card, Image } from 'react-bootstrap'
import logo from './github_logo.png'
import UserCards from "./UserCards"
import Pagination from './Pagination'


function App() {

    const [users, setUsers] = useState([]);
    const [usersCount, setUsersCount] = useState(0);
    const [userSearch, setUserSearch] = useState("");
    const usersearchRef = useRef();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(12);


    // Fetches users list from github API based on user search
    const getUsers = (e) => {
        e.preventDefault()
        setLoading(true)
        fetch("https://api.github.com/search/users?q="+ userSearch + "&per_page=100")
        .then((res) => res.json())
        .then(git => {
          setUsersCount(git.total_count)
          setUsers(git.items)
        })
        setCurrentPage(1)
        setLoading(false)
        // console.log("Search Term: " + userSearch)
        console.log(usersCount)
    }

    function handleChange(e){
        setUserSearch(e.target.value)
    }


    // Pagination consts to keep track
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    // console.log(currentUsers)

    return (
        <>
            <Navbar bg="dark" variant="dark" className="bg-light justify-content-between fixed-top">
                <Navbar.Brand>
                    <img
                    alt="logo"
                    src={logo}
                    width="60"
                    height="60"
                    className="d-inline-block align-center"
                    />{' '}
                    GitHub Users Search
                </Navbar.Brand>
                <Form inline onSubmit={getUsers}>
                    <FormControl type="text" ref={usersearchRef} placeholder="Search Users" className="mr-sm-2" onChange={handleChange} />
                    <Button variant="outline-primary" type="submit" >Search</Button>
                </Form>
            </Navbar> <br/>
            <div style={{backgroundColor: "#0077ff", paddingLeft: "80px", color: "white"}}><br/>
                <h2 style={{marginTop: "50px", backgroundColor: "#0077ff"}}>Found {usersCount} search results for: {userSearch}</h2>
            </div>
            <div style={{ backgroundColor: "#0077ff", marginTop: "-10px"}}>
                <UserCards users={currentUsers} loading={loading} />
                <Pagination usersPerPage={usersPerPage} totalUsers={users.length} paginate={paginate}/>            
            </div>


        </>
    )
}

export default App