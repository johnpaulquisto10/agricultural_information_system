<?php

namespace Database\Seeders;

use App\Models\Announcement;
use Illuminate\Database\Seeder;

class AnnouncementSeeder extends Seeder
{
    public function run()
    {
        Announcement::create([
            'title' => 'Welcome to Agricultural Information System',
            'content' => 'We are excited to launch our new platform dedicated to supporting agricultural development in our community.',
            'category' => 'General',
            'status' => 'published',
            'published_at' => now(),
        ]);

        Announcement::create([
            'title' => 'New Farming Techniques Workshop',
            'content' => 'Join us for a workshop on modern farming techniques this weekend. Learn about sustainable practices and efficient crop management.',
            'category' => 'Workshop',
            'status' => 'published',
            'published_at' => now(),
            'expires_at' => now()->addDays(7),
        ]);

        Announcement::create([
            'title' => 'Seasonal Crop Planning Guide',
            'content' => 'Get ready for the upcoming planting season with our comprehensive crop planning guide.',
            'category' => 'Guide',
            'status' => 'published',
            'published_at' => now(),
        ]);
    }
}