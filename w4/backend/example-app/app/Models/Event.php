<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $table = 'event';

    protected $fillable = [
        'title',
        'content',
        'day',
        'region',
        'region_name',
        'img',
        'to_day',
    ];

    public function details()
    {
        return $this->hasMany(EventDetail::class, 'event_id');
    }
}
