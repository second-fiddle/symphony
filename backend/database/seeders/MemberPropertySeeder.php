<?php
namespace Database\Seeders;

use App\Models\MemberProperty;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MemberPropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Uncomment the below to wipe the table clean before populating
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        MemberProperty::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
