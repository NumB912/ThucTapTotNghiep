<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Region extends Model
{
    protected $table = 'region';
    protected $primaryKey = 'id';
    public $incrementing = false; 
    protected $keyType = 'int';

    protected $fillable = [
        'id',
        'region',
        'x',
        'y',
        'region_name',
        'parent_id'
    ];

    public function events(): HasMany
    {
        return $this->hasMany(Event::class, 'region_id');
    }

    public function parent(){
        return $this->belongsTo(Region::class,'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Region::class, 'parent_id');
    }

    protected $casts = [
        'region' => 'string',
        'x' => 'decimal:8',
        'y' => 'decimal:8',
    ];
}
