import './TwitterFollowCard.css'
import { useState } from 'react';

export function TwitterFollowCard({userName, name, initialIsFollowing}){
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
    
    const text = isFollowing?'Siguiendo':'Seguir';
    const buttonClassName = isFollowing
    ?'tw-followCard-button is-following'
    :'tw-followCard-button'

    const handleClick = ()=>{
        setIsFollowing(!isFollowing)
    }

    return(
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img
                className='tw-followCard-avatar'
                src={`https://unavatar.io/${userName}`} 
                alt={`${userName}`} />
                <div className='tw-followCard-usuarioInfo'>
                    <strong>{name}</strong>
                    <span>@{userName}</span>
                </div>
            </header>
            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    <span className='tw-followCard-button-text'>{text}</span>
                    <span className='tw-followCard-unFollow'>Dejar de seguir</span>
                </button>
            </aside>
        </article>
    )
}