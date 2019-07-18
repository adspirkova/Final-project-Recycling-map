<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddUniqueBinKeys extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('bins', function (Blueprint $table) {
            //
            $table->index(['stationId', 'trashTypeName'], "station_trashtypeName");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('bins', function (Blueprint $table) {
            //
            $table->dropIndex("station_trashtypeName");
        });
    }
}
