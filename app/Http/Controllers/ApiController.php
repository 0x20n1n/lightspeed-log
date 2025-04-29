<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function testCall()
    {
        return response()->json(['message' => 'Success!'], 200);
    }
}