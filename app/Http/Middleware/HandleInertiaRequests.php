<?php

namespace App\Http\Middleware;

use App\Http\Resources\UserResource;
use App\Models\Chat;
use App\Models\Group;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request)
    {
        return array_merge(parent::share($request), [
            'auth' => fn() => auth()->check() ? [
                'user' => new UserResource(auth()->user()),
                'users' => UserResource::collection(User::where('id', '!=', auth()->id())->get()),
                'chats' =>  Chat::where('user_1', auth()->id())->orWhere('user_2', auth()->id())
                                ->orderByLastMessage()
                                ->get(),
                'groups' => Group::with('last_message', 'users', 'messages')
                                ->whereRelation('users', 'users.id', auth()->id())
                                ->orderByLastMessage()
                                ->get()
            ]: '',
            
            // 'users' => fn() => auth()->check() ? UserResource::collection(User::where('id', '!=', auth()->id())->get()) : [],
            // 'chats' => fn () => auth()->check() ? 
            //     Chat::with('latest_message', 'userOne', 'userTwo')->where('user_1', auth()->id())->orWhere('user_2', auth()->id())
            //         ->orderByLastMessage('desc')
            //         ->get()
            // : '', // menggunakan function agar tidak diload ulang ketika pindah halaman tapi kayanya ga ngaruh
        ]);
    }
}
