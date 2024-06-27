<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'num_of_rooms' => $this->num_of_rooms,
            'num_of_bathrooms' => $this->num_of_bathrooms,
            'area' => $this->area,
            'price' => $this->price,
            'availability' => $this->availability,
            'listing_type' => $this->listing_type,
            'location' => new LocationResource($this->whenLoaded('location')),
            'property_type' => new PropertyTypeResource($this->whenLoaded('property_type')),
            'user' => new UserResource($this->whenLoaded('user')),
            'images' => PropertyImageResource::collection($this->images),
            'amenities' => AmenityResource::collection($this->whenLoaded('amenities'))
        ];
    }
}
