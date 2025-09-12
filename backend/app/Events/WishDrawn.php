<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class WishDrawn implements ShouldBroadcast
{
    use SerializesModels;

    public $wish;

    public function __construct($wish)
    {
        $this->wish = $wish;
    }

    public function broadcastOn()
    {
         return new Channel('wishes');
    }

    public function broadcastAs()
    {
        return 'WishDrawn';
    }
}
