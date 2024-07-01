<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReportProperty extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = ['user_id', 'property_id', 'content','reason_id'];
    protected $dates=['deleted_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function property()
    {
        return $this->belongsTo(Property::class);
    }
    public function reason()
    {
        return $this->belongsTo(ReasonReport::class, 'reason_id');
    }

}
