<?php

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
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');


Route::view('/map/{path?}', 'map/map');
Route::view('/userpage', 'map/map');
Route::view('/addbin', 'map/map');

Route::view('/contact', 'map/map');


Route::any('/addbin/create', 'BinController@create');

Route::any('/contact/create', 'ContactController@create');


Route::any('/locations/{lat}/{lng}/{currZoom}', 'LocationController@getLocations');

Route::any('/bins/{id}', 'BinController@getBins');


Route::any('/locations', 'LocationController@index');

Route::any('/cities', 'LocationController@getCities');

Route::any('/stations/{city}', 'LocationController@getStation');
