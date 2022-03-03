import Avatar from '@/Components/Avatar';
import App from '@/Layouts/App';
import { Inertia } from '@inertiajs/inertia';
import { useForm, usePage } from '@inertiajs/inertia-react';
import React, { useEffect, useRef, useState } from 'react';

export default function Show({ partner, messages }) {
    const { auth } = usePage().props;
    const scrollRef = useRef(null);
    const [ typing, setTyping ] = useState(false)
    const { data, setData, reset } = useForm({
        message: ''
    });

    // sent message to controller
    const submitHandelr = (e) =>{
        e.preventDefault();
        data.message == '' ? '' : Inertia.visit(`/chats/${partner.username}`, {
            method: 'POST',
            data: {
                message: data.message,
                chat_id: messages[0].id,
            },
            headers: {
                'X-Socket-Id': window.Echo.socketId()
            },
            onSuccess: () => {
                reset('message'),
                scrollToBottom()
            },
        })
        
    }

    // listen if have the new message
    Echo.private(`chats.${auth.user.uuid}`)
        .listenForWhisper('isTyping', (e) => {
            setTyping(true);
            clearTimeout(window.timeOut);
            window.timeOut = setTimeout(() => {
                setTyping(false);
            }, 3000);
        })
        .listen('MessageSent', ({ chat }) => {
            Inertia.reload({ 
                onSuccess: () => {
                    scrollToBottom(),
                    setTyping(false)
                }
            });
        })

    const chatClass = (x, y, option = 'justify') => {
        if(option == 'justify'){
            return x === y ? 'justify-end' : 'justify-start';
        }
        if (option == 'background'){
            return x === y ? 'bg-[#005c4b]' : 'bg-[#202c33]';
        }
    }

    const scrollToBottom = () => {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    const onTyping = () => {
        Echo.private(`chats.${partner.uuid}`)
            .whisper('isTyping', {user:auth.user.name})
    };

    useEffect(() => {
        scrollToBottom();
    }, [])
    return (
        <div>
            <div className="flex flex-col h-screen">
                <h1 className='bg-[#202c33] text-white px-6 py-4 gap-x-4 font-semibold flex items-center'>
                    <Avatar src={partner.avatar} />
                    <div>
                        {partner.name}
                        {typing && <span className="block text-xs text-gray-500">Mengetik . . .</span>}
                    </div>
                </h1>
                <div className="flex-1 px-4 py-2 overflow-y-auto" scroll-region={'true'}>
                    {messages[0].messages.map(message => (
                        <div key={message.id} className={` flex mb-2 ${chatClass(auth.user.id, message.sender_id)}`}>
                            <div className={`md:max-w-lg lg:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl sm:max-w-sm rounded py-2 px-3 ${chatClass(auth.user.id, message.sender_id, 'background')}`}>
                                <p className="text-sm text-gray-100 after:mr-14">{message.message}</p>
                                <p className="-mt-3 text-xs text-right text-gray-300/90">
                                    {message.sent_at}
                                </p>
                            </div>
                        </div>
                    ))}
                    <dir ref={scrollRef} className="invisible"></dir>
                </div>
                <div className="border-t-2 flex items-center py-2 gap-x-3 px-5 bg-[#202c33]">
                    <span data-testid="smiley" data-icon="smiley">
                        <svg viewBox="0 0 24 24" width={24} height={24} className="text-gray-200">
                            <path fill="currentColor" d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z" />
                        </svg>
                    </span>
                    <span data-testid="clip" data-icon="clip">
                        <svg viewBox="0 0 24 24" width={24} height={24} className="text-gray-200">
                            <path fill="currentColor" d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z" />
                        </svg>
                    </span>
                    {/* onKeyUp={stopTyping}  */}
                    <form onSubmit={submitHandelr} className="w-full">
                        <input onKeyUp={onTyping} autoFocus name="message" value={data.message} onChange={(e) => setData(e.target.name, e.target.value)} type="text" autoComplete={'true'} placeholder="Start Type . . ." className="bg-[#2a3942] rounded-lg text-white w-full form-text border-0 focus:outline-none focus:ring-0 caret-sky-500 placeholder:text-gray-300" />
                    </form>
                </div>
            </div>
        </div>
    );
}

Show.layout = (page) => <App children={page} />;