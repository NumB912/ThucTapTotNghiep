<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Image extends Model
{
    protected $table = 'image';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'url',
        'alt',
    ];

    public function events(): HasMany
    {
        return $this->hasMany(Event::class, 'img_id');
    }
}
