@extends("layouts.base")
@section("content")
<!-- 
<div id="container-fluid">

</div>
-->

<div class="container container-bg">

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
                <td>Python3</td>
                <td>Shell/Bash</td>
            </tr>
            <tr>
                <td>Golang</td>
                <td>PHP and laravel</td>
            </tr>
            <tr>
                <td>C</td>
                <td>Java</td>
            </tr>
            <tr>
                <td>JS, JQuery, Reactjs</td>
                <td>HTML, CSS, BS</td>
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
@endsection("content")