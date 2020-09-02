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
            <a target="_blank" href="https://github.com/aybjax"><i class="ion-social-github"></i></a>
            <a target="_blank" class="tooltip" href="mailto:aybat93@gmail.com"><i class="ion-ios-email"><div class="tooltip-text">aybat93@gmail.com</div></i></a>
            <a target="_blank" href="https://www.linkedin.com/in/aybjax"><i class="ion-social-linkedin"></i></a>
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
                        <div class="progress">80</div>
                    </div>
                </td>
                <td>Shell/Bash
                    <div class="empty-bar">
                        <div class="progress">65</div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>Golang
                    <div class="empty-bar">
                        <div class="progress">40</div>
                    </div>
                </td>
                <td>PHP and laravel
                    <div class="empty-bar">
                        <div class="progress">45</div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>C
                    <div class="empty-bar">
                        <div class="progress">70</div>
                    </div>
                </td>
                <td>Java
                    <div class="empty-bar">
                        <div class="progress">40</div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>JS, JQuery, Reactjs
                    <div class="empty-bar">
                        <div class="progress">75</div>
                    </div>
                </td>
                <td>HTML, CSS, BS
                    <div class="empty-bar">
                        <div class="progress">85</div>
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
        <a target="_blank" href="{{route('painting')}}">
            <div class="content">
                <h2>Веб приложение Reactjs, html/php, scss</h2>
                <p>
                    Приложение для рисования. Можно сохранять на базе данных MySQL через Laravel в качестве backend приложения. 
                    для этого спользуется библиотека axios для GET, PUT, PATCH, DELETE методов HTTP, без использования Cross-origin resource sharing.
                </p>
                <p>
                    Не использовался Redux, а информация сохроняется в state хуке.
                </p>
                <p>
                    Анимация проихведена при помощи библиотеки framer motion.
                </p>

                <p>
                    Pop-up сообщения произведены при помощи библиотеки react-toastify
                </p>
            </div>
        </a>
        </div>
        <div class="content-wrapper">
        <a target="_blank" href="{{route('notebooks.index')}}">
            <div class="content">
                <h2>Веб приложение на php Laravel, Eloquent, scss</h2>
                <p>
                    Приложение для записи. Можно сохранять на базе данных при помоци Eloquent.
                </p>
                <p>
                    Генерирование, сохранение и удаление произведена без помощи Javascript. Использовалась только формы фреймворка Laravel.
                </p>
                <p>
                    Анимация проихведена при помощи scss.
                </p>
            </div>
        </a>
        </div>
        <div class="content-wrapper">
        <a target="_blank" href="http://aybat.host20.uk/webSites/notes/">
            <div class="content">
                <h2>Веб приложение на php, jQuery, ajax, Bootstrap</h2>
                <p>
                    Приложение для записи. Можно сохранять на базе данных при помоци mysqli. 
                    Приложение написано на процедурном php. При регистрации отправляется э-письмо для активизации. 
                </p>
                <p>
                    Функциональность записей произведена при помощи jQuery и Javascript для обработки и ajax обмена данных,
                     и процедурном php для сохранения и получения данных с базы данных. 
                </p>
                <p>
                    Оформлена при помощи css и Bootstrap
                </p>
            </div>
        </a>
        </div>
        <div class="content-wrapper">
        <a target="_blank" href="#">
            <div class="content">
                <h2>Другие проекты</h2>
                    <h4>
                        <a target="_blank" href="https://file-explorer-aybjax.herokuapp.com/">
                            Файловый браузер
                        </a>
                    </h4>

                    <h4>
                        <a target="_blank" href="http://aybat.host20.uk/webSites/fruitJQ/">
                            Fruit ninja 
                        </a>
                    </h4>

                    <h4>
                        <a target="_blank" href="http://aybat.host20.uk/webSites/stopwatch/">
                            Секундомер
                        </a>
                    </h4>

                    <h4>
                        <a target="_blank" href="http://aybat.host20.uk/webSites/mathJS/">
                            Math Game
                        </a>
                    </h4>
            </div>
        </a>
        </div>
        <div class="content-wrapper">
        <a class="just-hover">
            <div class="content">
                <h2> Дипломный проект на Python </h2>
                <p>
                    Обучение искусственного интеллекта на модификацию лекарственных веществ.
                </p>

                <p>
                    Для этого использовалась NEAT - NeuroEvolution of Augmenting Topologies
                </p>
                <p>
                    Оценка при помощи алгоритма Random Forest
                </p>
                <p>
                    Автоматизация молекулярного докинга и оценки молекулярных взаимодействии
                </p>
                <p>
                    Статистический анализ используя библиотеки pandas и sklearn
                </p>
            </div>
        </a>
        </div>
    </div>

</div>

@endsection("base.content")




@section("base.script-address")
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script>
$(function(){
    $(".progress").each(function(index, value){
        var progress = parseInt(value.innerHTML);
        $(this).text("");
        $(this).css('width', `${progress}%`);
    });
})
</script>
@endsection("base.script-address")