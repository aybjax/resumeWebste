<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Track extends Model
{
    protected $fillable = ['page', 'address', 'created_at', 'updated_at'];

    public $timestamps = true;
}
