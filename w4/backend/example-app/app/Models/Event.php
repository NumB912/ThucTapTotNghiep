<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends Model
{
    protected $table = 'event'; 
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'title',
        'content',
        'start_day',
        'end_day',
        'location_id',
        'parent_id',
        'image_id',
        'category',
        'location_name',
        'image_url',
    ];

    protected $date = [
        'start_day',
        'end_day'
    ];

    // public function image()
    // {
    //     return $this->belongsTo(Image::class, 'image_id');
    // }

    public function location()
    {
        return $this->belongsTo(Location::class, 'location_id');
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Event::class, 'parent_id')->withDefault();
    }

    public function children()
    {
        return $this->hasMany(Event::class, 'parent_id');
    }

    public function details()
    {
        return $this->hasMany(EventDetail::class, 'event_id');
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class, 'event_id');
    }

    public function people()
    {
        return $this->belongsToMany(Person::class, 'event_person', 'event_id', 'person_id');
    }
}
