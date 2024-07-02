<?php

namespace App\Http\Requests\Reports;

use Illuminate\Foundation\Http\FormRequest;

class CreateReportPropertyRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'property_id' => 'required|exists:properties,id',
            'content' => 'required|string|max:1000',
            'reason_id' => 'required|exists:reason_reports,id'
        ];
    }
}
