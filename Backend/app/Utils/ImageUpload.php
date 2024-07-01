<?php

namespace App\Utils;

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
}