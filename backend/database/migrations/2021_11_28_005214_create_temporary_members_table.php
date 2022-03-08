<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTemporaryMembersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('temporary_members', function (Blueprint $table) {
            $table->id()->comment('仮会員ID');
            $table->foreignId('property_id')->comment('物件ID');
            $table->string('room_no', 10)->comment('部屋番号');
            $table->string('password', 60)->comment('パスワード');
            $table->timestamp('authenticated')->nullable()->default(null)->comment('認証日時');

            $table->foreign('property_id')->references('id')->on('properties')->cascadeOnDelete();

            $table->unique(['property_id', 'room_no']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('temporary_members');
    }
}
