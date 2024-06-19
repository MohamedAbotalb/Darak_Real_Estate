<?php

namespace App\Http\Controllers\api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\PasswordResetToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use Mail;

class ForgotPasswordController extends Controller
{
    public function sendResetLinkEmail(Request $request)
    {
        try
        {
            // Validate the user email
            $validateUser = Validator::make($request->all(), [
                'email' => 'required|string|email',
            ]);
    
            if ($validateUser->fails()) {
                return response()->json([
                    'success' => false,
                    'message'=> "Validation error",
                    'error' => $validateUser->errors(),
                ], 400);
            }
    
            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message'=> "User not found with this email",
                ], 404);
            }

            $token = Str::random(60);
            $domain = URL::to("/");
            $url = $domain . '/api/reset-password?token=' . $token;

            // $url = config('app.frontend_url') . '/reset-password?token=' . $token;

            $data['url'] = $url;
            $data['email'] = $request->email;
            $data['title'] = 'Password Reset Request';
            $data['user'] = $user;

            // Send the email
            Mail::send('forgetPasswordMail', ['data' => $data], function($message) use ($data) {
                $message->to($data['email'])->subject($data['title']);
            });

            // Save token in database
            $datetime = Carbon::now()->format('Y-m-d H:i:s');
            PasswordResetToken::updateOrCreate(
                ['email'=> $request->email],
                [
                    'email' => $request->email,
                    'token' => $token,
                    'created_at'=> $datetime,
                ]
            );

            return response()->json([
                'success' => true,
                'message'=> "Please check your email to reset your password",
            ], 200);
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
