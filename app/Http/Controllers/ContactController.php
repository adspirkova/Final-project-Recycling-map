<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Contact;

use Session;


class ContactController extends Controller
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
        dd($request);
        $id = $request->input('stationId');


        foreach ($request->trashTypeName as $key => $value) {
            if (!Bin::where([
                'stationId' => $id,
                'trashTypeName' => $value
            ])->exists()) {
                $bin = new Bin;
                $bin->stationId = $id;
                $bin->trashTypeName = $value;
                $bin->cleaningFrequencyCode = 11;
                $bin->containerType = '240 normální HV';
                $bin->save();
            }  
        }
        Session::flash('success_message', 'OK!');
        return redirect('/map');
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
}
