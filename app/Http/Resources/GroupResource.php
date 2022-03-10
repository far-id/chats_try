<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class GroupResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'username' => $this->username,
            'avatar' => $this->picture(),
            'groups' => [
                'id' => $this->groups->id,
                'name' => $this->groups->name,
                'slug' => $this->groups->slug,
                'description' => $this->groups->description,
                'image' => $this->groups->image,
            ],
            
        ];
    }
}
