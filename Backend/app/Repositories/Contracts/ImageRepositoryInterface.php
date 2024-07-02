<?php
namespace App\Repositories\Contracts;

interface ImageRepositoryInterface
{
    public function deleteImage(int $imageId);
}
