<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Reactions\StoreReactionRequest;
use App\Http\Resources\ReactionResource;
use App\Models\Reaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReactionController extends Controller
{
    public function store(StoreReactionRequest $request){
        $request['user_id']=Auth::id();
        $reaction = Reaction::create($request->all());
        if($reaction){
            return response()->json(new ReactionResource( $reaction), 201);

        }else{
            return response()->json(["message"=>"Failed to store reaction"] , 400);
        }

    }
}
