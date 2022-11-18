<?php

namespace Tests\Feature;

use App\Actions\UpdateExpenseAction;
use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UpdateExpenseTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_update_expense_having_valid_inputs()
    {
        $id = 1;
        Expense::factory()->create([
            'id'          => $id,
            'value'       => 10,
            'description' => 'coffee machine',
        ]);

        $request = new Request([
            'id'          => $id,
            'value'       => 20,
            'description' => 'edited',
        ]);

        (new UpdateExpenseAction)($request, $id);

        $updatedExpense = Expense::find($id);

        $this->assertEquals(20, $updatedExpense->value);
        $this->assertEquals('edited', $updatedExpense->description);
    }
}
