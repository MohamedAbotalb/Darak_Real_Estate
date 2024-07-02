<?php


namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\Contracts\ImageRepositoryInterface;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    protected $imageRepository;

    public function __construct(ImageRepositoryInterface $imageRepository)
    {
        $this->imageRepository = $imageRepository;
    }

    public function deleteImage($imageId)
    {
            $deleted=$this->imageRepository->deleteImage($imageId);
            if(!$deleted){
                return response()->json(['message' => 'Image dosen`t exist'], 200);
            }
            return response()->json(['message' => 'Image deleted successfully'], 200);
      
    }
}
