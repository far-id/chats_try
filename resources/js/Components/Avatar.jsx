import React from 'react';

export default function Avatar({src}) {
    return <img src={src} alt="" draggable="false" className="rounded-full w-7 h-7" />;
}

