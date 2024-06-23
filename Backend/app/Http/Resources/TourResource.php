<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TourResource extends JsonResource
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
            'user_id' => $this->user_id,
            'property_id' => $this->property_id,
            'status' => $this->status,
            'dates' => $this->whenLoaded('tourDates', function () {
                return $this->tourDates->pluck('date');
            }),
            'property' => new PropertyResource($this->whenLoaded('property')),
        ];
    }
}
