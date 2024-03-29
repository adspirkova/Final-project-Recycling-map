<?php

namespace App\Http\Controllers;

use Auth;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\PayloadFactory;
use Tymon\JWTAuth\JWTManager as JWT;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->json()->all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'password_confirmation' => 'required|string|min:6|max:255',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(),400);
        }

        $user = User::create([
            'name' => $request ->json() ->get('name'),
            'email' => $request ->json() ->get('email'),
            'password' => Hash::make($request->json()->get('password')),
        ]);
        $token = JWTAuth::fromUser($user);
        return response()->json(compact('user','token'),201);
    }

    public function login(Request $request)
    {
        $credentials = $request -> json() ->all();

        try{
            if(! $token = JWTAuth::attempt($credentials)){
                return response()->json(['error'=> 'invalid_credentials'],400);
            }
        }catch(JWTException $e){
            return response()->json(['error' => 'could_not_create_token'],500);
        }
        return response()->json(compact('token'));
    }

    public function getAuthenticatedUser()
    {

        try{
            if(! $user = JWTAuth::parseToken()->authenticate()){
                return response()->json(['error'=> 'user_not_found'],404);
            }
        }catch(Tymon\JWTAuth\Exceptions\TokenExpiredException $e){
            return response()->json(['token_expired'],$e->getStatesCode());
        }catch(Tymon\JWTAuth\Exceptions\TokenInvalidException $e){
            return response()->json(['token_invalid'],$e->getStatesCode());
        }catch(Tymon\JWTAuth\Exceptions\JWTException $e){
            return response()->json(['token_absent'],$e->getStatesCode());
        }
        return response()->json(compact('user'));
    }

    public function changePassword(Request $request){
        $user = JWTAuth::parseToken()->authenticate();
        //入力した値と現在のパスワードがあっているかを確認し、違っていたら403エラーを出す
        if(!Hash::check($request->current, $user->password)){
            abort(403);
        }else{
        //$user->passwordはリクエストでcurrentとして定義したものである。
        $user->password = Hash::make($request->new);
        //$userを保存する
        $user->save();
        }
    }

    public function deleteUser(Request $request){
        $user = JWTAuth::parseToken()->authenticate();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->save();

        // return response()->json([
        //     "deleted" => 1
        // ]);
    }
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
}
