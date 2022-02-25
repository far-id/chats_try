<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Http\Resources\ChatResource;
use App\Http\Resources\UserResource;
use App\Models\Chat;
use App\Models\User;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function index()
    {
        return inertia('Chats/Index');
    }

    public function show(User $user)
    {
        $chat = Chat::where(function ($q) use ($user) {
                        $q->where('sender_id', auth()->id())->where('receiver_id', $user->id);
                    })->orWhere(function ($q) use ($user) {
                        $q->where('sender_id', $user->id)->where('receiver_id', auth()->id());
                    })->get();
        return inertia('Chats/Show', [
            'user' => new UserResource($user),
            'messages' => ChatResource::collection($chat),
        ]);
    }

    public function send(Request $request, User $user)
    {
        $request->validate([
            'message' => 'required',
        ]);
        $chat = auth()->user()->chats()->create([
            'message' => request('message'),
            'receiver_id' => $user->id,
        ]);

        broadcast(new MessageSent($chat))->toOthers();

        return back();
    }
}
