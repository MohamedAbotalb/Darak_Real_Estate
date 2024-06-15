<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(){
        $notifications = NotificationResource::collection(Notification::all());
        if ($notifications->isEmpty()) {
            return response()->json(['message' => 'there is no notifications'],400);
        }
        return response()->json(["data"=>$notifications]);
    }
}
