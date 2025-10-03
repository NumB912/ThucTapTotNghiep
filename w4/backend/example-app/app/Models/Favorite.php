<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;
    protected $table = 'favorite';
    public $incrementing = false;

    protected $primaryKey = 'id';

    protected $keyType = 'bigint';

    protected $fillable = [
        'id',
        'user_id',
        'event_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function event()
    {
        return $this->belongsTo(Event::class,'event_id');
    }
}
