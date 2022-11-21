<?php

namespace App\Actions;

use App\Models\Expense;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class DeleteExpenseAction
{
    public function __invoke(int $id)
    {
        try {
            $expense = Expense::find($id);

            if (!$expense) {
                throw new ModelNotFoundException('Expense not found');
            }

            $expense->delete($id);

            return response()->json([
                'message' => 'Expense deleted successfully!',
                'success' => true,
            ]);
        } catch (ModelNotFoundException $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => $e->getMessage(),
                'success' => false,
            ], 404);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something went wrong when deleting an expense',
                'success' => false,
            ], 500);
        }

    }
}