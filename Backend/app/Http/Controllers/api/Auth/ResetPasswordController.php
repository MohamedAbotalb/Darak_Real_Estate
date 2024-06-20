<?php

namespace App\Http\Controllers\api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\PasswordResetToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class ResetPasswordController extends Controller
{
    public function reset(Request $request)
    {
        try {
            // Validate the reset password request
            $validator = Validator::make($request->all(), [
                'token' => 'required|string',
                'password' => 'required|string|min:8|confirmed',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors(),
                ], 400);
            }

            // Find the password reset token
            $passwordResetToken = PasswordResetToken::where('token', $request->token)->first();
            
            if (!$passwordResetToken) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid or expired token',
                ], 404);
            }

            // Find the user associated with this token
            $user = User::where('email', $passwordResetToken->email)->first();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found',
                ], 404);
            }

            // Update the user password
            $user->password = Hash::make($request->password);
            $user->save();

            // Delete the password reset token
            $passwordResetToken->delete();

            return response()->json([
                'success' => true,
                'message' => 'Password reset successfully',
            ], 200);
        } 
        catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
