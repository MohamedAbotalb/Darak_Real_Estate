<?php

namespace App\Repositories\Contracts;


interface PropertyTypeRepositoryInterface
{
    public function getAllPropertyTypes();
    public function createPropertyType(array $data);
    public function findPropertyTypeBySlug(string $slug);
    public function updatePropertyType(string $slug, array $data);
    public function deletePropertyType(string $slug);
}
