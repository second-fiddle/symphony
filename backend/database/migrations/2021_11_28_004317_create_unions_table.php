<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unions', function (Blueprint $table) {
            $table->id();
            $table->string('code', 8);
            $table->string('name', 100)->nullable();
            $table->string('area_code', 2)->nullable();
            $table->string('zip_code', 7)->nullable();
            $table->string('prefecture_code', 2)->nullable();
            $table->string('address1', 100)->nullable();
            $table->string('address2', 100)->nullable();
            $table->string('address3', 100)->nullable();
            $table->softDeletes();
            $table->dateTime('created_at')->useCurrent();
            $table->string('created_user')->nullable();
            $table->dateTime('updated_at')->useCurrentOnUpdate()->useCurrent();
            $table->string('updated_user')->nullable();

            $table->unique(['code', 'deleted_at']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('unions');
    }
}
