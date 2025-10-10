<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    use HasFactory;
    protected $table = 'person';


    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'int';

    public $timestamps = false;

    protected $fillable = [
        'id',
        'name',
        'content',
        'DOB',
        'DOD',
        'image_url',
    ];
     protected $dates = ['DOB', 'DOD'];

    public function events()
    {
        return $this->belongsToMany(Event::class, 'event_person', 'person_id', 'event_id');
    }
}
