<?php

namespace App\Http\Controllers;

use App\Models\EventImage;
use Illuminate\Http\Request;

class EventImageController extends Controller
{
    public function index()
    {
        return EventImage::with('detail.event')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'event_detail_id' => 'required|exists:event_detail,id',
            'img' => 'required|string|max:255',
        ]);

        return EventImage::create($data);
    }

    public function show($id)
    {
        return EventImage::with('detail.event')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $image = EventImage::findOrFail($id);
        $image->update($request->all());
        return $image;
    }

    public function destroy($id)
    {
        $image = EventImage::findOrFail($id);
        $image->delete();
        return response()->json(['message' => 'Image deleted']);
    }
}
