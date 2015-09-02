<?php

namespace App\Http\Controllers\Mockups;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class HeaderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function getMenu()
    {
        return view('menu-mockup');
    }
}
