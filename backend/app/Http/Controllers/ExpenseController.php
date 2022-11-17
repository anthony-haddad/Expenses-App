<?php

namespace App\Http\Controllers;

use App\Actions\CreateExpenseAction;
use App\Actions\DeleteExpenseAction;
use App\Actions\GetAllExpensesAction;
use App\Actions\GetSingleExpenseAction;
use App\Actions\UpdateExpenseAction;
use App\Models\Expense;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function index(): JsonResponse
    {
        return (new GetAllExpensesAction)();
    }

    public function store(Request $request): JsonResponse
    {
        return (new CreateExpenseAction)($request);
    }

    public function show($id)
    {
        return (new GetSingleExpenseAction)($id);
    }

    public function update(Request $request, $id)
    {
        return (new UpdateExpenseAction)($request, $id);
    }

    public function destroy($id)
    {
        return (new DeleteExpenseAction)($id);
    }
}
