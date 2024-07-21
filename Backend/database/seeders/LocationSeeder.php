<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locations = [
            ['city' => 'Cairo', 'state' => 'Cairo', 'street' => 'Tahrir Square'],
            ['city' => 'Alexandria', 'state' => 'Alexandria', 'street' => 'Corniche Road'],
            ['city' => 'Mansoura', 'state' => 'Daqahlia', 'street' => 'Mohamed Farid Street'],
            ['city' => 'Mansoura', 'state' => 'Daqahlia', 'street' => 'El-Mashaia'],
            ['city' => 'Giza', 'state' => 'Giza', 'street' => 'Pyramids Road'],
            ['city' => 'Cairo', 'state' => 'Cairo', 'street' => 'Zamalek'],
            ['city' => 'Cairo', 'state' => 'Cairo', 'street' => 'Heliopolis'],
            ['city' => 'Aswan', 'state' => 'Aswan', 'street' => 'Nile Corniche'],
            ['city' => 'Luxor', 'state' => 'Luxor', 'street' => 'Karnak Avenue'],
            ['city' => 'Port Said', 'state' => 'Port Said', 'street' => 'El-Gaish Street'],
            ['city' => 'Suez', 'state' => 'Suez', 'street' => 'Mohamed Ali Street'],
            ['city' => 'Sharm El Sheikh', 'state' => 'South Sinai', 'street' => 'Naama Bay Road'],
            ['city' => 'Hurghada', 'state' => 'Red Sea', 'street' => 'Sheraton Road'],
            ['city' => 'Mansoura', 'state' => 'Daqahlia', 'street' => 'El-Gomhoria Street'],
            ['city' => 'Mahalla', 'state' => 'Gharbia', 'street' => 'Tanta Road'],
            ['city' => 'Cairo', 'state' => 'Cairo', 'street' => 'Nasr City'],
            ['city' => 'Alexandria', 'state' => 'Alexandria', 'street' => 'Raml Station'],
            ['city' => 'Alexandria', 'state' => 'Alexandria', 'street' => 'Stanley'],
            ['city' => 'Cairo', 'state' => 'Cairo', 'street' => 'Mohandessin'],
            ['city' => 'Beni Suef', 'state' => 'Beni Suef', 'street' => 'El-Mahdi Street'],
            ['city' => 'Minya', 'state' => 'Minya', 'street' => 'Abu Qirqas Street'],
            ['city' => 'Assiut', 'state' => 'Assiut', 'street' => 'El-Galaa Street'],
            ['city' => 'Damanhur', 'state' => 'Beheira', 'street' => 'El-Shams Street'],
            ['city' => 'Mansoura', 'state' => 'Daqahlia', 'street' => 'El-Gomhoria Street'],
            ['city' => 'Mansoura', 'state' => 'Daqahlia', 'street' => 'Suez Canal Street'],
            ['city' => 'Kafr El Sheikh', 'state' => 'Kafr El Sheikh', 'street' => 'El-Khanka Street'],
            ['city' => 'El-Fayoum', 'state' => 'Fayoum', 'street' => 'El-Montazah Street'],
            ['city' => '6th of October City', 'state' => 'Giza', 'street' => 'El-Mostakbal Street'],
            ['city' => 'New Cairo', 'state' => 'Cairo', 'street' => 'Suez Road'],
            ['city' => 'Mansoura', 'state' => 'Daqahlia', 'street' => 'Tanta Road'],
            ['city' => 'Alexandria', 'state' => 'Alexandria', 'street' => 'Montazah'],
            ['city' => 'Alexandria', 'state' => 'Alexandria', 'street' => 'Sidi Bishr'],
            ['city' => 'Zagazig', 'state' => 'Sharqia', 'street' => 'El-Sayeda Zeinab Street'],
        ];

        foreach ($locations as &$location) {
            $location['created_at'] = Carbon::now();
            $location['updated_at'] = Carbon::now();
        }

        DB::table('locations')->insert($locations);
    }
}
