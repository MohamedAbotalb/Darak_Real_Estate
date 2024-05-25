<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportUser extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'landlord_id', 'content'];
    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }
    public function landlord()
    {
        return $this->belongsTo(User::class, 'landlord_id');
    }
}
