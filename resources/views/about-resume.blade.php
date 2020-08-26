@extends("layouts.base")

@section("base.style-address")
    <link rel="stylesheet" href="{{asset('css/about-resume.css')}}">
@endsection("base.style-address")

@section("base.content")
<!-- 
<div id="container-fluid">

</div>
-->


<div class="container container-tmp">

    <!-- top text on -->
    <div class="flex-sides">
        <div class="title-upper">
            <h3> aibat zhakeyev </h3>
            <p>programming enthusiast</p>
        </div>
        <div class="flex-group">
            <i class="ion-social-github"></i>
            <i class="ion-ios-email"></i>
            <i class="ion-social-linkedin"></i>
        </div>
    </div>
</div>

<div class="container sticky-top container-bg">
    <div class="grid-sides">
        <div class="img-container">
            <img src="media/Aibat_Zhakeyev.jpg" />
        </div>
        <table class="grid-table">
            <tr>
                <td colspan="2" class="h3">Programming Skills</td>
            </tr>
            <tr>
                <td>Python3
                    <div class="empty-bar">
                        <div class="progress" id="70"></div>
                    </div>
                </td>
                <td>Shell/Bash
                    <div class="empty-bar">
                        <div class="progress" id="70"></div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>Golang
                    <div class="empty-bar">
                        <div class="progress" id="70"></div>
                    </div>
                </td>
                <td>PHP and laravel
                    <div class="empty-bar">
                        <div class="progress" id="70"></div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>C
                    <div class="empty-bar">
                        <div class="progress" id="70"></div>
                    </div>
                </td>
                <td>Java
                    <div class="empty-bar">
                        <div class="progress" id="70"></div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>JS, JQuery, Reactjs
                    <div class="empty-bar">
                        <div class="progress" id="70"></div>
                    </div>
                </td>
                <td>HTML, CSS, BS
                    <div class="empty-bar">
                        <div class="progress" id="70"></div>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</div>

<div class="margin">

</div>

<div class="container">

    <div class="flex-wrapper">

        <div class="content-wrapper">
            <div class="content">
                Left content <br/>
                Left content <br/>
                Left content <br/>
            </div>
        </div>
        <div class="content-wrapper">
            <div class="content">
                Right content <br/>
                Right content <br/>
                Right content <br/>
            </div>
        </div>
        <div class="content-wrapper">
            <div class="content">
                Left content <br/>
                Left content <br/>
                Left content <br/>
            </div>
        </div>
        <div class="content-wrapper">
            <div class="content">
                Right content <br/>
                Right content <br/>
                Right content <br/>
            </div>
        </div>
    </div>

</div>


<div class="container">
    <iframe src="https://www.w3schools.com" title="W3Schools Free Online Web Tutorials" class="frame-window"></iframe> 
</div>


@endsection("base.content")