<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;
    protected $fillable = ['sender_id', 'receiver_id'];
    protected $guarded = ['id'];
    // protected $appends = ['preview'];

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function latest_message()
    {
        return $this->hasOne(Message::class)->latestOfMany();
    }

    public function scopeOrderByLastMessage($q, $order)
    {
        return $q->orderBy(Message::select('created_at')
                ->whereColumn('chat_id', 'chats.id')
                ->latest()
                ->take(1)
        , $order);
    }

    // public function getPreviewAttribute()
    // {
    //     $latest_message = $this->messages()->latest()->first();
    //     return $latest_message ? [
    //         'message' => $latest_message->message,
    //         'sent_at' => $latest_message->created_at->diffForHumans(),
    //         'sent_at_raw' => strtotime($latest_message->created_at)
    //     ] : [];
    // }
    public function userOne()
    {
        return $this->belongsTo(User::class, 'user_1');
    }

    public function userTwo()
    {
        return $this->belongsTo(User::class, 'user_2');
    }

    
}
