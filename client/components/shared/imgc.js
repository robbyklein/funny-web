import React from 'react'

export default function imgc({src, ...rest}) {
    console.log('tunning running')
    return <img src={`${src}?${new Date().getTime()}`} {...rest} />
} 