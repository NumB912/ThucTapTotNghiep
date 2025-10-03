<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['errors' => 'message'], 422);
        }

        $events = Favorite::with(['event.image'])
            ->where('user_id', $user->id)
            ->get()
            ->pluck('event');

        return response()->json($events);
    }
    public function addFavorite(Request $request)
    {
        $request->validate([
            'event_id' => 'required|exists:event,id',
        ]);

        $userId = auth()->id();

        $favorite = Favorite::firstOrCreate([
            'user_id' => $userId,
            'event_id' => $request->event_id,
        ]);

        $message = $favorite->wasRecentlyCreated
            ? 'Favorite created successfully'
            : 'Favorite already exists';

        return response()->json([
            'message' => $message,
            'favorite' => $favorite
        ], 201);
    }


    public function show($id)
    {
        $user = Auth::user();
        $exists = Favorite::where('user_id', $user->id)
            ->where('event_id', $id)
            ->exists();

        return response()->json([
            'event_id' => $id,
            'favorite' => $exists
        ]);
    }
    public function remove(Request $request)
    {
        $user = Auth::user();

        Favorite::where('user_id', $user->id)
            ->where('event_id', $request->event_id)
            ->delete();

        return response()->json([
            'message' => 'Favorite removed successfully'
        ]);
    }

    public function destroy($id)
    {
        $favorite = Favorite::findOrFail($id);
        $favorite->delete();

        return response()->json([
            'message' => 'Favorite deleted successfully'
        ]);
    }
}
