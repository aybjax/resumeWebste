@extends("layouts.base")
@section("base.style-address")
<link rel="stylesheet" href="{{asset('css/notebook.css')}}">
@endsection("base.style-address")
@section("base.navbar.username", $name)

@section("base.content")

@guest

<div class="my-jumbotron">
    <h1>Online Notes App</h1>

    <p>Your notes with you wherever you go</p>

    <p>Easy to use, protect your notes</p>

    <h3><a class="sign-in-button" href="{{route('login')}}">Sign in to use the notebook right now</a></h3>
</div>

@endguest

@auth

{!! Form::open( ["method"=>'POST', "action" => 'NotebookController@put'] ) !!}
<div class="container flex-col">
    <div class="flex-row">
        <a class="note-btn">{!! Form::submit('Save') !!}</a>
        <a class="note-btn" href="{{route('notebooks.index')}}">Cancel</a>
    </div>
    
    {!! Form::hidden("notebook_id", $notebook_id ?? "-1") !!}
    {!! Form::textarea('content', $content ?? "") !!}
    
</div>
{!! Form::close() !!}

@endauth


@endsection("base.content")