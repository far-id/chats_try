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
        abort_if(Chat::where('user_1', auth()->id())->where('user_2', $user->id)->orWhere('user_2', auth()->id())->where('user_1', $user->id)->count() == 0, 404);
    
        $messages = Chat::with('userOne', 'userTwo', 'messages')->where(function ($q) use ($user) {
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
        ]);

        $chat = Chat::where('user_1', auth()->id())->where('user_2', $user->id)
                    ->orWhere('user_2', auth()->id())->where('user_1', $user->id)
                    ->first();

        $message = $chat->messages()->create([
            'message' => $request->message,
            'sender_id' => auth()->id(),
        ]);

        broadcast(new MessageSent($message, $user->uuid, auth()->user()->uuid));
        return back();
    }

    public function new(User $user)
    {
        $chat = Chat::where(function($q) use ($user) {
                    $q->where('user_1', auth()->id())->where('user_2', $user->id);
                })->orWhere(function($q) use ($user) {
                    $q->where('user_1', $user->id)->where('user_2', auth()->id());
                })->firstOrCreate(
                    ['user_1' => auth()->id()],
                    ['user_2' => $user->id]
                );
        return to_route('chats.show', $user->username);
    }
}
