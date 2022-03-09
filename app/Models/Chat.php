<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;
    protected $fillable = ['user_1', 'user_2'];
    protected $guarded = ['id'];
    // protected $appends = ['preview'];

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
    
    // get 1 latest message
    public function latest_message()
    {
        return $this->hasOne(Message::class)->latestOfMany();
    }

    public function scopeOrderByLastMessage($q,)
    {
        return $q->orderBy(Message::select('created_at')
                ->whereColumn('chat_id', 'chats.id')
                ->latest()
                ->take(1)
        , 'desc');
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
