<?php

namespace Database\Seeders;

use Flynsarmy\CsvSeeder\CsvSeeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class MemberSeeder extends CsvSeeder
{
    public function __construct()
    {
        $this->table = 'members';
        $this->filename = base_path().'/database/seeders/csvs/members.csv';
        $this->offset_rows = 1;
        $this->mapping = [
            0 => 'union_id',
            1 => 'last_name',
            2 => 'first_name',
            3 => 'last_name_ruby',
            4 => 'first_name_ruby',
            5 => 'nickname',
            6 => 'tel_1',
            7 => 'tel_2',
            8 => 'tel_3',
            9 => 'email',
            10 => 'password',
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
        DB::table($this->table)->truncate();

        parent::run();
    }

    /**
     * Seed a given set of data to the DB
     *
     * @param array $seedData
     * @return bool   TRUE on success else FALSE
     */
    // public function insert(array $seedData): bool
    // {
    //     \Log::error($seedData);
    //     $seedData['password'] = Hash::make($seedData['password']);
    //     return  parent::insert($seedData);
    // }
}
