<?php

namespace App\Http\Controllers;

use App\Models\Chat;
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
        // $test = Chat::with('userOne', 'userTwo', 'messages')->where(function($q){
        //     $q->where('user_1', auth()->id())->where('user_2', 4);
        // })->orWhere(function($q){
        //     $q->where('user_1', 4)->where('user_2', auth()->id());
        // })->get();
        // return [
        //     'messages' => $test,
        // ];

        $chat = Chat::where('user_1', auth()->id())->orWhere('user_2', auth()->id())->get();
        return $chat;
    }
}
