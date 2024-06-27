<?php

namespace App\Http\Requests\Amenities;

use Illuminate\Foundation\Http\FormRequest;

class AmenityRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
        ];
    }
}
