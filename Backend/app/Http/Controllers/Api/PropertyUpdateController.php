<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PropertyUpdateOldDataResource;
use App\Http\Resources\PropertyUpdateResource;
use App\Repositories\Contracts\PropertyUpdatesRepositoryInterface;
use Illuminate\Http\Request;

class PropertyUpdateController extends Controller
{
    protected $propertyUpdatesRepository;

    public function __construct(PropertyUpdatesRepositoryInterface $propertyRepository)
    {
        $this->propertyUpdatesRepository = $propertyRepository;
    }
    public function index()
    {
        $pendingUpdates = $this->propertyUpdatesRepository->index();
        if (!$pendingUpdates) {
            return response()->json(['message' => 'No pending property updates found.'], 404);
        }

        return response()->json(PropertyUpdateResource::collection($pendingUpdates));
    }
    public function showNewProperty($id)
    {
        $pendingUpdates = $this->propertyUpdatesRepository->showNewProperty($id);
        if (!$pendingUpdates) {
            return response()->json(['message' => 'property not found.'], 404);
        }

        return response()->json(new PropertyUpdateResource($pendingUpdates));
    }
    public function showOldProperty($id)
    {
        $oldData = $this->propertyUpdatesRepository->showOldProperty($id);

        if (!$oldData) {
            return response()->json(['message' => 'Property update not found or not pending'], 404);
        }

        return response()->json(new PropertyUpdateOldDataResource($oldData), 200);
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
