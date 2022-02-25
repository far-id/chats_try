import Avatar from '@/Components/Avatar';
import { Link, usePage } from '@inertiajs/inertia-react';
import React from 'react';

export default function App(props) {
    const { users, auth } = usePage().props;
    return (
        <div className="flex min-h-screen">
            <div className="w-1/4">
                <div className="w-1/4 flex flex-col text-right fixed h-full border-r">
                    <div className="bg-[#202c33] flex justify-between px-5 py-4">
                        <Avatar src={auth.user && auth.user.avatar}/>
                        <div className="flex items-center gap-x-3">
                                <div aria-disabled="false" role="button" tabIndex={0} className="text-gray-200" title="Chat baru" aria-label="Chat baru">
                                    <span data-testid="chat" data-icon="chat">
                                        <svg viewBox="0 0 24 24" width={24} height={24}>
                                            <path fill="currentColor" d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z" />
                                        </svg>
                                    </span>
                                </div>
                                <div aria-disabled="false" role="button" tabIndex={0} className="text-gray-200" title="Menu" aria-label="Menu">
                                    <span data-testid="menu" data-icon="menu">
                                        <svg viewBox="0 0 24 24" width={24} height={24}>
                                            <path fill="currentColor" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z" />
                                        </svg>
                                    </span>
                                </div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {users.map(user => (
                            <div key={user.id} className="p-2">
                                <Link href={route('chats.show', user.username)} className={`block ${route().current('chats.show', user.username) ? 'text-blcak font-semibold' : 'text-gray-600'}`} >
                                    {user.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-3/4">
                {props.children}
            </div>
        </div>
    );
}
