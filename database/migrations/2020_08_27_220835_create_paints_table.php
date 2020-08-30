<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaintsTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */


    public function up()
    {
        Schema::create('paints', function (Blueprint $table) {
            $table->id();
            $table->timestamp('created_at')->useCurrent();
            $table->foreignId('user_id');
            $table->longText('url');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('paints');
    }
    public $timestamps = false;
}
