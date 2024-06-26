<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function delete($id)
    {
        $user = new UserResource(User::find($id));
        if (!User::find($id)) {
            return response()->json(['error' => 'User not found'], 400);
        }
        $user->delete();
        return response()->json(['message' => 'User deleted successfully'], 200);
    }
    public function index()
    {
        $users = User::paginate(10);

        if ($users->isEmpty()) {
            return response()->json(['message' => 'No users found'], 400);
        }
        return UserResource::collection($users);
       
    }
}
