/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react'

const GitSearch = React.createContext();


export function useUsers() {
    return useContext(GitSearch)
}

export function UsersProvider({ children }) {

    const [userCount, setUserCount] = useState(null);
    // const [totalUsers, setTotalUsers] = useState(null);
    const [gitUsers, setGitUsers] = useState(null);

    

    function getUsers(userSearch){

        return fetch("https://api.github.com/search/users?q="+ userSearch + "&per_page=100")
            .then(res => res.json())
            .then(users => {
                // setTotalUsers(users.total_count)
                setUserCount(users.total_count)
            // })
            // .then(() =>{
                setGitUsers(users.items)
                // console.log(gitUsers)
            })
    }

    useEffect(() => {
               
        return getUsers("david")

    }, [])


    const values = {
        userCount,
        gitUsers,
        getUsers
    }

    return (
        <GitSearch.Provider value={values}>
            {  children ? children : "Not loaded yet" }
        </GitSearch.Provider>
    )
}
