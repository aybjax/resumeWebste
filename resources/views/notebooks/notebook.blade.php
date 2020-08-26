@extends("layouts.base")
@section("base.style-address")
<link rel="stylesheet" href="{{asset('css/notebook.css')}}">
@endsection("base.style-address")

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

{!! Form::open( ["method"=>'PUT' ] ) !!}
<div class="container flex-col">
    <div class="flex-row">
        <a class="note-btn" href="{{route('notebooks.create')}}">Add note</a>
        <a class="note-btn 
            @if(count($notebooks) === 0)
                hidden
            @endif
        " href="{{route('notebooks.edit')}}">Edit</a>
    </div>
    <div class="text-list
        @if(count($notebooks) > 7)
        overflow
        @endif
    ">
        @if( count($notebooks) > 0 )
            @foreach($notebooks as $notebook)
            <a href="{{route('notebooks.editPage', ['note_id' => $notebook->id])}}">
                <div class="text-item">
                    <div class="text-text">
                        {{$notebook->content}}
                    </div>
                    <div class="text-time">
                        {{$notebook->created_at}}
                    </div>
                </div>
            </a>
            @endforeach
        @else
                <div class="no-notes">
                        You have no notes
                </div>
        @endif

    </div>
</div>
{!! Form::close() !!}

@endauth


@endsection("base.content")