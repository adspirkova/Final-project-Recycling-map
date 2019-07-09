<?php

use Illuminate\Database\Seeder;
use GuzzleHttp\Client;
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
        //
        $client = new Client();
 
        $res = $client->request('GET', 'http://opendata.iprpraha.cz/CUR/ZPK/ZPK_O_Kont_TOitem_b/WGS_84/ZPK_O_Kont_TOitem_b.json', [
            'verify' => false
        ]);
         
        $data=json_decode($res->getBody(), true);

        foreach ($data['features'] as $key => $value) {
            Bin::create([
                'id' => $value['properties']['OBJECTID'],
                'stationId' => $value['properties']['STATIONID'],
                'trashTypeName' => $this -> trashTypeTranslate($value['properties']['TRASHTYPENAME']),
                'cleaningFrequencyCode' => $value['properties']['CLEANINGFREQUENCYCODE'],
                'containerType' => $value['properties']['CONTAINERTYPE'],
            ]);
        }
    }
    
    public function trashTypeTranslate($czech)
    {
        $trashTypeName = [
            'Papír' => 'Paper',
            'Barevné sklo' => 'Coloured glass',
            'Plast' => 'Plastic',
            'Elektrozařízení' => 'Electric equipment',
            'Nápojové kartóny' => 'Cardboard',
            'Čiré sklo' => 'Clear glass',
            'Kovy' => 'Metals',
        ];

        return $trashTypeName[$czech];
    }
}
