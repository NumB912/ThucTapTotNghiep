<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;

    protected $table = 'Results';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'userID', 'score', 'submitted_at', 'startAt', 'endAt', 'Duration', 'status','isPass'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'userID');
    }
    public function resultQuestions() {
        return $this->hasMany(ResultQuestion::class, 'resultID');
    }
    public function questions() {
        return $this->belongsToMany(
            Question::class,
            'Result_Question',
            'resultID',
            'questionID'
        )->withPivot('ansUser');
    }
}

