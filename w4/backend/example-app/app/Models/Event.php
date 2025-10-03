<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends Model
{
    protected $table = 'event'; // tên bảng
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'title',
        'content',
        'start_day',
        'end_day',
        'region_id',
        'parent_id',
        'img_id',
    ];

    protected $dates = ['start_day', 'end_day'];
    public function image()
    {
        return $this->belongsTo(Image::class, 'img_id');
    }


    public function region()
    {
        return $this->belongsTo(Region::class, 'region_id');
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Event::class, 'parent_id');
    }

    public function details(){
        return $this->hasMany(EventDetail::class,'event_id');
    }

public function favorites()
{
    return $this->hasMany(Favorite::class, 'event_id');
}


    public function children()
    {
        return $this->hasMany(Event::class, 'parent_id');
    }
}
