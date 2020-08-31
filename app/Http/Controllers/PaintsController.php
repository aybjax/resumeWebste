<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Paint;
use App\Http\Controllers\Throwable;

class PaintsController extends Controller
{
    public function index(){
        return view('painting');
    }

    public function put(Request $request){
        if(!Auth::check())
        {
            return response("No access", 403);
        }
        $paint = new Paint;
        $paint->url = $request->imgUrl;
        $paint->user_id = Auth::user()->id;
        return $paint->save();
        return response();
    }

    public function request(Request $request){
        if(!Auth::check())
        {
            return response("No access", 403);
        }

        return Auth::user()->paints->all();
    }

    public function getImg(){
        if(!Auth::check())
        {
            return response("No access", 403);
        }

        return view("result");
    }

    public function deleteImg($id){
        if(!Auth::check())
        {
            return response("No access", 403);
        }

        Auth::user()->paints->find($id)->destroy($id);

        echo Auth::user()->paints;
        
        return;
    }
}
