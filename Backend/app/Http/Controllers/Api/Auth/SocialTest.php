<?php

namespace App\Http\Controllers\api\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class SocialLoginController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function redirectToFacebook()
    {
        return Socialite::driver('facebook')->redirect();
    }

    public function handleGoogleCallback()
    {
        try 
        {
            $responseUser = '';
            $user = Socialite::driver('google')->user();

            // Check if the user already exists in the database
            $existingUser = User::where('social_id', $user->id)->first();

            if ($existingUser) {
                Auth::login($existingUser);
                $responseUser = $existingUser;
            } else {
                // Create a new user
                $newUser = User::create([
                    'name' => $user->name,
                    'email' => $user->email,
                    'social_id' => $user->id,
                    'social_type' => 'google',
                    'role' => 'user',
                    'password' => Hash::make('my-google'),
                ]);

                Auth::login($newUser);
                $responseUser = $newUser;
            }
            return response()->json([
                'success' => true,
                'message' => 'User logged in successfully',
                'social_type' => 'google',
                'user' => $responseUser
            ]);
        } 
        catch (\Throwable $th) 
        {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage(),
            ], 500);
        }
        
    }

    public function handleFacebookCallback()
    {
        try 
        {
            $responseUser = '';
            $user = Socialite::driver('facebook')->user();

            // Check if the user already exists in the database
            $existingUser = User::where('social_id', $user->id)->first();

            if ($existingUser) {
                Auth::login($existingUser);
                $responseUser = $existingUser;
            } else {
                // Create a new user
                $newUser = User::create([
                    'name' => $user->name,
                    'email' => $user->email,
                    'social_id' => $user->id,
                    'social_type' => 'facebook',
                    'role' => 'user',
                    'password' => Hash::make('my-facebook'),
                ]);

                Auth::login($newUser);
                $responseUser = $newUser;
            }

            return response()->json([
                'success' => true,
                'message' => 'User logged in successfully',
                'social_type' => 'facebook',
                'user' => $responseUser
            ]);
        } 
        catch (\Throwable $th) 
        {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage(),
            ], 500);
        }
        
    }
}