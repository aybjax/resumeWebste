@extends("layouts.base")
@section("base.style-address")
<link rel="stylesheet" href="{{asset('css/painter.css')}}">
@endsection("base.style-address")

@section("base.content")
<div class="container" id="painter"></div>
@endsection("base.content")


@section("base.script-address")
<script type='text/javascript' src="{{asset('js/app.js')}}">
@endsection("base.script-address")