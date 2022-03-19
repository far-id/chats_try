<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Group;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    public function show(Group $group)
    {
        return inertia('Chats/Group', [
            'group' => $group->load('participants', 'messages'),
        ]);
    }

    public function new(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:30',
            'participants' => 'required|array',
        ]);

        $group = Group::create([
            'name' => $request->name,
            'slug' => str()->slug($request->name),
        ]);

        $group->participants()->attach(auth()->id());
        foreach ($request->participants as $participant) {
            $group->participants()->attach($participant['id']);
        }


        return to_route('groups.show', $group->slug);
    }

    public function send(Request $request, Group $group)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $message = $group->messages()->create([
            'message' => $request->message,
            'sender_id' => auth()->id(),
        ]);

        broadcast(new MessageSent($message, $group->uuid, auth()->user()->uuid));
        return back();
    }
}
