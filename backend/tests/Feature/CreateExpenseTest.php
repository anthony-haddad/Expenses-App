<?php

namespace Tests\Feature;

use App\Actions\CreateExpenseAction;
use App\Models\Expense;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Tests\TestCase;

class CreateExpenseTest extends TestCase
{
    use RefreshDatabase;    

    public function test_can_create_expense_having_valid_inputs()
    {
        $request = new Request([
            'value'       => 12.15,
            'description' => 'A random description...'
        ]);

        $expense = (new CreateExpenseAction)($request);
        $response = json_decode($expense->content());

        $createdExpense = Expense::find(1);
        
        $this->assertEquals(true, $response->success);
        $this->assertNotNull($createdExpense);
        $this->assertEquals(12.15, $createdExpense->value);
        $this->assertEquals('A random description...', $createdExpense->description);
    }
}
