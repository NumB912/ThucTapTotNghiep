<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResultQuestion extends Model
{
    use HasFactory;

    protected $table = 'results_questions';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'questionid', 'resultid', 'ansuser'
    ];

    public function result() {
        return $this->belongsTo(Result::class, 'resultid');
    }

    public function question() {
        return $this->belongsTo(Question::class, 'questionid');
    }
}
