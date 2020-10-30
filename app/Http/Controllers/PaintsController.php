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
        
        $paint = new Paint;
        $paint->url = $request->imgUrl;
        
        return $paint->save();
    }

    public function request(){

        return Paint::all();
    }

    public function deleteImg(Request $request, $id){

        return Paint::find($id)->destroy($id);
        
    }

    public function patchImg(Request $request){

        return Paint::find($request->id)->update(['url'=>$request->imgUrl]);

    }

}
