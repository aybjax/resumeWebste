<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notebook extends Model
{
    protected $fillable = [
        'user_id', 'content',
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
    
    public function getCreatedAtAttribute($val)
    {
        $time = strtotime($val);
        $newformat = date('Y-m-d H:i:s',$time);
        return $newformat;
    }

    public $timestamps = false;
}
