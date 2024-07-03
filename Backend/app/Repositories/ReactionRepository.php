<?php

namespace App\Repositories;

use App\Models\Reaction;
use App\Repositories\Contracts\ReactionRepositoryInterface;

class PropertyTypeRepository implements ReactionRepositoryInterface
{
    public function addReaction(array $data){
      
        $reaction = Reaction::create($data);
        if($reaction){
            return true;
        }else{
            return false;
        }

    }
}
