import spinner from '../assets/images/spinner.gif'
import React from 'react'

export default function WaitingGif() {
    return (
        <img
            src={spinner}
            style={{ width: '200px', margin: 'auto', display: 'block', background: 'transparent' }}
            alt='Loading'
        />
    )
}