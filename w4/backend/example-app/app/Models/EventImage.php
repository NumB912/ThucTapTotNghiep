<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventImage extends Model
{
    use HasFactory;

    protected $table = 'event_image';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'img',
        'event_detail_id'
    ];

    public function detail()
    {
        return $this->belongsTo(EventDetail::class, 'event_detail_id', 'id');
    }
}
