<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
// Quan trọng: import Authenticatable
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'User';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'userName',
        'password',
        'name',
        'email',
        'createAt',
        'updateAt'
    ];

    public function results()
    {
        return $this->hasMany(Result::class, 'userID');
    }

    protected $hidden = ['password'];
}
