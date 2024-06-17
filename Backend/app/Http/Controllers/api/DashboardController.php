<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Property;
use App\Models\ReportUser;
use App\Models\ReportProperty;
use App\Models\Review;
use App\Models\PropertyType;
use App\Models\Amenity;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getCounts()
    {
        $counts = [
            'users' => User::count(),
            'properties' => Property::count(),
            'property_types' => PropertyType::count(),
            'user_reports' => ReportUser::count(),
            'property_reports' => ReportProperty::count(),
            'reviews' => Review::count(),
            'amenities' => Amenity::count(),
        ];

        return response()->json($counts);
    }
}