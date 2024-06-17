<?php

namespace Database\Factories;

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
            'user_id' => $this->faker->randomElement(User::where('role', 'user')->pluck('id')->toArray()),
            'landlord_id' => $this->faker->randomElement(User::where('role', 'landlord')->pluck('id')->toArray()),
            'message' => $this->faker->sentence(),
            'type' => $this->faker->randomElement(['request', 'confirmation', 'cancelation']),
            'date' => $this->faker->dateTime(),
        ];
    }
}
