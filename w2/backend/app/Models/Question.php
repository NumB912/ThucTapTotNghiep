<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $table = 'questions';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'title', 'content', 'audio', 'ansa', 'ansb', 'ansc', 'ansd',
        'ansright', 'anshint', 'mandatory', 'pos', 'status', 'topic_id'
    ];


    public function topic() {
        return $this->belongsTo(Topic::class, 'topic_id');
    }

    public function resultQuestions() {
        return $this->hasMany(ResultQuestion::class, 'questionid');
    }

    public function results() {
        return $this->belongsToMany(
            Result::class,
            'results_questions',
            'questionid',
            'resultid'
        )->withPivot('ansuser');
    }
}

