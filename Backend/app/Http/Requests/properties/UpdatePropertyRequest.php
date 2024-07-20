<?php

namespace App\Http\Requests\properties;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePropertyRequest extends FormRequest
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
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'amenities' => 'nullable|array',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'street' => 'nullable|string|max:255',
            'num_of_rooms' => 'nullable|integer',
            'num_of_bathrooms' => 'nullable|integer',
            'area'=>'nullable|integer',
            'listing_type' => 'nullable|string|in:rent,buy',
            'property_type_id' => 'nullable|integer',
            'availability' => 'nullable|string|in:available,unavailable',
        ];
    }
}
