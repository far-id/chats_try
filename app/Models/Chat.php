<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    protected $fillable = ['user_1', 'user_2'];
    protected $guarded = ['id'];
    protected $with = ['userOne', 'userTwo', 'last_message', 'messages'];

    public function userOne()
    {
        return $this->belongsTo(User::class, 'user_1');
    }

    public function userTwo()
    {
        return $this->belongsTo(User::class, 'user_2');
    }

    public function messages()
    {
        return $this->morphMany(Message::class, 'messageable');
    }

    public function last_message()
    {
        return $this->morphOne(Message::class, 'messageable')->latestOfMany();
    }

    public function scopeOrderByLastMessage($q)
    {
        return $q->orderBy(
            Message::select('created_at')
                ->whereColumn('messages.messageable_id', 'chats.id')
                ->where('messages.messageable_type', 'App\Models\Chat')
                ->latest()
                ->take(1)
            , 'desc' );
    }
}
