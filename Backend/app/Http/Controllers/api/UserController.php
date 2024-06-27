<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\ChangePasswordRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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
        $users = User::all();

        if ($users->isEmpty()) {
            return response()->json(['message' => 'No users found'], 400);
        }
        return UserResource::collection($users);
    }
    public function updateName(UpdateUserRequest $request)
    {
        $user = User::findOrFail(Auth::id());
        $user->update($request->validated());

        return response()->json([
            'message' => 'User updated successfully',
            'user' => new UserResource($user)
        ], 200);
    }
    
}
