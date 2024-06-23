<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UserSeeder::class);
        $this->call(PropertyTypeSeeder::class);  
        \App\Models\Location::factory(10)->create(); 
        \App\Models\Property::factory(10)->create();   
        \App\Models\PropertyImage::factory(10)->create();   
        \App\Models\Notification::factory(10)->create();   
        \App\Models\Amenity::factory(10)->create();   
        \App\Models\ReportUser::factory(10)->create();   
        \App\Models\ReportProperty::factory(10)->create();  
        \App\Models\Wishlist::factory(10)->create();
    }
}
