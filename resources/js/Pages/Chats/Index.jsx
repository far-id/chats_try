import React from 'react';
import App from '@/Layouts/App';
export default function Index(props) {
    return (
        <div>
            Start Chatting
        </div>
    );
}

Index.layout = (page) => <App children={page} />