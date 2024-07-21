<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
class PropertyImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $images = [
            ['property_id' => 1, 'image' => '1.png'],
            ['property_id' => 1, 'image' => '2.png'],
            ['property_id' => 1, 'image' => '3.png'],

            ['property_id' => 2, 'image' => '4.png'],
            ['property_id' => 2, 'image' => '5.png'],
            ['property_id' => 2, 'image' => '6.png'],
            
            ['property_id' => 3, 'image' => '7.png'],
            ['property_id' => 3, 'image' => '8.png'],
            ['property_id' => 3, 'image' => '9.png'],

            ['property_id' => 4, 'image' => '10.png'],
            ['property_id' => 4, 'image' => '11.png'],
            ['property_id' => 4, 'image' => '12.png'],

            ['property_id' => 5, 'image' => '13.png'],
            ['property_id' => 5, 'image' => '14.png'],
            ['property_id' => 5, 'image' => '15.png'],

            ['property_id' => 6, 'image' => '16.png'],
            ['property_id' => 6, 'image' => '17.png'],
            ['property_id' => 6, 'image' => '18.png'],

            ['property_id' => 7, 'image' => '19.png'],
            ['property_id' => 7, 'image' => '20.png'],
            ['property_id' => 7, 'image' => '21.png'],

            ['property_id' => 8, 'image' => '22.png'],
            ['property_id' => 8, 'image' => '23.png'],
            ['property_id' => 8, 'image' => '24.png'],

            ['property_id' => 9, 'image' => '25.png'],
            ['property_id' => 9, 'image' => '26.png'],
            ['property_id' => 9, 'image' => '27.png'],

            ['property_id' => 10, 'image' => '28.png'],
            ['property_id' => 10, 'image' => '29.png'],
            ['property_id' => 10, 'image' => '30.png'],

            ['property_id' => 11, 'image' => '31.png'],
            ['property_id' => 11, 'image' => '32.png'],
            ['property_id' => 11, 'image' => '33.png'],

            ['property_id' => 12, 'image' => '34.png'],
            ['property_id' => 12, 'image' => '35.png'],
            ['property_id' => 12, 'image' => '36.png'],

            ['property_id' => 13, 'image' => '37.png'],
            ['property_id' => 13, 'image' => '38.png'],
            ['property_id' => 13, 'image' => '39.png'],

            ['property_id' => 14, 'image' => '40.png'],
            ['property_id' => 14, 'image' => '41.png'],
            ['property_id' => 14, 'image' => '42.png'],

            ['property_id' => 15, 'image' => '43.png'],
            ['property_id' => 15, 'image' => '44.png'],
            ['property_id' => 15, 'image' => '45.png'],

            ['property_id' => 16, 'image' => '46.png'],
            ['property_id' => 16, 'image' => '47.png'],
            ['property_id' => 16, 'image' => '48.png'],

            ['property_id' => 17, 'image' => '49.png'],
            ['property_id' => 17, 'image' => '50.png'],
            ['property_id' => 17, 'image' => '51.png'],

            ['property_id' => 18, 'image' => '52.png'],
            ['property_id' => 18, 'image' => '53.png'],
            ['property_id' => 18, 'image' => '54.png'],

            ['property_id' => 19, 'image' => '55.png'],
            ['property_id' => 19, 'image' => '56.png'],
            ['property_id' => 19, 'image' => '57.png'],

            ['property_id' => 20, 'image' => '58.png'],
            ['property_id' => 20, 'image' => '59.png'],
            ['property_id' => 20, 'image' => '60.png'],

            ['property_id' => 21, 'image' => '61.png'],
            ['property_id' => 21, 'image' => '62.png'],
            ['property_id' => 21, 'image' => '63.png'],

            ['property_id' => 22, 'image' => '64.png'],
            ['property_id' => 22, 'image' => '65.png'],
            ['property_id' => 22, 'image' => '66.png'],

            ['property_id' => 23, 'image' => '67.png'],
            ['property_id' => 23, 'image' => '68.png'],
            ['property_id' => 23, 'image' => '69.png'],

            ['property_id' => 24, 'image' => '70.png'],
            ['property_id' => 24, 'image' => '71.png'],
            ['property_id' => 24, 'image' => '72.png'],

            ['property_id' => 25, 'image' => '73.png'],
            ['property_id' => 25, 'image' => '74.png'],
            ['property_id' => 25, 'image' => '75.png'],

            ['property_id' => 26, 'image' => '76.png'],
            ['property_id' => 26, 'image' => '77.png'],
            ['property_id' => 26, 'image' => '78.png'],
        ];
        DB::table('property_images')->insert($images);   
    }
}
