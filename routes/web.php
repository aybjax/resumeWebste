<?php

use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

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
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');


Route::get("", function(){
    return redirect(route("aboutme"));
});

//RESUME PAGE
Route::get('about', array('as'=>'aboutme', function () {
    return view('about-resume');
}));

//NOTEBOOKS LARAVEL
Route::get("notebooks", "NotebookController@index")->name("notebooks.index");
Route::get("notebooks/create","NotebookController@create")->name("notebooks.create")->middleware('kickGuest');
Route::get("notebooks/edit","NotebookController@edit")->name("notebooks.edit")->middleware('kickGuest');
Route::get("notebooks/edit/{note_id}","NotebookController@editPage")->name("notebooks.editPage")->middleware('kickGuest');
Route::post("notebooks/put","NotebookController@put")->name('notebooks.put')->middleware('kickGuest');
Route::delete("notebooks/delete","NotebookController@delete")->name('notebooks.delete')->middleware('kickGuest');


//PAINTING REACTJS
Route::get("painting", 'PaintsController@index')->name("painting");

//PAINTING Routes
Route::post("painting/save", "PaintsController@put");
Route::get("painting/allPaint", "PaintsController@request");
Route::get("painting/paint", "PaintsController@getImg");
Route::delete("painting/delete/{id}", "PaintsController@deleteImg");
Route::patch("painting/patch/{id}", "PaintsController@patchImg");

Route::get('redirect/{url}', function($url){
    return redirect('http://aybat.host20.uk/webSites/'.$url);
});

Route::get('visit/heroku', function(){
    return redirect('https://file-explorer-aybjax.herokuapp.com/');
});

Route::get('visit/qwant', function(){
    return redirect('https://github.com/aybjax/qwant_kz');
});

Route::get('visit/github', function(){
    return redirect('https://github.com/aybjax/');
});



Route::fallback(function(){
    return redirect()->route('aboutme');
});