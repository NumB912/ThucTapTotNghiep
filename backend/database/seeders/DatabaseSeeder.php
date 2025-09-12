<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Gọi Seeder chèn 100 câu wish
        $this->call(WishesTableSeeder::class);
    }
}
