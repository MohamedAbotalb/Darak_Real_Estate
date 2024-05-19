<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug');
            $table->string('description');
            $table->integer('num_of_rooms');
            $table->integer('num_of_bathrooms');
            $table->float('area');
            $table->integer('price');
            $table->bigInteger('location_id');
            $table->bigInteger('property_type_id');
            $table->bigInteger('user_id');
            $table->enum('availability', ["available", "unavailable"]);
            $table->enum("listing_type", ["renting","selling"]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
