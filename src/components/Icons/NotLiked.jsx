import React from "react";

export default function HeaderLogo({className, onClick}) {
    return (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} onClick={onClick}>
        <rect width="30" height="30" rx="15" fill="#F4F4F4"/>
        <path d="M10.5 9.9C10.5 9.40294 10.9029 9 11.4 9H18.6C19.0971 9 19.5 9.40294 19.5 9.9V20.4789C19.5 20.5552 19.418 20.6034 19.3513 20.5662L16.2168 18.8198C15.4603 18.3984 14.5397 18.3984 13.7832 18.8198L10.6487 20.5662C10.582 20.6034 10.5 20.5552 10.5 20.4789V9.9Z" stroke="#E8E8E8"/>
        </svg>


    )
}