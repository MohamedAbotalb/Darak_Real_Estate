<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class AmenitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $amenities = [
            ['name' => 'Shared Gym'],
            ['name' => 'Swimming Pool'],
            ['name' => 'Pets Allowed'],
            ['name' => 'Parking'],
            ['name' => 'Shared Spa'],
            ['name' => 'Security'],
            ['name' => 'Private Garden'],
            ['name' => 'Balcony'],
            ['name' => 'Shopping Center'],
        ];

        foreach ($amenities as &$amenity) {
            $amenity['slug'] = Str::slug($amenity['name']);
            $amenity['created_at'] = Carbon::now();
            $amenity['updated_at'] = Carbon::now();
        }

        DB::table('amenities')->insert($amenities);
    }
}
