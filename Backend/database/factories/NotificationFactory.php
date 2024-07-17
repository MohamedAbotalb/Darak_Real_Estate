<?php

namespace Database\Factories;

use App\Models\Property;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'from_user_id' => $this->faker->randomElement(User::pluck('id')->toArray()),
            'to_user_id' => $this->faker->randomElement(User::pluck('id')->toArray()),
            'property_id'=>Property::pluck('id')->random(),
            'message' => $this->faker->sentence(),
            'type' => $this->faker->randomElement(['request','confirmation','cancelation','property_request','status_change']),
            'date' => $this->faker->dateTime(),
        ];
    }
}
