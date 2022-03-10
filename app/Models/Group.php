<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'slug', 'description', 'image',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
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
            ->whereColumn('messages.messageable_id', 'groups.id')
            ->where('messages.messageable_type', 'App\Models\Group')
            ->latest()
                ->take(1),
            'desc'
        );
    }
}
