<?php

use App\Events\MessageSent;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\TestController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::controller(ChatController::class)->middleware('auth')->group(function () {
    Route::get('chats', 'index')->name('chats');
    Route::get('chats/{user:username}', 'show')->name('chats.show');
    Route::post('chats/{user:username}', 'send')->name('chats.send');
    Route::post('chats/{user:username}/new', 'new')->name('chats.new');
});
Route::controller(GroupController::class)->middleware('auth')->group(function () {
    Route::get('group/{group:slug}', 'show')->name('groups.show');
    Route::post('group/{group:slug}', 'send')->name('groups.send');
    // Route::post('chats/{user:username}/new', 'new')->name('chats.new');
});

Route::get('/whatsapp', function() {
    return Inertia::render('Whatsapp');
});

Route::get('test', TestController::class);

require __DIR__.'/auth.php';
