<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\Contracts\PropertyUpdatesRepositoryInterface;
use Illuminate\Http\Request;

class PropertyUpdateController extends Controller
{
    protected $propertyUpdatesRepository;

    public function __construct(PropertyUpdatesRepositoryInterface $propertyRepository)
    {
        $this->propertyUpdatesRepository = $propertyRepository;
    }
    public function approve($id)
    {
        $property = $this->propertyUpdatesRepository->approvePropertyUpdate($id);

        if (!$property) {
            return response()->json(['message' => 'Property update not found or approval failed'], 404);
        }

        return response()->json(['message' => 'Property update approved successfully', 'property' => $property], 200);
    }
    public function reject($id)
    {
        $property = $this->propertyUpdatesRepository->rejectPropertyUpdate($id);

        if (!$property) {
            return response()->json(['message' => 'Property update not found.'], 404);
        }

        return response()->json(['message' => 'Property update rejected.', 'property' => $property]);
    }
}
