<?php

namespace App\Http\Middleware;

use App\Track;
use Closure;

class getAddress
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if($_SERVER['REMOTE_ADDR'] !== '127.0.0.1')
        {
            $track = new Track;
            $track->page = $_SERVER['REQUEST_URI'];
            $track->address = $_SERVER['REMOTE_ADDR'];
            $track->save();
        }

        $response = $next($request);
        return $response;
    }
}
