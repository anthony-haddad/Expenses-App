<?php

namespace App\Actions;

use App\Models\Expense;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class GetSingleExpenseAction
{
    public function __invoke(int $id)
    {
        try {
            $expense = Expense::find($id); 

            if (!$expense) {
                throw new ModelNotFoundException('Could not find an expense having id ' . $id);
            }

            return response()->json([
                'success' => true,
                'data'    => $expense,
            ]);
        } catch (ModelNotFoundException $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }
}
