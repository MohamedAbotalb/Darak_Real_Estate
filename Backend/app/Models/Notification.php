<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Notification extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = ['from_user_id', 'to_user_id', 'tour_id','message','property_id', 'type', 'date','status',];
    protected $dates=['deleted_at'];

    public function fromUser()
    {
        return $this->belongsTo(User::class, 'from_user_id');
    }

    public function toUser()
    {
        return $this->belongsTo(User::class, 'to_user_id');
    }
    public function tour()
    {
        return $this->belongsTo(Tour::class, 'tour_id');
    }
    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
