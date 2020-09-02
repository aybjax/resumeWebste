@extends("layouts.base")
@section("base.style-address")
<link rel="stylesheet" href="{{asset('css/painting.css')}}">
@endsection("base.style-address")

@section("base.content")
<div id="painting"></div>

<div class="margin">
    Your add could have been here
</div>

@endsection("base.content")


@section("base.script-address")
<script src="{{asset('js/painting.js')}}"></script>
@endsection("base.script-address")