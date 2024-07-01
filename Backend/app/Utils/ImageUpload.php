<?php

namespace App\Utils;
use Illuminate\Http\UploadedFile;
class ImageUpload{
    public static function uploadImages(array $images, string $destinationPath)
    {
        $uploadedImagePaths = [];

        foreach ($images as $image) {
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path($destinationPath), $imageName);
            $uploadedImagePaths[] = $destinationPath . '/' . $imageName;
        }

        return $uploadedImagePaths;
    }
    public static function uploadImage(UploadedFile $image, string $destinationPath)
    {
        $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
        $image->move(public_path($destinationPath), $imageName);
        return $destinationPath . '/' . $imageName;
    }
}