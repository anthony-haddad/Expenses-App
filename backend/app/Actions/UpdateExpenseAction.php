<?php

namespace App\Actions;

use App\Models\Expense;
use App\Traits\RequestValidation;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class UpdateExpenseAction
{
    use RequestValidation;

    public function __invoke(Request $request, int $id)
    {
        try {
            $expense = Expense::find($id);
            $validator = $this->validateRequest($request);

            if (!$expense) {
                throw new ModelNotFoundException('Could not find expense having id ' . $id);
            }

            if ($validator->fails()) {
                return $this->validationErrorResponse($validator);
            }

            $expense->update($validator->validated());

            return response()->json([
                'success' => true,
                'message' => 'Expense updated successfully!',
            ]);

        } catch (ModelNotFoundException $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }
}
