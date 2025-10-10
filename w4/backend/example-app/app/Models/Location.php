<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Location extends Model
{
    protected $table = 'location';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'x',
        'y',
        'location_name',
        'parent_id',
        'region',
    ];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Location::class, 'parent_id')->withDefault();
    }

    public function children()
    {
        return $this->hasMany(Location::class, 'parent_id');
    }
    public function events()
    {
        return $this->hasMany(Event::class, 'location_id');
    }
}
