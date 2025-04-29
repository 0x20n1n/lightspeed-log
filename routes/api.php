<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

Route::post('/v1/test-call', [ApiController::class, 'testCall']);

Route::get('/v1/debug-check', fn () => response()->json(['ok' => true]));