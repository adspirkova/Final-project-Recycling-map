<?php

use Illuminate\Http\Request;

Route::post('register','UserController@register');
Route::post('login','UserController@login');
Route::post('profile','UserController@getAuthenticatedUser');
Route::post('change','UserController@changePassword');
Route::post('delete','UserController@deleteUser');

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
