<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReportUser>
 */
class ReportUserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $userId = User::where('role', 'user')->pluck('id')->random();
        $landlordId = User::where('role', 'landlord')->pluck('id')->random();
        return [
            'user_id' => $userId,
            'landlord_id' => $landlordId,
            'content' => $this->faker->sentence(),
        ];
    }
}
