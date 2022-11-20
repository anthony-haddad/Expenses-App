<?php

namespace Tests\Feature;

use App\Actions\GetAllExpensesAction;
use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GetAllExpensesTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_get_all_expenses()
    {
        Expense::factory(10)->create();

        $request = new Request();

        $expenses = (new GetAllExpensesAction)($request);
        $response = json_decode($expenses->content())->data;

        $this->assertCount(10, $response);
    }
}