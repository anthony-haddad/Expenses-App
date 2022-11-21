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
use OpenApi\Attributes as OA;

class ExpenseController extends Controller
{
    /**
     * Get all expenses
     *
     * @OA\Get(
     *     path="/api/expense",
     *     tags={"expense"},
     *     operationId="getAllExpenses",
     *     @OA\Response(
     *         response=200,
     *         description="Successful response"
     *     ),
     * )
     */
    public function index(Request $request): JsonResponse
    {
        return (new GetAllExpensesAction)($request);
    }

    /**
     * Add new expense
     * 
     * @OA\Post(
     *  path="/api/expense",
     *  tags={"expense"},
     *      @OA\RequestBody(
     *         required=true,
     *         description="Expense that needs to be added",
     *         @OA\JsonContent(ref="#/components/schemas/Expense"),
     *     ),
            @OA\Response(
                response="200",
                description="Created successfully",
            ),
            @OA\Response(
                response="422",
                description="Validation error",
            )
     * )
     */
    public function store(Request $request): JsonResponse
    {
        return (new CreateExpenseAction)($request);
    }

    public function show($id)
    {
        return (new GetSingleExpenseAction)($id);
    }

    /**
     * Update expense by id
     * 
     * @OA\Put(
     *  path="/api/expense/{expenseId}",
     *  tags={"expense"},
     *      @OA\Parameter(
     *         name="expenseId",
     *         in="path",
     *         description="Update expense by id",
     *         required=true,
     *     ),
     *      @OA\RequestBody(
     *         required=true,
     *         description="Expense that needs to be updated",
     *         @OA\JsonContent(ref="#/components/schemas/Expense"),
     *     ),
            @OA\Response(
                response="200",
                description="Updated successfully",
            ),
            @OA\Response(
                response="422",
                description="Validation error",
            )
     * )
    */
    public function update(Request $request, $id)
    {
        return (new UpdateExpenseAction)($request, $id);
    }

    /**
     * Delete expense by id
     * @OA\Delete(
     *  path="/api/expense/{expenseId}",
     *  tags={"expense"},
     *      @OA\Parameter(
     *         name="expenseId",
     *         in="path",
     *         description="Delete expense by id",
     *         required=true,
     *     ), 
            @OA\Response(
                response="200",
                description="Deleted successfully",
            ),
            @OA\Response(
                response="404",
                description="Expense not found",
            )
     * )
     */
    public function destroy($id)
    {
        return (new DeleteExpenseAction)($id);
    }
}
