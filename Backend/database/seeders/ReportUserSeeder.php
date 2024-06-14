<?php

namespace Database\Seeders;

use App\Models\ReportUser;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReportUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ReportUser::factory()->count(10)->create();
    }
}
