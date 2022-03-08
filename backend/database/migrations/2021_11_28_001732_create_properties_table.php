<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePropertiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id()->comment('物件ID');
            $table->string('code', 8)->comment('物件コード');
            $table->string('name', 100)->comment('物件名');
            $table->string('area_code', 2)->comment('地域コード');
            $table->string('postal_code', 7)->comment('郵便番号');
            $table->string('prefecture_code', 2)->comment('都道府県コード');
            $table->string('municipality', 100)->comment('市区町村');
            $table->string('address1', 100)->comment('番地');
            $table->softDeletes();
            $table->dateTime('created_at')->useCurrent();
            $table->dateTime('updated_at')->useCurrentOnUpdate()->useCurrent();

            $table->unique(['code']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('properties');
    }
}
