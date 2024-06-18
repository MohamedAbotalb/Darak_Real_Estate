<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePropertyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'description' => 'required|string',
            'num_of_rooms' => 'required|integer',
            'num_of_bathrooms' => 'required|integer',
            'area' => 'required|numeric',
            'price' => 'required|integer',
            'location_id' => 'required|exists:locations,id',
            'property_type_id' => 'required|exists:property_types,id',
            'user_id' => 'required|exists:users,id',
            'availability' => 'required|in:available,unavailable',
            'listing_type' => 'required|in:renting,selling',
            'amenities' => 'array',
            'amenities.*' => 'exists:amenities,id',
            'images' => 'required|array',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }
}
