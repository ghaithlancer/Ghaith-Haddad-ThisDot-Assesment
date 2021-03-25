/* eslint-disable no-unused-vars */
import { render } from '@testing-library/react'
import React, { useEffect, useState, useRef } from 'react'
import { Navbar, Form, Button, FormControl, Card, Image } from 'react-bootstrap'
import logo from './github_logo.png'
import UserCards from "./UserCards"


function GitGui() {

    const [users, setUsers] = useState([]);
    const [userSearch, setUserSearch] = useState("");
    const usersearchRef = useRef();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(10);

    const getUsers = (e) => {
        e.preventDefault()
        setLoading(true)
        fetch("https://api.github.com/search/users?q="+ userSearch + "&per_page=100")
        .then((res) => res.json())
        .then(git => setUsers(git.items))
        setLoading(false)
        // console.log("Search Term: " + userSearch)
        // console.log(users)
    }

    function handleChange(e){
        setUserSearch(e.target.value)
    }


    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);


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
                    <Button variant="outline-success" type="submit" >Search</Button>
                </Form>
            </Navbar> <br/>
            <div style={{backgroundColor: "#0077ff", marginTop: "-25px", paddingLeft: "80px", color: "white"}}><br/>
                <h2>Search Results for: {userSearch}</h2>
            </div>
            <div style={{display: "flex", flexWrap: "warp", flexFlow: "wrap", backgroundColor: "#0077ff", marginTop: "-25px"}}>
                <UserCards users={currentUsers} loading={loading} />            
            </div>


        </>
    )
}

export default GitGui