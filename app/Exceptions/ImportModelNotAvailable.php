<?php

namespace App\Exceptions;

use Exception;

class ImportModelNotAvailable extends Exception
{
    public function render($request)
    {
        return response()->json([
            'error' => 'Import model: ' . $request->model . ' not available.'
        ]);
    }
}
