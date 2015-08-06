<?php

namespace App\AuthService;

use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class AuthService extends Controller
{
    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    protected $email;
    protected $password;

    public function __construct($request=null)
    {
        $this->middleware('guest', ['except' => 'getLogout']);
        if (!empty($request)) {
            $this->email = $request['email'];
            $this->password = $request['password'];
        }
    }

    public function authenticate()
    {
        $rules = array(
            'password' => 'required',
            'email' => 'email|required'
        );
        
        $validator = Validator::make(['email' => $this->email, 'password' => $this->password], $rules);
        if ($validator->fails()) {
            return 'Wrong login or password';
        } else {
            if (Auth::attempt(['email' => $this->email, 'password' => $this->password])) {
                return Auth::user();
            } else {
                return 'Wrong login or password';
            }
        }
    }
    
    public function logout(){
        Auth::logout();
        if(!Auth::check()){
            return 1;
        }
    }
}