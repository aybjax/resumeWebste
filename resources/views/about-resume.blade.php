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
            <img src="media/Aibat_Zhakeyev.jpg" alt="my-photo" />
        </div>
        <table class="grid-table">
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
                <td>Java, Android
                    <div class="empty-bar">
                        <div class="progress">40</div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>JS, JQuery, React
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
            <tr>
                <td>Flutter и Dart
                    <div class="empty-bar">
                        <div class="progress">70</div>
                    </div>
                </td>
                <td>React Native
                    <div class="empty-bar">
                        <div class="progress">70</div>
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
            <a target="_blank" href="visit/heroku/nextjs-material-ui">
                <div class="content">
                    <h2>Nextjs с Material UI на heroku (нажми)</h2>
                    <p>
                        Приложение сохраняет ФИО, имейл и телефон и оправляет POST request на jsonplaceholder.typicode.com/posts.
                    </p>
                    <p>
                        Не использовался Redux, а информация сохроняется в state с использованием useReducer.
                    </p>
                    <p>
                        useMediaQuery с Material UI (до iPhone SE).
                    </p>

                    <p>
                        Используется backend API Nextjs для скрытия POST метода URL
                    </p>
                </div>
            </a>
        </div>

        <div class="content-wrapper">
            <a target="_blank" href="{{route('painting')}}">
                <div class="content">
                    <h2>Веб приложение Reactjs, html/php, scss (нажми)</h2>
                    <p>
                        Приложение для рисования. Можно сохранять на базе данных MySQL через Laravel в качестве backend приложения. 
                        для этого спользуется библиотека axios для GET, PUT, PATCH, DELETE методов HTTP.
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
            <a>
                <div class="content">
                    <h2>Мобильное приложения галерея на Flutter и React Native</h2>
                    <p>
                        Приложение c 2мя экранами:
                        <ol>
                            <li>
                                Мини изображение с названием и автором
                            </li>
                            <li>
                                Одну фотографию с максимальной площадью (при нажатии)
                            </li>
                        </ol>
                    </p>
                    <p>
                        <a target="_blank" href="visit/github/aybjax-React-Native_demo_for_devstream.mobi  ">
                            React Native: (нажми) с использованием Material UI с Redux Saga. Создан без использования EXPO, а с create-react-native-app.
                        </a>
                    </p>
                    <p>
                        <a target="_blank" href="visit/github/aybjax-flutter_demo_for_devstream.mobi">
                            Flutter: (нажми) http package, анимации, Material library с Stateful и Stateless виджетами.
                        </a>
                    </p>
                </div>
            </a>
        </div>
        <div class="content-wrapper">
            <a target="_blank" href="{{route('notebooks.index')}}">
                <div class="content">
                    <h2>Веб приложение на php Laravel, Eloquent, scss (нажми)</h2>
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
            <a target="_blank" href="redirect/notes/">
                <div class="content">
                    <h2>Веб приложение на php, jQuery, ajax, Bootstrap (нажми)</h2>
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
                    <h2>Другие проекты (нажми)</h2>
                    
                    <h4>
                        <a target="_blank" href="visit/heroku/file-explorer-aybjax">
                            Файловый браузер
                        </a>
                    </h4>
                    <p>
                        Приложение На Nodejs в сервере Heroku
                    </p>
                    <h4>
                        <a target="_blank" href="visit/github/qwant_kz">
                            Программы на С 
                        </a>
                    </h4>
                    <p>
                        Проекты выполненные на программе QwantKz в содействии Qwasar
                    </p>
                    <h4>
                        <a target="_blank" href="visit/github/">
                            Программы на Golang и Java и т.д.
                        </a>
                    </h4>
                    <p>
                        Маленкие программы по биоинформатике и простые программы сделанные во время изучения в платформах Udemy и Coursera
                    </p>
                    <h4 class="inline-block">
                        <a target="_blank" href="redirect/fruitJQ/">
                            |   Fruit ninja   |
                        </a>
                    </h4>
                    <h4 class="inline-block">
                        <a target="_blank" href="redirect/stopwatch/">
                            Секундомер   |
                        </a>
                    </h4>
                    <h4 class="inline-block">
                        <a target="_blank" href="redirect/mathJS/">
                            Math Game    |
                        </a>
                    </h4>
                </div>
            </a>
        </div>
        <div class="content-wrapper">
            <a class="just-hover">
                <div class="content">
                    <h2> Дипломный проект на Python</h2>
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