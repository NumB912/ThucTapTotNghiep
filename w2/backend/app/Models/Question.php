<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $table = 'Questions';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'title', 'content', 'audio', 'ansa', 'ansb', 'ansc', 'ansd',
        'ansRight', 'ansHint', 'mandatory', 'pos', 'status', 'topic_id'
    ];


    public function topic() {
        return $this->belongsTo(Topic::class, 'topic_id');
    }

    public function resultQuestions() {
        return $this->hasMany(ResultQuestion::class, 'questionID');
    }

    public function results() {
        return $this->belongsToMany(
            Result::class,
            'Result_Question',
            'questionID',
            'resultID'
        )->withPivot('ansUser');
    }
}

