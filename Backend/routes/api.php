<?php

use App\Http\Controllers\api\Auth\AuthController;
use App\Http\Controllers\api\Auth\ForgotPasswordController;
use App\Http\Controllers\api\Auth\ResetPasswordController;
use App\Http\Controllers\api\NotificationController;
use App\Http\Controllers\api\PropertyController;
use App\Http\Controllers\api\ReportUserController;
use App\Http\Controllers\api\UserController;
use App\Http\Controllers\api\ReportPropertyController;
use App\Http\Controllers\api\WishlistController;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\DashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PropertyTypeController;
use App\Http\Controllers\Api\AmenityController;
use App\Http\Controllers\api\ReviewController;
use App\Http\Controllers\api\TourController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Registration routes
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// Forget password routes
Route::post('forget-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('reset-password', [ResetPasswordController::class, 'reset']);

Route::group([
    'middleware'=> ['auth:sanctum', 'checkTokenExpiry']
], function () {
    Route::get('profile', [AuthController::class, 'profile']);
    Route::get('logout', [AuthController::class, 'logout']);
});

Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::delete('/{id}', [UserController::class, 'delete']);
});
Route::prefix('report-users')->group(function(){
    Route::get('/',[ReportUserController::class,'index']);
    Route::delete('deleteReport/{id}',[ReportUserController::class,'deleteReport']);
    Route::delete('deleteLandlord/{id}',[ReportUserController::class,'deleteUser']);
    Route::post('/', [ReportUserController::class, 'store']);
});

Route::prefix('report-properties')->group(function(){
    Route::get('/',[ReportPropertyController::class,'index']);
    Route::delete('deleteReport/{id}',[ReportPropertyController::class,'deleteReport']);
    Route::delete('deleteProperty/{id}',[ReportPropertyController::class,'deleteProperty']);
    Route::post('/', [ReportPropertyController::class, 'store']);
});

Route::apiResource('property-types', PropertyTypeController::class);

Route::prefix('properties')->group(function(){
    Route::get('/',[PropertyController::class,'index']);
    Route::get('/{id}',[PropertyController::class,'show']);
    Route::get('latest-rent/{typeId}',[PropertyController::class,'showLatestRent']);
    Route::get('latest-sell/{typeId}',[PropertyController::class,'showLatestSell']);
    Route::post('/',[PropertyController::class,'store']);
    Route::get('/search/filter',[PropertyController::class,'search']);
});
Route::prefix('notifications')->middleware(['auth:sanctum', 'checkTokenExpiry'])->group(function(){
    Route::get('/landlord',[NotificationController::class,'showLandlordNotifications']);
    Route::get('/renter',[NotificationController::class,'showRenterNotifications']);
    Route::put('/{id}/type',[NotificationController::class,'updateType']);
});
Route::prefix('wishlist')->middleware(['auth:sanctum', 'checkTokenExpiry'])->group(function(){
    Route::get('',[WishlistController::class,'show']);
    Route::post('',[WishlistController::class,'store']);
    Route::delete('/{id}',[WishlistController::class,'delete']);
});

// Overview Admin Page ROUTE
Route::prefix('dashboard')->group(function () {
    Route::get('/home', [DashboardController::class, 'overview']);
});

// Amenity Admin Page ROUTE
Route::prefix('amenities')->group(function () {
    Route::get('/', [AmenityController::class, 'index']);
    Route::post('/', [AmenityController::class, 'store']);
    Route::get('/{slug}', [AmenityController::class, 'show']);
    Route::put('/{slug}', [AmenityController::class, 'update']);
    Route::delete('/{slug}', [AmenityController::class, 'destroy']);
});

Route::get('reviews', [ReviewController::class, 'show']);

Route::prefix('tour')->middleware(['auth:sanctum', 'checkTokenExpiry'])->group(function () {
    Route::post('/', [TourController::class, 'send_request']);
});
// Admin Dashboard Routes
Route::group([
    'middleware'=> ['auth:sanctum', 'checkTokenExpiry', 'admin']
], function () {
    Route::prefix('admin')->group(function () {

    });

});