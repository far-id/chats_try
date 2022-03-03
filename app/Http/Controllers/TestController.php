<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Message;
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
        $chat = Chat::with('latest_message')->where('user_1', auth()->id())->orWhere('user_2', auth()->id())
        ->orderByLastMessage('desc')
        ->get();
        return $chat;
    }
}
