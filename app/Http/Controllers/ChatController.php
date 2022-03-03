<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Http\Resources\ChatResource;
use App\Http\Resources\UserResource;
use App\Models\Chat;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\TryCatch;

class ChatController extends Controller
{
    public function index()
    {
        return inertia('Chats/Index');
    }

    public function show(User $user)
    {
        $messages =
        Chat::with('userOne', 'userTwo', 'messages')->where(function ($q) use ($user) {
            $q->where('user_1', auth()->id())->where('user_2', $user->id);
        })->orWhere(function ($q) use ($user) {
            $q->where('user_1', $user->id)->where('user_2', auth()->id());
        })->get();
        return inertia('Chats/Show', [
            'messages' => $messages,
            'partner' => new UserResource($user),
        ]);
    }

    public function send(Request $request, User $user)
    {
        $request->validate([
            'message' => 'required|string',
            'chat_id' => 'required|integer',
        ]);
        $message = Message::create([
            'message' => $request->message,
            'sender_id' => auth()->id(),
            'chat_id' => $request->chat_id
        ]);

        broadcast(new MessageSent($message, $user->uuid));
        return back();
    }

    // public function send(Request $request, User $user)
    // {
    //     $request->validate([
    //         'message' => 'required',
    //     ]);
    //     $chat = auth()->user()->chats()->create([
    //         'message' => request('message'),
    //         'receiver_id' => $user->id,
    //     ]);

    //     broadcast(new MessageSent($chat->load('receiver')))->toOthers();

    //     return back();
    // }
}
