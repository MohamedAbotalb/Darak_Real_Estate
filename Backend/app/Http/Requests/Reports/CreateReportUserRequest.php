<?php

namespace App\Http\Requests\Reports;

use Illuminate\Foundation\Http\FormRequest;

class CreateReportUserRequest extends FormRequest
{
    public function authorize()
    {
        return true; 
    }

    public function rules()
    {
        return [
            'landlord_id' => 'required|exists:users,id',
            'content' => 'required|string|max:1000',
            'reason_id' => 'required|exists:reason_reports,id'
        ];
    }
}
