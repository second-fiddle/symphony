<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMemberPropertiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('member_properties', function (Blueprint $table) {
            $table->id()->comment('会員物件ID');
            $table->foreignId('member_id')->comment('会員ID');
            $table->foreignId('property_id')->comment('物件ID');
            $table->string('room_no', 10)->comment('部屋番号');
            $table->string('nickname', 20)->comment('ニックネーム');
            $table->softDeletes();

            $table->foreign('member_id')->references('id')->on('members')->cascadeOnDelete();
            $table->foreign('property_id')->references('id')->on('properties')->cascadeOnDelete();
            $table->unique(['member_id', 'property_id', 'deleted_at']);
            $table->unique(['property_id', 'room_no', 'deleted_at']);
            $table->unique(['property_id', 'nickname', 'deleted_at']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('member_properties');
    }
}
