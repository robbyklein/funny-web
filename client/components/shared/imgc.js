import React from 'react'

export default function imgc({src, ...rest}) {
    return <img src={`${src}?${new Date().getTime()}`} {...rest} />
} 