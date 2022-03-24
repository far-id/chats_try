<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('chats.{receiver_uuid}.{sender_uuid}', function ($user, $receiver_uuid, $sender_uuid) {
    // return (int) $user->uuid === (int) $uuid;
    return Auth::check();
});
Broadcast::channel('chats.group.{slug}', function($user, $slug) {
    return Auth::check();
});
