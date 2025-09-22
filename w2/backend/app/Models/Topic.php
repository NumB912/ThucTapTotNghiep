<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    use HasFactory;

    protected $table = 'topics';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = [
        'title',
        'description',
        'featureimg',
        'parent',
        'pos',
        'status',
    ];

    public function questions()
    {
        return $this->hasMany(Question::class, 'topic_id');
    }

    public function parentTopic()
    {
        return $this->belongsTo(Topic::class, 'parent');
    }

    public function childTopics()
    {
        return $this->hasMany(Topic::class, 'parent');
    }
}
