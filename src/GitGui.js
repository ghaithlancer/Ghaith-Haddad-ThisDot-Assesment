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
    // function getUsers(userSearch){        
        e.preventDefault()
        // setUserSearch(usersearchRef)
        console.log("hi" + userSearch)
        fetch("https://api.github.com/search/users?q="+ userSearch + "&per_page=100")
        .then((res) => res.json())
        .then(git => setUsers(git.items))
        setLoading(true)
    }

    function handleChange(e){
        setUserSearch(e.target.value)
        // console.log(userSearch)
    }

    // useEffect(() => {
    //     getUsers("david");
    // }, [userSearch])

    console.log(users)

    // (e) => setUserSearch(e.target.value)
    return (
        <>
            <Navbar bg="dark" variant="dark" className="bg-light justify-content-between">
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
                {/* <Form inline>
                    <FormControl type="text" ref={usersearchRef} placeholder="Search Users" className="mr-sm-2" />
                    <Button variant="outline-success" type="submit" onClick={() => getUsers("david")}>Search</Button>
                </Form> */}
                <form onSubmit={getUsers}>
                <input type="text" onChange={handleChange} />
                <button type="submit" >Search </button>
                </form>
            </Navbar> <br/>
            <div>
            {!loading ? (
                <h3>Loading...</h3>
                ) : (
                    users.map(user => {
                    return (
                        <div key={user.id} className="d-flex justify-content-center">
                        <Card style={{ width: '18rem' }} onClick={(e) =>{
                            window.open(user.html_url)
                        }}>
                            <div>{JSON.stringify(user.login)}</div>
                            <Card.Img src={user.avatar_url} variant="top" />
                            <Card.Body>
                                <Card.Title>{user.name}</Card.Title>
                                <Card.Subtitle>{user.login}</Card.Subtitle>
                                <Card.Subtitle>{user.repos} Repos</Card.Subtitle>
                                <Card.Subtitle>{user.followers} Followers</Card.Subtitle>
                                <Card.Subtitle>{user.following} Following</Card.Subtitle>
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