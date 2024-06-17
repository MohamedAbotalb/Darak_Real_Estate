<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $roles = ['user', 'landlord'];

        for ($i = 0; $i < 10; $i++) {
            // Egyptian phone number
            $phonePrefix = $faker->randomElement(['0', '1', '2', '5']); 
            $phoneNumber = '+201' . $phonePrefix . $faker->numberBetween(10000000, 99999999);

            DB::table('users')->insert([
                'first_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'email' => $faker->unique()->safeEmail,
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'avatar' => $faker->imageUrl(200, 200, 'people'),
                'phone_number' => $phoneNumber,
                'role' => $roles[array_rand($roles)],
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

