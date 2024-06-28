<?php
namespace App\Repositories;

use App\Models\User;

interface UserRepositoryInterface
{
    public function find(int $id);
    public function all();
    public function update(array $attributes);
    public function delete(int $id);
}