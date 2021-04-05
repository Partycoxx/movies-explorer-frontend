import React from "react";

export default function HeaderLogo({className}) {
    return (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="30" height="30" rx="15" fill="#3456F3"/>
        <path d="M10 9.9C10 9.1268 10.6268 8.5 11.4 8.5H18.6C19.3732 8.5 20 9.1268 20 9.9V20.4789C20 20.9367 19.5079 21.2258 19.108 21.003L15.9734 19.2566C15.3683 18.9195 14.6317 18.9195 14.0266 19.2566L10.892 21.003C10.4921 21.2258 10 20.9367 10 20.4789V9.9Z" fill="white"/>
        </svg>

    )
}