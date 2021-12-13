<?php
namespace Database\Seeders;

use Flynsarmy\CsvSeeder\CsvSeeder;
use Illuminate\Support\Facades\DB;

class UnionSeeder extends CsvSeeder
{
    public function __construct()
    {
        $this->table = 'unions';
        $this->filename = base_path().'/database/seeders/csvs/unions.csv';
        $this->offset_rows = 1;
        $this->mapping = [
            0 => 'code',
            1 => 'name',
            2 => 'area_code',
            3 => 'zip_code',
            4 => 'prefecture_code',
            5 => 'address1',
            6 => 'address2',
            7 => 'address3',
        ];
    }
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Recommended when importing larger CSVs
        DB::disableQueryLog();

        // Uncomment the below to wipe the table clean before populating
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table($this->table)->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        parent::run();
    }
}
