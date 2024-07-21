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
            ['property_id' => 1, 'image' => 'images/properties/1.png'],
            ['property_id' => 1, 'image' => 'images/properties/2.png'],
            ['property_id' => 1, 'image' => 'images/properties/3.png'],

            ['property_id' => 2, 'image' => 'images/properties/4.png'],
            ['property_id' => 2, 'image' => 'images/properties/5.png'],
            ['property_id' => 2, 'image' => 'images/properties/6.png'],
            
            ['property_id' => 3, 'image' => 'images/properties/7.png'],
            ['property_id' => 3, 'image' => 'images/properties/8.png'],
            ['property_id' => 3, 'image' => 'images/properties/9.png'],

            ['property_id' => 4, 'image' => 'images/properties/10.png'],
            ['property_id' => 4, 'image' => 'images/properties/11.png'],
            ['property_id' => 4, 'image' => 'images/properties/12.png'],

            ['property_id' => 5, 'image' => 'images/properties/13.png'],
            ['property_id' => 5, 'image' => 'images/properties/14.png'],
            ['property_id' => 5, 'image' => 'images/properties/15.png'],

            ['property_id' => 6, 'image' => 'images/properties/16.png'],
            ['property_id' => 6, 'image' => 'images/properties/17.png'],
            ['property_id' => 6, 'image' => 'images/properties/18.png'],

            ['property_id' => 7, 'image' => 'images/properties/19.png'],
            ['property_id' => 7, 'image' => 'images/properties/20.png'],
            ['property_id' => 7, 'image' => 'images/properties/21.png'],

            ['property_id' => 8, 'image' => 'images/properties/22.png'],
            ['property_id' => 8, 'image' => 'images/properties/23.png'],
            ['property_id' => 8, 'image' => 'images/properties/24.png'],

            ['property_id' => 9, 'image' => 'images/properties/25.png'],
            ['property_id' => 9, 'image' => 'images/properties/26.png'],
            ['property_id' => 9, 'image' => 'images/properties/27.png'],

            ['property_id' => 10, 'image' => 'images/properties/28.png'],
            ['property_id' => 10, 'image' => 'images/properties/29.png'],
            ['property_id' => 10, 'image' => 'images/properties/30.png'],

            ['property_id' => 11, 'image' => 'images/properties/31.png'],
            ['property_id' => 11, 'image' => 'images/properties/32.png'],
            ['property_id' => 11, 'image' => 'images/properties/33.png'],

            ['property_id' => 12, 'image' => 'images/properties/34.png'],
            ['property_id' => 12, 'image' => 'images/properties/35.png'],
            ['property_id' => 12, 'image' => 'images/properties/36.png'],

            ['property_id' => 13, 'image' => 'images/properties/37.png'],
            ['property_id' => 13, 'image' => 'images/properties/38.png'],
            ['property_id' => 13, 'image' => 'images/properties/39.png'],

            ['property_id' => 14, 'image' => 'images/properties/40.png'],
            ['property_id' => 14, 'image' => 'images/properties/41.png'],
            ['property_id' => 14, 'image' => 'images/properties/42.png'],

            ['property_id' => 15, 'image' => 'images/properties/43.png'],
            ['property_id' => 15, 'image' => 'images/properties/44.png'],
            ['property_id' => 15, 'image' => 'images/properties/45.png'],

            ['property_id' => 16, 'image' => 'images/properties/46.png'],
            ['property_id' => 16, 'image' => 'images/properties/47.png'],
            ['property_id' => 16, 'image' => 'images/properties/48.png'],

            ['property_id' => 17, 'image' => 'images/properties/49.png'],
            ['property_id' => 17, 'image' => 'images/properties/50.png'],
            ['property_id' => 17, 'image' => 'images/properties/51.png'],

            ['property_id' => 18, 'image' => 'images/properties/52.png'],
            ['property_id' => 18, 'image' => 'images/properties/53.png'],
            ['property_id' => 18, 'image' => 'images/properties/54.png'],

            ['property_id' => 19, 'image' => 'images/properties/55.png'],
            ['property_id' => 19, 'image' => 'images/properties/56.png'],
            ['property_id' => 19, 'image' => 'images/properties/57.png'],

            ['property_id' => 20, 'image' => 'images/properties/58.png'],
            ['property_id' => 20, 'image' => 'images/properties/59.png'],
            ['property_id' => 20, 'image' => 'images/properties/60.png'],

            ['property_id' => 21, 'image' => 'images/properties/61.png'],
            ['property_id' => 21, 'image' => 'images/properties/62.png'],
            ['property_id' => 21, 'image' => 'images/properties/63.png'],

            ['property_id' => 22, 'image' => 'images/properties/64.png'],
            ['property_id' => 22, 'image' => 'images/properties/65.png'],
            ['property_id' => 22, 'image' => 'images/properties/66.png'],

            ['property_id' => 23, 'image' => 'images/properties/67.png'],
            ['property_id' => 23, 'image' => 'images/properties/68.png'],
            ['property_id' => 23, 'image' => 'images/properties/69.png'],

            ['property_id' => 24, 'image' => 'images/properties/70.png'],
            ['property_id' => 24, 'image' => 'images/properties/71.png'],
            ['property_id' => 24, 'image' => 'images/properties/72.png'],

            ['property_id' => 25, 'image' => 'images/properties/73.png'],
            ['property_id' => 25, 'image' => 'images/properties/74.png'],
            ['property_id' => 25, 'image' => 'images/properties/75.png'],

            ['property_id' => 26, 'image' => 'images/properties/76.png'],
            ['property_id' => 26, 'image' => 'images/properties/77.png'],
            ['property_id' => 26, 'image' => 'images/properties/78.png'],
        ];
        DB::table('property_images')->insert($images);   
    }
}
