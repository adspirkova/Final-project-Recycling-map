<?php

use Illuminate\Database\Seeder;

use App\Location;


class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $handle = fopen('AgsSeparatedTrashStationView.csv', "r");
        $header = true;

        while ($csvLine = fgetcsv($handle, 1000, ",")) {
        
            if ($header) {
                $header = false;
            } else {
                Location::create([
                    'id' => $csvLine[0],
                    'stationName' => $csvLine[1],
                    'cityDistrict' => $csvLine[2],
                    'lat' => $csvLine[3],
                    'lon' => $csvLine[4],
                ]);
            }
        }
    }
}
