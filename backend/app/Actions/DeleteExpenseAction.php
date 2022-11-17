<?php

namespace App\Actions;

use App\Models\Expense;

class DeleteExpenseAction
{
    public function __invoke(int $id)
    {
        try {
            $expense = Expense::findOrFail($id);
            $expense->delete($id);

            return response()->json([
                'message' => 'Expense deleted successfully!',
                'success' => true,
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something went wrong when deleting an expense',
                'success' => false,
            ], 500);
        }

    }
}