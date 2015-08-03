<?php

namespace App\AuthService;

use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Repositories\Entities\User;
use Illuminate\Auth\Authenticatable;
use Validator;

class AuthService extends Controller{
    
    use AuthenticatesAndRegistersUsers, ThrottlesLogins;
    
    
    protected $email;
    protected $password;

    public function __construct(array $request) {
        $this->middleware('guest', ['except' => 'getLogout']);
        $this->email = $request['email'];
        $this->password = $request['password'];
    }


    public function authenticate()
    {
        $rules = array(
            'password' => 'required',
            'email' => 'email|required|unique:user'
        );
        
        $validator = Validator::make(['email' => $this->email, 'password' => $this->password], $rules);
        if($validator->fails()){
            return 'Wrong email or password';
        }else{
            if (Auth::attempt(['email' => $this->email, 'password' => $this->password]))
            {
                return Auth::user();
            }else{
                return 'Wrong email or password';
            }
        }
    }
    
}