<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AmenityRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Ensure this is properly set based on your auth logic
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
        ];
    }
}
