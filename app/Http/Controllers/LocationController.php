<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Location;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $locations = Location::all();
        return response()->json(['locations'=> $locations],200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
    public function getLocations($lat, $lng, $currZoom) 
    {
        $locations = Location::where('lat', '<', $lat + (0.121631276478468 * (19-$currZoom)))->where('lat', '>', $lat - (0.121631276478468 * (19-$currZoom)))->where('lng', '<', $lng + (0.0494191226666671*(19-$currZoom)))->where('lng', '>', $lng - (0.0494191226666671*(19-$currZoom)))->get();
        return response()->json(['locations'=> $locations],200);
    }

    public function getCities() 
    {
        $cities = Location::select('cityDistrict')->distinct()->orderByRaw('`cityDistrict` ASC')->get();
        return response()->json(['cities'=> $cities],200);
    }

    public function getStation($city) 
    {
        $stations = Location::select('stationName', 'id')->where('cityDistrict', '=', $city)->distinct()->orderByRaw('`stationName` ASC')->get();
        return response()->json(['stationName'=> $stations],200);
    }

}
 