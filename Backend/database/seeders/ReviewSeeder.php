<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reviews = [
            [
                'title' => 'Luxury Apartment',
                'description' => 'A luxury apartment located in the heart of the city.',
                'num_of_rooms' => 3,
                'num_of_bathrooms' => 2,
                'area' => 120,
                'price' => 250000,
                'location_id' => 1,
                'property_type_id' => 1,
                'user_id' => 1,
                'availability' => 'available',
                'listing_type' => 'buy',
                'status' => 'accepted',
            ],
            [
                'title' => 'Cozy Villa',
                'description' => 'A cozy villa perfect for family gatherings.',
                'num_of_rooms' => 5,
                'num_of_bathrooms' => 3,
                'area' => 250,
                'price' => 500000,
                'location_id' => 2,
                'property_type_id' => 2,
                'user_id' => 2,
                'availability' => 'available',
                'listing_type' => 'buy',
                'status' => 'accepted',
            ],
            [
                'title' => 'Modern House',
                'description' => 'A modern house with all the latest amenities.',
                'num_of_rooms' => 4,
                'num_of_bathrooms' => 2,
                'area' => 150,
                'price' => 300000,
                'location_id' => 3,
                'property_type_id' => 3,
                'user_id' => 3,
                'availability' => 'unavailable',
                'listing_type' => 'rent',
                'status' => 'pending',
            ],
        ];

        foreach ($properties as &$property) {
            $property['slug'] = Str::slug($property['title']);
            $property['created_at'] = Carbon::now();
            $property['updated_at'] = Carbon::now();
        }

        DB::table('properties')->insert($properties);
    }
}
