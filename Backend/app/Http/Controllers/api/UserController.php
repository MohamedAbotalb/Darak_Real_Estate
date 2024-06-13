<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Http\Request;

class UserController extends Controller
{
        public function index()
    {
        $users = User::all();
        if ($users->isEmpty()) {
            return response()->json(['message' => 'No users found'], Response::HTTP_NOT_FOUND);
        }
        return response()->json(['message' => 'Users fetched successfully', 'data' => $users,], Response::HTTP_OK);
    }
}
