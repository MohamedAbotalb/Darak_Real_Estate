<?php

namespace App\Providers;

use App\Models\Property;
use App\Models\PropertyUpdate;
use App\Models\Tour;
use App\Observers\PropertyObserver;
use App\Observers\PropertyUpdateObserver;
use App\Observers\TourObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Property::observe(PropertyObserver::class);
        Tour::observe(TourObserver::class);
        PropertyUpdate::observe(PropertyUpdateObserver::class);

    }
}
