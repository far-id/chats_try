<?php

namespace App\Http\Controllers;

use App\Http\Resources\GroupResource;
use App\Models\Chat;
use App\Models\Group;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class TestController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        // $groups = User::with('groups')
        //         ->where('id', auth()->id())
        //         ->get();

        $chats = Chat::where('user_1', auth()->id())->orWhere('user_2', auth()->id())
                    ->orderByLastMessage()
                    ->get();

        $groups = Group::with('last_message', 'users', 'messages')
                    ->whereRelation('users', 'users.id', auth()->id())
                    ->orderByLastMessage()
                    ->get();
        return $groups;
        // return GroupResource::collection($groups);
        // dd($groups);
    }
}
