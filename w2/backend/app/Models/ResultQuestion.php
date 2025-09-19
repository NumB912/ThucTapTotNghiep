<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResultQuestion extends Model
{
    use HasFactory;

    protected $table = 'Result_Question';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'questionID', 'resultID', 'ansUser'
    ];

    public function result() {
        return $this->belongsTo(Result::class, 'resultID');
    }

    public function question() {
        return $this->belongsTo(Question::class, 'questionID');
    }
}
