<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ucfirst(strtok(Route::currentRouteName(), "."))}}</title>

        <style>
            html, body {
                min-height: 100%;
                padding: 0;
                margin: 0;
            }

            .page-container {
                position: relative;
                min-height: 100vh;
            }

            .footer {
                position: absolute;
                background-color: rgb(8, 75, 104);
                color: white;
                padding: 10px;
                text-align: center;
                bottom:0;
                right:0;
                left:0;
            }
        </style>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        @yield("base.style-address")
        <link rel="stylesheet" href="{{asset('css/navbar.css')}}" >
        <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">

        <!-- Styles -->
    </head>
    <body>
<div class="page-container">
    <ul class="navbar-list">
        <li>
            @if( strtok(Route::currentRouteName(), ".") === "notebooks" )
            <a class="active-navbar left-edge navbar-a">
            @else
            <a href="{{route('notebooks.index')}}" class="left-edge navbar-a">
            @endif
                Online Notebook
            </a>
        </li>

        <li>
            @if( strtok(Route::currentRouteName(), ".") === "painting" )
            <a class="active-navbar left-edge navbar-a">
            @else
            <a href="{{route('painting')}}" class="left-edge navbar-a">
            @endif
                React Painter
            </a>
        </li>

        <li>
            @if( Route::currentRouteName() === "aboutme" )
            <a class="active-navbar right-edge navbar-a">
            @else
            <a href="{{route('aboutme')}}" class="right-edge navbar-a">
            @endif
                About
            </a>
        </li>
        <li class="right-float-navbar">
            <a class="navbar-a">
                @if (Auth::user())
                    Logged in as <span class="emphasis">{{ Auth::user()->name }}</span>
                @endif
            </a>
        </li>
        <li>
                @if (!Auth::user())
                    <a href="{{route('login')}}" class="right-edge left-edge navbar-a">
                        login
                    </a>
                @else
                    <a class="right-edge left-edge navbar-a" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                        logout
                    </a>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                        @csrf
                    </form>
                @endif
        </li>
    </ul>
        
    @yield("base.content")

    <div class="footer">
        &copy; Develop with aybjax
    </div>
</div>
    </body>
    @yield("base.script-address")
</html>
