<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;
    protected $fillable = ['sender_id', 'receiver_id'];
    protected $guarded = ['id'];
    // protected $with = ['user1', 'user2'];
    protected $appends = ['preview'];


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
        return $this->hasMany(Message::class);
    }

    public function getPreviewAttribute()
    {
        return $this->messages()->latest()->first()->message ?? [];
    }
}
