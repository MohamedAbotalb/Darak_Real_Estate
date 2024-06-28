<?php
namespace App\Repositories;

use App\Models\User;

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

    public function delete(int $id)
    {
        $user = User::find($id);
        if ($user) {
            $user->delete();
        }
    }
}
