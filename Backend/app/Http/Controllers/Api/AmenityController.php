<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Amenities\AmenityRequest;
use App\Http\Resources\AmenityResource;
use App\Repositories\Contracts\AmenityRepositoryInterface;
use Illuminate\Http\Request;

class AmenityController extends Controller
{
    protected $amenityRepository;

    public function __construct(AmenityRepositoryInterface $amenityRepository)
    {
        $this->amenityRepository = $amenityRepository;
    }

    public function index()
    {
        $amenities = $this->amenityRepository->getAllAmenities();
        return AmenityResource::collection($amenities);
    }

    public function store(AmenityRequest $request)
    {
        $amenity = $this->amenityRepository->createAmenity($request->validated());
        return response()->json(new AmenityResource($amenity), 201);
    }

    public function show($slug)
    {
        $amenity = $this->amenityRepository->findAmenityBySlug($slug);

        if (!$amenity) {
            return response()->json(['error' => 'Amenity not found'], 404);
        }

        return response()->json(new AmenityResource($amenity));
    }

    public function update(AmenityRequest $request, $slug)
    {
        $amenity = $this->amenityRepository->updateAmenity($slug, $request->validated());

        if (!$amenity) {
            return response()->json(['error' => 'Amenity not found'], 404);
        }

        return response()->json(new AmenityResource($amenity));
    }

    public function destroy($slug)
    {
        $deleted = $this->amenityRepository->deleteAmenity($slug);

        if (!$deleted) {
            return response()->json(['error' => 'Amenity not found'], 404);
        }

        return response()->json(["message" => "Amenity deleted successfully"]);
    }
    public function updateAvailability(Request $request, $id)
    {
        $validatedData = $request->validate([
            'status' => 'required|in:available,unavailable',
        ]);

        $status = $validatedData['status'];
        $result = $this->amenityRepository->updateAmenityAvailability($id, $status);

        if ($result) {
            return response()->json(['message' => ' availability updated successfully'], 200);
        } else {
            return response()->json(['error' => 'Amenity not found'], 400);
        }
    }
}
