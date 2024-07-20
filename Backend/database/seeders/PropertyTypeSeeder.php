<?php

namespace Database\Seeders;
use App\Models\PropertyType;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;
class PropertyTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        {
            $property_types = [
                ['name' => 'Apartment'],
                ['name' => 'Villa'],
                ['name' => 'House'],
                ['name' => 'Duplix'],
                ['name' => 'Townhome'],
                ['name' => 'Chalet'],
            ];
    
            foreach ($property_types as &$prop) {
                $prop['slug'] = Str::slug($prop['name']);
                $prop['created_at'] = Carbon::now();
                $prop['updated_at'] = Carbon::now();
            }
    
            DB::table('property_types')->insert($property_types);
        }
    }
}
