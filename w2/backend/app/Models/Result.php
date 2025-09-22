<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;

    protected $table = 'results';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'userid', 'score', 'submitted_at', 'start_at', 'end_at', 'duration', 'status', 'ispass', 'question_quantity'
    ];

      protected $casts = [
        'ispass' => 'boolean', 
    ];


    public function user() {
        return $this->belongsTo(User::class, 'userid');
    }

    public function resultQuestions() {
        return $this->hasMany(ResultQuestion::class, 'resultid');
    }

    public function questions() {
        return $this->belongsToMany(
            Question::class,
            'results_questions',
            'resultid',
            'questionid'
        )->withPivot('ansuser');
    }
}
