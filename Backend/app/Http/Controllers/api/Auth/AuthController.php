<?php

namespace App\Http\Controllers\api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{
    public function register(Request $request) {
        try 
        {
            // Validate the user registration data
            $validateUser = Validator::make($request->all(), [
                'first_name' => 'required|string|min:3|max:255',
                'last_name' => 'required|string|min:3|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed',
                'phone_number' => 'required|string|regex:/^01[0125][0-9]{8}$/',
                'role' => 'required|string|in:admin,user,landlord',
            ], [
                'phone_number.regex'=> 'The phone number must be a valid egyptian phone number',
            ]);

            if ($validateUser->fails()) {
                return response()->json([
                    'success' => false,
                    'message'=> "Validation error",
                    'error' => $validateUser->errors(),
                ], 400);
            }

            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $request->role,
                'phone_number' => '+2' . $request->phone_number,
                'avatar' => 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg'
            ]);

            return response()->json([
                'success' => true,
                'message'=> "User created successfully",
            ], 201);
        }
        catch (\Throwable $th) 
        {
            return response()->json([
                'success' => false,
                'message'=> $th->getMessage(),
            ], 500);
        }
    }
}
