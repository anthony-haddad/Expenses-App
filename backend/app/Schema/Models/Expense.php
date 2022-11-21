<?php

namespace App\Schema\Models;

/**
 * @OA\Info(title="Expense Manager API", version="1.0")
 * @OA\Schema(required={"value", "description"})
 */
class Expense {
    /**
     * @OA\Property 
     * @var int
     */
    public $id;

    /**
     * @OA\Property
     * @var string
     */
    public $value;

    /**
     * @OA\Property
     * @var string
     */
    public $description;
}