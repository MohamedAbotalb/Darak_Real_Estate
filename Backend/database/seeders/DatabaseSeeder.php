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
        // $this->call(UserSeeder::class);
        $this->call(PropertyTypeSeeder::class);  
        $this->call(AmenitiesSeeder::class);
        // \App\Models\Location::factory(20)->create(); 
        // \App\Models\Property::factory(100)->create();   
        // \App\Models\PropertyImage::factory(100)->create();   
        // \App\Models\Notification::factory(20)->create();    
        // \App\Models\ReportUser::factory(20)->create();   
        // \App\Models\ReportProperty::factory(20)->create();  
        // \App\Models\Wishlist::factory(20)->create();
        // \App\Models\Tour::factory(20)->create();
        // \App\Models\TourDate::factory(20)->create();
        // \App\Models\Review::factory(30)->create();
    }
}
