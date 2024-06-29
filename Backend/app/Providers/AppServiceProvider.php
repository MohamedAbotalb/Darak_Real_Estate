<?php

namespace App\Providers;

use App\Repositories\AmenityRepository;
use App\Repositories\AmenityRepositoryInterface;
use App\Repositories\NotificationRepository;
use App\Repositories\NotificationRepositoryInterface;
use App\Repositories\PropertyRepository;
use App\Repositories\PropertyRepositoryInterface;
use App\Repositories\PropertyTypeRepository;
use App\Repositories\PropertyTypeRepositoryInterface;
use App\Repositories\ReportPropertyRepository;
use App\Repositories\ReportPropertyRepositoryInterface;
use App\Repositories\ReportUserRepository;
use App\Repositories\ReportUserRepositoryInterface;
use App\Repositories\TourRepository;
use App\Repositories\TourRepositoryInterface;
use App\Repositories\UserRepository;
use App\Repositories\UserRepositoryInterface;
use App\Repositories\WishlistRepository;
use App\Repositories\WishlistRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(WishlistRepositoryInterface::class, WishlistRepository::class);
        $this->app->bind(PropertyRepositoryInterface::class, PropertyRepository::class);
        $this->app->bind(NotificationRepositoryInterface::class, NotificationRepository::class);
        $this->app->bind(TourRepositoryInterface::class, TourRepository::class);
        $this->app->bind(ReportPropertyRepositoryInterface::class, ReportPropertyRepository::class);
        $this->app->bind(ReportUserRepositoryInterface::class, ReportUserRepository::class);
        $this->app->bind(AmenityRepositoryInterface::class, AmenityRepository::class);
        $this->app->bind(PropertyTypeRepositoryInterface::class, PropertyTypeRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
