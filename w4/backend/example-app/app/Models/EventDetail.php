<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EventDetail extends Model
{
    protected $table = 'event_detail';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'event_id',
        'title_content',
        'content',
        'priority',
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class, 'event_id');
    }

public function images()
{
    return $this->belongsToMany(
        Image::class,
        'event_image',      
        'event_detail_id',   
        'image_id'          
    );
}

}
