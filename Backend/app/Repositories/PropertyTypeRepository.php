<?php

namespace App\Repositories;

use App\Models\PropertyType;

class PropertyTypeRepository implements PropertyTypeRepositoryInterface
{
    public function getAllPropertyTypes()
    {
        return PropertyType::with('properties')->get();
    }

    public function createPropertyType(array $data)
    {
        return PropertyType::create($data);
    }

    public function findPropertyTypeBySlug(string $slug)
    {
        return PropertyType::where('slug', $slug)->with('properties')->first();
    }

    public function updatePropertyType(string $slug, array $data)
    {
        $propertyType = $this->findPropertyTypeBySlug($slug);
        if ($propertyType) {
            $propertyType->update($data);
            return $propertyType;
        }

        return null;
    }

    public function deletePropertyType(string $slug)
    {
        $propertyType = $this->findPropertyTypeBySlug($slug);
        if ($propertyType) {
            $propertyType->delete();
            return true;
        }

        return false;
    }
}
