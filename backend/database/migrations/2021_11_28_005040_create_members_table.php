<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMembersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('union_id')->constrained()->cascadeOnDelete();
            $table->string('last_name', 20)->nullable();
            $table->string('first_name', 20)->nullable();
            $table->string('last_name_ruby', 40)->nullable();
            $table->string('first_name_ruby', 40)->nullable();
            $table->string('nickname', 20);
            $table->string('tel_1', 5)->nullable();
            $table->string('tel_2', 4)->nullable();
            $table->string('tel_3', 4)->nullable();
            $table->string('email', 256)->nullable();
            $table->string('password', 61);
            $table->softDeletes();
            $table->dateTime('created_at')->useCurrent();
            $table->string('created_user')->nullable();
            $table->dateTime('updated_at')->useCurrentOnUpdate()->useCurrent();
            $table->string('updated_user')->nullable();

            $table->unique(['union_id', 'nickname', 'deleted_at']);
            $table->unique(['union_id', 'email', 'deleted_at']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('members');
    }
}
