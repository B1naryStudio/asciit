<?php

namespace App\Http\Requests;

class QuestionValidatedRequest extends Request
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
            'title' => 'required|max:400',
            'description' => 'required|max:16383',
            'folder' => 'required'
        ];
    }
}
