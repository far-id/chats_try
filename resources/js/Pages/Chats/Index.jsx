import React from 'react';
import App from '@/Layouts/App';
export default function Index(props) {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <h2 className='text-2xl text-gray-900 font-semibold italic'>Start Chatting</h2>
        </div>
    );
}

Index.layout = (page) => <App children={page} />