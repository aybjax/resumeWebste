<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\Notebook;

class NotebookController extends Controller
{
    public function index(Request $request)
    {
        if(!Auth::check())
        {
            $name = "Guest";
            session()->put(['name' => 'Guest']);
            return view("notebooks.notebook", compact("name"));
        }

        $notebooks = Auth::user()->notebooks;
        
        return view("notebooks.notebook", compact("notebooks"));
    }

    public function create()
    {
        if(Auth::check())
        {
            $name = Auth::user()->name;
        }else
        {
            $name = "Guest";
        }
        return view("notebooks.notebook_create", compact("name"));
    }

    public function editPage($notebook_id)
    {
        $notebook_id = intval($notebook_id);
        if(Auth::check())
        {
            $name = Auth::user()->name;
            $content = Auth::user()->notebooks()->findOrFail($notebook_id)->content;
        }else
        {
            $name = "Guest";
            $content = "";
        }

        return view("notebooks.notebook_create", compact("name", "notebook_id", "content"));
    }

    public function edit()
    {
        if(!Auth::check())
        {
            $name = "Guest";
            session()->put(['name' => 'Guest']);
            return view("notebooks.notebook", compact("name"));
        }

        $notebooks = Auth::user()->notebooks;
        if(count($notebooks) === 0) return redirect()->route("notebooks.index");
        return view("notebooks.notebook_delete", compact("notebooks"));
    }


    /*********** create a note **********/

    public function put(Request $request)
    {
        if(!$request->content)
        {
            return redirect(route("notebooks.index"));
        }
        if($request->notebook_id != "-1")
        {
            $notebook = Auth::user()->notebooks()->findOrFail(intval($request->notebook_id));
            $notebook->content = $request->content;
            $notebook->save();
            return redirect(route("notebooks.index"));
        }
        $notebook = new Notebook;
        $notebook->content = $request->content;
        $notebook->user_id = Auth::user()->id;
        $notebook->save();
        return redirect(route("notebooks.index"));
    }

    public function delete(Request $request)
    {
        $notebook = Auth::user()->notebooks()->findOrFail(intval($request->notebook_id));
        $notebook->delete();
        return redirect()->back();
    }
}
