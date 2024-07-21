<?php
namespace App\Repositories;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;

class UserRepository implements UserRepositoryInterface
{
    public function find(int $id)
    {
        return User::find($id);
    }

    public function all()
    {
        return User::all();
    }

    public function update(array $attributes)
    {
        $user = User::findOrFail($attributes['id']);
        $user->update($attributes);
        return $user;
    }
    public function updateName($id, array $data)
    {
        $user = $this->find($id);
        $user->update($data);

        return $user;
    }

    public function updatePassword($id, $newPassword)
    {
        $user = $this->find($id);
        $user->update([
            'password' => Hash::make($newPassword),
        ]);
    }

    public function updatePhone($id, $phoneNumber)
    {
        $user = $this->find($id);
        $user->update([
            'phone_number' => $phoneNumber,
        ]);

        return $user;
    }

    public function delete(int $id)
    {
        $user = User::find($id);
        if ($user) {
            $user->delete();
            $user->properties()->delete();
        }
    }
}
