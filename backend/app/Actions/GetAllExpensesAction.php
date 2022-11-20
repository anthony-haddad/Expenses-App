<?php

namespace App\Actions;

use App\Models\Expense;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class GetAllExpensesAction
{
    public function __invoke(Request $request)
    {
        $term = $request->input('q');

        $expenses = Expense::where(function(Builder $q) use ($term) {
            return $q->where('description', 'like', '%' . $term . '%')
                    ->orWhere('value', 'like', '%' . $term . '%');
        })->paginate(config('app.per_page'));

        return response()->json($expenses);
    }
}