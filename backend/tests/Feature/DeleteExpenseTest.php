<?php

namespace Tests\Feature;

use App\Actions\DeleteExpenseAction;
use App\Models\Expense;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DeleteExpenseTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_delete_an_expense()
    {
        Expense::factory()->create([ 'id' => 1 ]);

        (new DeleteExpenseAction)(1);

        $this->assertCount(0, Expense::all());
    }
}
