<?php

namespace Database\Seeders;

use App\Models\Property;
use Flynsarmy\CsvSeeder\CsvSeeder;
use Illuminate\Support\Facades\DB;

class TemporaryMemberSeeder extends CsvSeeder
{
    public function __construct()
    {
        $this->table = 'temporary_members';
        $this->filename = base_path().'/database/seeders/csvs/temporary_members.csv';
        $this->offset_rows = 1;
        $this->mapping = [
            0 => 'property_code',
            1 => 'room_no',
            2 => 'password'
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
    public function insert(array $seedData): bool
    {
        foreach ($seedData as $index => $data) {
            $property = Property::where('code', $data['property_code'])->first();
            $data['property_id'] = $property->id;
            unset($data['property_code']);
            $data['password'] = $data['password'];
            $seedData[$index] = $data;
        }

        return parent::insert($seedData);
    }
}
