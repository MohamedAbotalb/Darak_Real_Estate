<?php

namespace App\Repositories;

use App\Models\PropertyType;

interface PropertyTypeRepositoryInterface
{
    public function getAllPropertyTypes();
    public function createPropertyType(array $data);
    public function findPropertyTypeBySlug(string $slug);
    public function updatePropertyType(string $slug, array $data);
    public function deletePropertyType(string $slug);
}
