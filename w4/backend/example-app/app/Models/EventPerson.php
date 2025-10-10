<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventPerson extends Model
{
    use HasFactory;

    protected $table = 'event_person';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'event_id',
        'person_id',
    ];

    
    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id');
    }

    public function person()
    {
        return $this->belongsTo(Person::class, 'person_id');
    }
}
