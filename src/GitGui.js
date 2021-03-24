/* eslint-disable no-unused-vars */
import { render } from '@testing-library/react'
import React, { useEffect, useState, useRef } from 'react'
import { Navbar, Form, Button, FormControl, Card, Image } from 'react-bootstrap'
import logo from './github_logo.png'


function GitGui() {

    const [users, setUsers] = useState([]);
    const [userSearch, setUserSearch] = useState("");
    const usersearchRef = useRef();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(10);

    const getUsers = (e) => {
        e.preventDefault()
        console.log("Search Term: " + userSearch)
        fetch("https://api.github.com/search/users?q="+ userSearch + "&per_page=100")
        .then((res) => res.json())
        .then(git => setUsers(git.items))
        setLoading(true)
    }

    function handleChange(e){
        setUserSearch(e.target.value)
    }


    console.log(users)

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
            {!loading ? (
                <div style={{backgroundColor: "#0077ff"}}>
                
                </div>
                ) : (
                    users.map(user => {
                    return (
                        <div key={user.id} className="d-flex justify-content-center" style={{flex: "1", margin: "50px", backgroundColor: "#0077ff"}}>
                        <Card style={{ width: '20rem' }}>
                            <Card.Img src={user.avatar_url} variant="top" onClick={(e) =>{window.open(user.url)}} style={{padding: "10px"}}/>
                            <Card.Body>
                                <Card.Title >{user.login}</Card.Title>
                                
                                <Card.Subtitle onClick={(e) =>{window.open(user.repos_url)}} style={{marginBottom: "15px"}}>Repos Url</Card.Subtitle>
                                <Card.Subtitle onClick={(e) =>{window.open(user.followers_url)}} style={{marginBottom: "15px"}}>Followers Url</Card.Subtitle>
                                <Card.Subtitle onClick={(e) =>{window.open(user.following_url)}} style={{marginBottom: "15px"}}>Following Url</Card.Subtitle>
                                <Card.Subtitle onClick={(e) =>{window.open(user.organizations_url)}} style={{marginBottom: "15px"}}>Organization Url</Card.Subtitle>
                            </Card.Body>
                        </Card>
                        </div>
                );
                })
            )}
            </div>


        </>
    )
}

export default GitGui