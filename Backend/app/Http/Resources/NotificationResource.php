<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
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
            'from' => new UserResource($this->fromUser),
            'to' => new UserResource($this->toUser),
            'tour_id' => $this->tour_id,
            'tour' => new TourResource($this->whenLoaded('tour')),
            'property_id' => $this->property_id,
            'property' => new PropertyResource($this->whenLoaded('property')),
            'message' => $this->message,
            'type' => $this->type,
            'status' => $this->status,
            'created_at' => $this->created_at->toDateTimeString(),
        ];
    }
}
