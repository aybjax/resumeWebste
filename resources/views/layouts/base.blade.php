<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <style>
            .footer {
                background-color: rgb(8, 75, 104);
                color: white;
                padding: 10px;
                margin-bottom: 0;
                margin-top: auto;
                text-align: center;
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
    <ul class="navbar-list">
        <li>
            @if( strtok(Route::currentRouteName(), ".") === "notebooks" )
            <a class="active-navbar left-edge">
            @else
            <a href="{{route('notebooks.index')}}" class="left-edge">
            @endif
                Online Notebook
            </a>
        </li>

        <li>
            @if( strtok(Route::currentRouteName(), ".") === "painting" )
            <a class="active-navbar left-edge">
            @else
            <a href="{{route('painting')}}" class="left-edge">
            @endif
                React Painter
            </a>
        </li>

        <li>
            @if( Route::currentRouteName() === "aboutme" )
            <a class="active-navbar right-edge">
            @else
            <a href="{{route('aboutme')}}" class="right-edge">
            @endif
                About
            </a>
        </li>
        <li class="right-float-navbar">
            <a>
                @if (Auth::user())
                    Logged in as <span class="emphasis">{{ Auth::user()->name }}</span>
                @endif
            </a>
        </li>
        <li>
                @if (!Auth::user())
                    <a href="{{route('login')}}" class="right-edge left-edge">
                        login
                    </a>
                @else
                    <a class="right-edge left-edge" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
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
    </body>
    @yield("base.script-address")
</html>
