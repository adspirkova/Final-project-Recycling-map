<?php

use Illuminate\Database\Seeder;

use App\Bin;


class BinSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $handle = fopen('AgsSeparatedTrashStationItemView.csv', "r");
        $header = true;

        while ($csvLine = fgetcsv($handle, 1000, ";")) {
        
            if ($header) {
                $header = false;
            } else {
                // var_dump($csvLine);
                Bin::create([
                    'id' => $csvLine[0],
                    'stationId' => $csvLine[1],
                    'trashTypeCode' => $csvLine[2],
                    'trashTypeName' => $csvLine[3],
                    'containers' => $csvLine[4],
                    'cleaningFrequencyCode' => $csvLine[5],
                    'containerType' => $csvLine[6],
                ]);
            }
        }
    }
}
