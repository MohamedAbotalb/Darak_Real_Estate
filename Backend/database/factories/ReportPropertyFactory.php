<?php

namespace Database\Factories;

use App\Models\Property;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReportProperty>
 */
class ReportPropertyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'user_id' => User::where('role', 'user')->pluck('id')->random(),
            'property_id' =>Property::pluck('id')->random(),
            'content' => $this->faker->paragraph,
            'created_at' =>$this->faker->dateTimeBetween('-1 year', 'now'),
            'updated_at' =>$this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
