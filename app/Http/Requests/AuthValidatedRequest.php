<?php
/**
 * Created by PhpStorm.
 * User: Andriy
 * Date: 06.08.2015
 * Time: 14:17
 */

namespace App\Http\Requests;

class AuthValidatedRequest extends Request
{

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'password' => 'required',
            'email' => 'email|required'
        ];
    }
}
