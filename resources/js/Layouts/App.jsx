import Avatar from '@/Components/Avatar';
import { Link, usePage } from '@inertiajs/inertia-react';
import React, { Fragment, useEffect, useState } from 'react';
import { Menu, Transition, Tab } from '@headlessui/react';
import { Inertia } from '@inertiajs/inertia';

const me = (user, auth) => {
    if (user.user_1 == auth.user.id) {
        return user.user_two;
    } else if (user.user_2 == auth.user.id) {
        return user.user_one;
    }
};

const lastChatAt = (sent_at_raw, sent_at) => {
    const night = Math.round(new Date().setHours(0, 0, 0, 0) / 1000)
    if (sent_at_raw > night) {
        return sent_at;
    }else if (sent_at_raw > night - 86400) {
        return 'Yesterday';
    }else {
        let date = new Date(sent_at_raw * 1000)
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

}

const chatOrGroup = (idx, chat, auth) => {
    idx == 0 ? me(chat, auth).username : chat.name;
    if (idx == 0) {
        return ['chats.show', me(chat, auth).username, me(chat, auth).name];
    }else{
        return ['groups.show', chat.slug, chat.name];
    }
}

function Dropdown() {
    return (
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button title="Options" className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <Link as="button" href={route('logout')} method="POST"
                                        className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    >
                                        {active ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                        )}
                                        Logout
                                    </Link>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
    );
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function Tabs({ auth }) {
    const { chats, groups } = auth;
    let [tabsLabel] = useState({
        chats,
        groups,
    });
    return (
        <div className="w-full max-w-md px-4` sm:px-0">
            <Tab.Group>
                <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
                    {Object.keys(tabsLabel).map((category) => (
                        <Tab
                            key={category}
                            className={({ selected }) =>
                                classNames(
                                    'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                                    selected
                                        ? 'bg-white shadow'
                                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                )
                            }
                        >
                            {category}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-2">
                    {Object.values(tabsLabel).map((chats, idx) => (
                        <Tab.Panel
                            key={idx}
                            className={classNames(
                                'bg-white rounded-xl p-3',
                                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
                            )}
                        >
                                {chats.length > 0 ? chats.map((chat) => {
                                    let cog= chatOrGroup(idx, chat, auth);
                                    return (
                                        <div key={chat.id} className="p-2 bg-white border-b hover:bg-gray-200">
                                            <Link href={route(cog[0], cog[1])}>
                                                <div className='flex items-start justify-between'>
                                                    <span className={` ${route().current(cog[0], cog[1]) ? 'text-sky-700 font-semibold' : 'text-gray-900'}`}>{cog[2]}</span>
                                                    <span className='text-xs text-gray-600' >{chat.last_message && lastChatAt(chat.last_message.sent_at_raw, chat.last_message.sent_at)}</span>
                                                </div>
                                                <span className={`block ${route().current(cog[0], cog[1]) ? 'text-black font-semibold' : 'text-gray-500'}`}>{chat.last_message ? chat.last_message.message.length > 28 ? chat.last_message.message.substring(0, 28) + '...' : chat.last_message.message : 'Start chat'}</span>
                                            </Link>
                                        </div>
                                    )
                                })
                                : 
                                <div className="flex justify-center bg-white ">
                                    <span className="text-gray-500">No chat</span>
                                </div>
                                }
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}

const NewGroupForm = ({auth, participant}) => {
    const groupSubmitHandler = (e) =>{
        e.preventDefault();
    }
    return (
        <div className='w-2/6 h-full'>
            <form onSubmit={groupSubmitHandler}>
                <input type="text" name="name" placeholder='Group Name' />
            </form>
        </div>
    )
}

export default function App(props) {
    const [showNewChat, setShowNewChat] = useState(false);
    const [showAddParticipant, setShowAddParticipant] = useState(false);
    const [showNewGroup, setShowNewGroup] = useState(false);
    const [participant, setParticipant] = useState([]);
    const { auth } = usePage().props;
    const [users, setUsers] = useState(auth.users)

    const [groupName, setGroupName] = useState('')
    const [groupNameLength, setGroupNameLength] = useState(30)

    const newGroupHandler = (e) =>{
        e.preventDefault();
        Inertia.post(route('groups.new'), {
            name: groupName,
            participants: participant
        })
    }

    useEffect(() => {
        users.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    }, [participant])
    return (
        <div className="flex min-h-screen">
            <div className="w-2/6">
                <div className="fixed flex flex-col w-2/6 h-full text-left border-r">
                    <div className="bg-[#202c33] flex justify-between px-5 py-4">
                        <Avatar src={auth.user && auth.user.avatar}/>
                        <div className="flex items-center gap-x-3">
                            <div aria-disabled="false" role="button" tabIndex={0} className="text-gray-200" title="New Chat" aria-label="New Chat"
                                onClick={() => { showNewChat == true ? setShowNewChat(false) : setShowNewChat(true), setShowAddParticipant(false), setUsers(auth.users), setParticipant([])}}>
                                <span data-testid="chat" data-icon="chat">
                                    <svg viewBox="0 0 24 24" width={24} height={24}>
                                        <path fill="currentColor" d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z" />
                                    </svg>
                                </span>
                            </div>
                            <Dropdown />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto bg-gradient-to-r from-cyan-500 to-blue-500">
                        
                        {showNewChat ? 
                            showAddParticipant ?
                                showNewGroup ?
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-disabled="false" role="button" className="w-6 h-6 mr-2 text-white" viewBox="0 0 20 20" fill="currentColor"
                                            onClick={() => { setShowNewGroup(false), setParticipant([]), setGroupName(''), setGroupNameLength(30)}}>
                                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                    </svg>
                                    <form onSubmit={newGroupHandler}>
                                        <div className='bg-white mt-10 py-3 px-6'>
                                            <div className="border-b border-sky-400 flex justify-between">
                                                <input name="name" id="name" maxLength={30} placeholder="Group Name" value={groupName} onChange={(e) => setGroupName(e.target.value)} onKeyUp={() => setGroupNameLength(30 - groupName.length)}
                                                    className="border-gray-300 focus:outline-none rounded-md shadow-sm w-10/12" required />
                                                <span>{groupNameLength}</span>
                                            </div>
                                        </div>
                                        {
                                            groupName.length > 0 && (
                                                <div className='fixed bottom-0 w-2/6 bg-gradient-to-r from-cyan-500 to-blue-500 h-28'>
                                                    <div className='flex items-center justify-center h-full'>
                                                            <svg onClick={(e) => newGroupHandler(e)}
                                                            xmlns="http://www.w3.org/2000/svg" className="p-2 text-white border rounded-full w-9 h-9 hover:bg-white hover:text-blue-500 hover:rounded-full" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </form>

                                    
                                </>
                                :
                            <>
                                    <div className="flex items-center py-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-disabled="false" role="button" className="w-6 h-6 mr-2 text-white" viewBox="0 0 20 20" fill="currentColor"
                                            onClick={() => {showAddParticipant == true ? setShowAddParticipant(false) : setShowAddParticipant(true), setUsers(auth.users), setParticipant([])}} >
                                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                        </svg>
                                        <h3 className="text-xl font-semibold text-white">Add Participant</h3>
                                    </div>
                                    <div className={`${participant.length > 0 ? 'mb-28' : ''}`}>
                                        {
                                            participant.length > 0 ? participant.map((part, id) => (
                                                <div key={id} className="flex items-center py-2">
                                                    <div className="overflow-hidden rounded-full w-7 h-7">
                                                        <img src={part.avatar} alt="avatar" className="object-cover w-full h-full" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <h3 className="text-xl font-semibold text-white">{part.name}</h3>
                                                    </div>
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        onClick={(e) => { setUsers(users => [...users, part]), setParticipant(participant.filter((i) => i !== part)); }}
                                                        className="w-4 h-4 ml-3 text-gray-200 hover:border hover:rounded-full hover:bg-white hover:text-gray-800 " viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            ))
                                                :
                                                <div>
                                                    Clik some users to add
                                                </div>
                                        }

                                        {
                                            users ? users.map(user => (
                                                <div key={user.id} className="p-2 bg-white border-b hover:bg-gray-200"
                                                    onClick={() => { setParticipant(participant => [...participant, user]), setUsers(users.filter((i) => i !== user)); }}>
                                                    <div className={`block text-left w-full focus:outline-none text-gray-600`} >
                                                        {user.name}
                                                        <span className='block'>{user.email}</span>
                                                    </div>
                                                </div>
                                            ))
                                                : ''
                                        }
                                    </div>
                                    {
                                        participant.length > 0 && (
                                            <div className='fixed bottom-0 w-2/6 bg-gradient-to-r from-cyan-500 to-blue-500 h-28'>
                                                <div className='flex items-center justify-center h-full'>
                                                    <svg onClick={() => setShowNewGroup(true)} as="button"
                                                        xmlns="http://www.w3.org/2000/svg" className="p-2 text-white border rounded-full w-9 h-9 hover:bg-white hover:text-blue-500 hover:rounded-full" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                        )
                                    }
                                            
                            </>
                            :
                            <>
                                <div className="flex items-center py-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-disabled="false" role="button" className="w-6 h-6 mr-2 text-white" viewBox="0 0 20 20" fill="currentColor"
                                        onClick={() => showNewChat == true ? setShowNewChat(false) : setShowNewChat(true)}>
                                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                    </svg>
                                    <h3 className="text-xl font-semibold text-white">New Chats</h3>
                                </div>
                                <div className="px-2 py-4 text-xl bg-white border-b hover:bg-gray-200" onClick={() => setShowAddParticipant(true)}>
                                    New Group
                                </div>
                                <div className='py-3 bg-white border-b' />
                                {
                                    auth.users ? auth.users.map(user => (
                                        <div key={user.id} className="p-2 bg-white border-b hover:bg-gray-200">
                                            <Link href={route('chats.new', user.username)} method="POST" as="button"
                                                className={`block text-left w-full focus:outline-none ${route().current('chats.show', user.username) ? 'text-blcak font-semibold' : 'text-gray-600'}`} >
                                                {user.name}
                                                <span className='block'>{user.email}</span>
                                            </Link>
                                        </div>
                                    ))
                                    : ''
                                }
                            </>
                        :
                            <Tabs auth={auth} />
                        }
                    </div>
                </div>
            </div>

            <div className="w-4/6">
                {props.children}
            </div>
        </div>
    );
}
