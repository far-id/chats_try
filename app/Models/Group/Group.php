<?php

namespace App\Models\Group;

use App\Models\User;
use Illuminate\Database\Eloquent\Casts\Attribute;
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
        return $this->hasMany(Message::class);
    }

    public function latest_message()
    {
        return $this->hasOne(MessageOfGroup::class)->latestOfMany();
    }

    public function scopeOrderByLastMessage($q)
    {
        return $q->orderBy(
            MessageOfGroup::select('created_at')
            ->whereColumn('group_id', 'groups.id')
            ->latest()
            ->take(1)
        , 'desc');
    }
}
