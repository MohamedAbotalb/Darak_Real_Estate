<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class ChangePhoneNumberRequest extends FormRequest
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
            'phone_number' => 'required|numeric|digits_between:10,15|unique:users,phone_number',
        ];
    }
    public function messages()
    {
        return [
            'phone_number.required' => 'The phone number is required.',
            'phone_number.numeric' => 'The phone number must be a valid number.',
            'phone_number.digits_between' => 'The phone number must be between 10 and 15 digits.',
            'phone_number.unique' => 'The phone number has already been taken.',
        ];
    }
}
