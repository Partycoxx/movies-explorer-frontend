import React from 'react'; 

export default function Hamburger({className, onClick}) {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} onClick={onClick}>
        <rect x="7.16016" y="9.28249" width="3" height="22" transform="rotate(-45 7.16016 9.28249)" fill="black"/>
        <rect x="22.7168" y="7.16117" width="3" height="22" transform="rotate(45 22.7168 7.16117)" fill="black"/>
        </svg>

    )
}