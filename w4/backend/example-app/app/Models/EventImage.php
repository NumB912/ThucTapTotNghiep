<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventImage extends Model
{
    protected $table = 'event_image';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'int';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'event_detail_id',
        'image_id',
    ];

    public function eventDetail()
    {
        return $this->belongsTo(EventDetail::class, 'event_detail_id');
    }

    public function image()
    {
        return $this->belongsTo(Image::class, 'image_id');
    }
}
