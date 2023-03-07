import React from 'react'
import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

export function App(){

    const users=[
        {
            userName:'tyler',
            name:'Tyler Jurado',
            initialIsFollowing:true,
        },
        {
            userName:'daniel',
            name:'Daniel Smith',
            initialIsFollowing:true,
        },
        {
            userName:'pepe',
            name:'El pepe',
            initialIsFollowing:true,
        },
    ]

    return(
    <section className='App'>
        {
            users.map(({userName,name,initialIsFollowing})=>(
                <TwitterFollowCard
                    key={userName}
                    userName={userName}
                    initialIsFollowing={initialIsFollowing}
                    name={name}>
                </TwitterFollowCard>
            ))
        }
    </section>
    )
}