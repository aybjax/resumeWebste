@extends("layouts.base")

@section("base.content")


{!! Form::open( ["method"=>'DELETE', "url" => 'painting/paint/108' ] ) !!}
    {!! Form::number('id', '109') !!}
    {!! Form::submit('Click Me!') !!}
{!! Form::close() !!}


@endsection("base.content")