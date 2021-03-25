/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Button } from 'react-bootstrap'


const UserCards = ({users, loading}) => {

    if(loading) {
        return <h2 style={{backgroundColor: "#0077ff", marginTop: "-25px", paddingLeft: "80px", color: "white"}}>Loading Users...</h2>
    }

    return (
        <div style={{display: "flex", flexWrap: "warp", flexFlow: "wrap", backgroundColor: "#0077ff"}}>
            {users.map(user => (
                // return (
                    <div key={user.id} className="d-flex justify-content-center" style={{flex: "1", margin: "50px", backgroundColor: "#0077ff"}}>
                        <Card style={{ width: '20rem' }}>
                            <Card.Img src={user.avatar_url} variant="top" onClick={(e) =>{window.open(user.url)}} style={{padding: "10px"}}/>
                            <Card.Body style={{textAlign: "center"}}>
                                <Card.Title >{user.login}</Card.Title>
                                <Button size="lg" block onClick={(e) =>{window.open(user.repos_url)}} style={{marginBottom: "10px", marginTop: "15px"}}>Repos Url</Button>
                                <Button size="lg" block onClick={(e) =>{window.open(user.followers_url)}} style={{marginBottom: "10px"}}>Followers Url</Button>
                                <Button size="lg" block onClick={(e) =>{window.open(user.following_url)}} style={{marginBottom: "10px"}}>Following Url</Button>
                                <Button size="lg" block onClick={(e) =>{window.open(user.organizations_url)}} style={{marginBottom: "10px"}}>Organization Url</Button>
                            </Card.Body>
                    </Card>
                    </div>
            ))}
        </div>
        )
}

export default UserCards
