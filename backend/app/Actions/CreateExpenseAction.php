<?php

namespace App\Actions;

use App\Models\Expense;
use App\Traits\RequestValidation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CreateExpenseAction
{
    use RequestValidation;

    public function __invoke(Request $request)
    {
        try {
            $validator = $this->validateRequest($request);

            if ($validator->fails()) {
                return $this->validationErrorResponse($validator);
            }

            $this->createEntry($validator->validated());

            return $this->successfulResponse();

        } catch (\Exception $e) {
            \Log::error($e->getMessage());

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }

    private function successfulResponse(): JsonResponse
    {
        return response()->json([
            'message' => 'Expense created successfully!',
            'success' => true,
        ]);
    }

    private function createEntry(array $data)
    {
        Expense::create($data);
    }
}
