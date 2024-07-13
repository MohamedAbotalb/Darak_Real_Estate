<?php

namespace App\Repositories\Contracts;

interface PropertyRepositoryInterface
{
    public function getAllProperties();
    public function getPropertyBySlug(string $slug);
    public function getLatestProperties(int $property_type_id, string $listing_type);
    public function getAcceptedProperties(int $perPage);
    public function updateStatus(int $id, string $status);

    public function createProperty(array $data);
    public function searchProperties(array $filters);
    public function showUserProperties(int $id);
    public function updateProperty(array $data,string $slug);
    public function delete(int $id);
}
