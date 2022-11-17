<?php

namespace App\Traits;

use Illuminate\Contracts\Validation\Validator as ValidatorContract;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

trait RequestValidation
{
    private function validateRequest(Request $request): ValidatorContract
    {
        return Validator::make(
            $request->only(['value', 'description']),
            [
                'value'       => 'required|numeric|min:1',
                'description' => 'required|string|max:100'
            ]
        );
    }

    private function validationErrorResponse(ValidatorContract $validator): JsonResponse
    {
        return response()->json([
            'errors'  => $validator->errors(),
            'success' => false,
        ], 422);
    }
}