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

        // $groups = Group::with('last_message', 'participants', 'messages')
        //             ->whereRelation('participants', 'users.id', auth()->id())
        //             ->orderByLastMessage()
        //             ->get();

        $groups =Group::whereSlug('ffd')->get();
        $groups->load('messages', 'participants');
        return $groups;
        // return GroupResource::collection($groups);
        // dd($groups);
    }
}
