<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use Maatwebsite\Excel\Importer;
use App\Imports\GroupedBreezeUserImport;

use App\Exceptions\ImportModelNotAvailable;
use App\Http\Requests\ImportRequest;

use Maatwebsite\Excel\Facades\Excel;

class ImportController extends Controller
{
    protected $files;
    protected $importer;
    
    /**
     * Handle importing a specific model
     * @param ImportRequest
     * @return JsonResponse
     */
    public function import(ImportRequest $request): JsonResponse
    {
        $importType = strtolower($request->importType);
        $this->files = $request->file('files');

        try {
            switch ($importType) {
                case 'grouped-breeze':
                    $this->importer = new GroupedBreezeUserImport;
                    break;
    
                    // add more imports
                    
                default:
                    throw new ImportModelNotAvailable($request);
                    break;
            }

            $this->processImport();

            return response()->json([
                'message' => 'Successfully imported ' . $importType
            ], 201);
        } catch (\Throwable $th) {
            throw new $th;
            return response()->json([
                'message' => 'Failed imported ' . $importType
            ], 400);
        }
    }

    /**
     * Process import with specific import logic & Excel Facade
     */
    private function processImport (): void
    {
        foreach ($this->files as $file) {
            Excel::import($this->importer, $file);
        }
    }
}
