<?php

namespace Tests\Feature;

use App\Actions\GetSingleExpenseAction;
use App\Models\Expense;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GetSingleExpenseTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_get_a_single_expense()
    {
        $id = 2;
        Expense::factory()->create([ 'id' => $id ]);
        Expense::factory(5)->create();

        $expense = (new GetSingleExpenseAction)($id);
        $expense = json_decode($expense->content())->data;

        $this->assertNotNull($expense);
        $this->assertEquals($id, $expense->id);
    }
}
