<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Bin;

class BinController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $id = $request->input('stationId');
        
        $bins = $request->input('trashTypename');

        foreach ( $bins as $value) {
            dd($query = "
                SELECT `$id`
                FROM `bins`
                WHERE `trashTypeName` = $value;
            ");
        }

        

        if ($request->has('stationId')) {
            
        }


        $record = (object)[
            'id'          => null,
            'stationId'        => null,
            'trashTypeName'        => null,
            'cleaningFrequencyCode'        => null,
            'containerType'        => null,
        ];

        if ($request->method() == 'POST') {
            
            $valid = true;

            $record->stationId = $request->input('stationId');
            $record->trashTypeName = $request->input('trashTypeName');
            $record->cleaningFrequencyCode = 11;
            $record->containerType = '240 normální HV';

            $query = 
                       "INSERT
                       INTO `bins`
                       (`stationId`, `trashTypeName`, `cleaningFrequencyCode`, `containerType`)
                       VALUES
                       (?, ?, ?, ?)
                    ";

                    Bin::insert($query, [
                        $record->stationId,
                        $record->trashTypeName,
                        $record->cleaningFrequencyCode,
                        $record->containerType,
                        // ...
                    ]);
            $record->id = Bin::getPdo()->lastInsertId();
            Session::flash('success_message', 'OK!');
            return redirect('/map');
        }

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    public function getBins($id) 
    {
        $bins = Bin::where('stationId',$id)->get();
        return response()->json(['bins'=> $bins],200);
    }
}
