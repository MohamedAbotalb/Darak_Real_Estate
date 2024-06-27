<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReportUser extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = ['user_id', 'landlord_id', 'content'];
    protected $dates=['deleted_at'];
    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }
    public function landlord()
    {
        return $this->belongsTo(User::class, 'landlord_id');
    }
}
