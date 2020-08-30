<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Paint extends Model
{
    protected $fillable = [
        'user_id', 'url',
    ];

    public function user()
    {
        $this->belongsTo('App\User');
    }

    public $timestamps = false;
}
