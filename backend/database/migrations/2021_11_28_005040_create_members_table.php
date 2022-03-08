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
            $table->id()->comment('会員ID');
            $table->string('last_name', 20)->nullable()->comment('姓');
            $table->string('first_name', 20)->nullable()->comment('名');
            $table->string('last_name_ruby', 40)->nullable()->comment('姓(ふりがな)');
            $table->string('first_name_ruby', 40)->nullable()->comment('名(ふりがな)');
            $table->string('tel1', 13)->nullable()->comment('連絡先1');
            $table->string('tel2', 13)->nullable()->comment('連絡先2');
            $table->string('email', 256)->comment('メールアドレス');
            $table->string('password', 60)->comment('パスワード');
            $table->timestamp('email_verified_at')->nullable()->comment('メールアドレス確認日時');
            $table->softDeletes();
            $table->dateTime('created_at')->useCurrent();
            $table->dateTime('updated_at')->useCurrentOnUpdate()->useCurrent();

            $table->unique(['email', 'deleted_at']);
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
