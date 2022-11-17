<?php

namespace App\Actions;

use App\Models\Expense;

class GetAllExpensesAction
{
    public function __invoke()
    {
        return response()->json(Expense::simplePaginate(config('app.per_page')));
    }
}