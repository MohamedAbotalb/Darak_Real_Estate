<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\ChangeAvatarRequest;
use App\Http\Requests\User\ChangePasswordRequest;
use App\Http\Requests\User\ChangePhoneNumberRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Utils\ImageUpload;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    protected $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function delete()
    {
        $this->userRepository->delete(Auth::id());
        return response()->json(['message' => 'User deleted successfully'], 200);
    }

    public function index()
    {
        $users = $this->userRepository->all();

        if (empty($users)) {
            return response()->json(['message' => 'No users found'], 400);
        }
        return UserResource::collection($users);
    }

    public function updateName(UpdateUserRequest $request)
    {
        $user = $this->userRepository->updateName(Auth::id(), $request->validated());
        return response()->json([
            'message' => 'User name updated successfully',
            'user' => new UserResource($user)
        ], 200);
    }

    public function updatePassword(ChangePasswordRequest $request)
    {
        $user = $this->userRepository->find(Auth::id());

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['error' => 'Current password is incorrect'], 400);
        }

        $this->userRepository->updatePassword(Auth::id(), $request->new_password);

        return response()->json(['message' => 'Password updated successfully'], 200);
    }

    public function updatePhone(ChangePhoneNumberRequest $request)
    {
        $user = $this->userRepository->updatePhone(Auth::id(), '+2' . $request->phone_number);

        return response()->json(['message' => 'Phone number updated successfully', 'user' => new UserResource($user)], 200);
    }


    public function show()
    {
        $user = $this->userRepository->find(Auth::id());
        return response()->json(new UserResource($user));
    }

    public function updateAvatar(ChangeAvatarRequest $request)
    {
        $user = $this->userRepository->find(Auth::id());

        if ($request->hasFile('avatar') && $request->file('avatar')->isValid()) {
            if ($user->avatar && File::exists(public_path($user->avatar))) {
                File::delete(public_path($user->avatar));
            }

            $avatarPath = ImageUpload::uploadImage($request->file('avatar'), 'images/avatars');

            $user = $this->userRepository->update([
                'id' => Auth::id(),
                'avatar' => $avatarPath,
            ]);
        }

        return response()->json(['message' => 'Avatar updated successfully', 'user' => new UserResource($user)], 200);
    }
}
