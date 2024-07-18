<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyUpdateOldDataResource extends JsonResource
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
            'property_id' => $this->property->id,
            'old_data' => [
                'id' => $this->property->id,
                'title' => $this->property->title,
                'slug' => $this->property->slug,
                'description' => $this->property->description,
                'num_of_rooms' => $this->property->num_of_rooms,
                'num_of_bathrooms' => $this->property->num_of_bathrooms,
                'area' => $this->property->area,
                'price' => $this->property->price,
                'availability' => $this->property->availability,
                'listing_type' => $this->property->listing_type,
                'status' => $this->property->status,
                'images' => $this->property->images,
            ]];
    }
}
