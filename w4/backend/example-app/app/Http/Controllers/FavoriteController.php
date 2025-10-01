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
        $favorites = Favorite::with(['event'])->where('user_id',$user->id)->get();
        return response()->json($favorites);
    }

    public function addFavorite(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'event_id' => 'required|exists:event,id',
        ]);

        $favorite = Favorite::create([
            'user_id' => $request->user_id,
            'event_id' => $request->event_id,
        ]);

        return response()->json([
            'message' => 'Favorite created successfully',
            'favorite' => $favorite
        ], 201);
    }

    public function show($id)
    {
        $favorite = Favorite::with(['user', 'event'])->findOrFail($id);
        return response()->json($favorite);
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
