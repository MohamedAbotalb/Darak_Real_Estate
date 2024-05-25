<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'landlord_id', 'message', 'type', 'date'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function landlord()
    {
        return $this->belongsTo(User::class, 'landlord_id');
    }

}
