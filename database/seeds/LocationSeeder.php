<?php

use Illuminate\Database\Seeder;
use App\Location;

use GuzzleHttp\Client;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    
    public function run()
    {
        //
        $client = new Client();
 
        $res = $client->request('GET', 'http://opendata.iprpraha.cz/CUR/ZPK/ZPK_O_Kont_TOstan_b/WGS_84/ZPK_O_Kont_TOstan_b.json', [
            'verify' => false
        ]);
         
        $data=json_decode($res->getBody(), true);

        foreach ($data['features'] as $key => $value) {
            Location::create([
                'id' => $value['properties']['OBJECTID'],
                'lat' => $value['geometry']['coordinates'][1],
                'lng' => $value['geometry']['coordinates'][0],
                'stationName' => $value['properties']['STATIONNAME'],
                'cityDistrict' => $value['properties']['CITYDISTRICT'],
                'Access' => $value['properties']['PRISTUP'],
            ]);
        }
    }
}
