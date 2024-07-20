<?php
namespace App\Repositories\Contracts;


interface UserRepositoryInterface
{
    public function find(int $id);
    public function all();
    public function update(array $attributes);
    public function updateName($id, array $data);
    public function updatePassword($id, $newPassword);
    public function updatePhone($id, $phoneNumber);
    public function delete(int $id);
}