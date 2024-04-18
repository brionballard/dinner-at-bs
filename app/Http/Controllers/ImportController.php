<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use Maatwebsite\Excel\Importer;
use App\Imports\UserImport;

use App\Exceptions\ImportModelNotAvailable;
use App\Http\Requests\ImportRequest;

class ImportController extends Controller
{
    public function __construct(Importer $importer)
    {
        $this->importer = $importer;
    }
    
    /**
     * Handle importing a specific model
     * @param ImportRequest
     * @return JsonResponse
     */
    public function importModel(Request $request): JsonResponse
    {
        $model = strtolower($request->model);
        
        try {
            switch ($model) {
                case 'user':
                    // pass file to UserImport
                    break;
    
                default:
                    throw new ImportModelNotAvailable($request);
                    break;
            }

            return response()->json([
                'message' => 'Successfully imported ' . $model
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Failed imported ' . $model
            ], 400);
        }
        
    }
}
