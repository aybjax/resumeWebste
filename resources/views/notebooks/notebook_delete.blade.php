@extends("layouts.base")
@section("base.style-address")
<link rel="stylesheet" href="{{asset('css/notebook.css')}}">
@endsection("base.style-address")
@section("base.navbar.username", $name ?? '')

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

<div class="container flex-col">
    <div class="flex-row">
        <a class="note-btn hidden">Add note</a>
        <a class="note-btn done-btn" href='{{route("notebooks.index")}}'>Done</a>
    </div>
    <div class="text-list padding-right
        @if(count($notebooks) > 7)
        overflow
        @endif
    ">
        @if(!empty($notebooks))
            @foreach($notebooks as $notebook)
            {!! Form::open( ["method"=>'DELETE', "action" => 'NotebookController@delete' ] ) !!}
                <div class="grid">
                    <div class="button-side">
                        <input type="submit" value="delete"></input>
                        {!! Form::hidden("notebook_id", $notebook->id) !!}
                    </div>
                    <div class="text-item">
                        <div class="text-side">
                            <div class="text-text">
                                {{$notebook->content}}
                            </div>
                            <div class="text-time">
                                {{$notebook->created_at}}
                            </div>
                        </div>
                    </div>
                </div>
            {!! Form::close() !!}
            @endforeach
        @endif
       
    </div>
</div>

@endauth


@endsection("base.content")