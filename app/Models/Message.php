<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
    protected $fillable = ['sender_id', 'chat_id', 'message'];
    protected $guarded = ['id'];
    protected $appends = ['sent_at', 'sent_at_raw'];

    public function messageable()
    {
        return $this->morphTo();
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function getSentAtAttribute()
    {
        return $this->created_at->format('H.i');
    }

    public function getSentAtRawAttribute()
    {
        return $this->created_at->timestamp;
    }
}
