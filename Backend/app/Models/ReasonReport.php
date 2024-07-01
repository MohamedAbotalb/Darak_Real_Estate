<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReasonReport extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'reason',
        'type',
    ];
    public function reportUsers()
    {
        return $this->hasMany(ReportUser::class, 'reason_id');
    }

    public function reportProperties()
    {
        return $this->hasMany(ReportProperty::class, 'reason_id');
    }
}
