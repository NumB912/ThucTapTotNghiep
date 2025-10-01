<?php

namespace App\Http\Controllers;

use App\Models\EventDetail;
use Illuminate\Http\Request;

class EventDetailController extends Controller
{
    public function index()
    {
        return EventDetail::with('event','images')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'event_id' => 'required|exists:event,id',
            'type' => 'required|string|max:50',
            'content' => 'nullable|string',
        ]);

        return EventDetail::create($data);
    }

    public function show($id)
    {
        return EventDetail::with('event','images')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $detail = EventDetail::findOrFail($id);
        $detail->update($request->all());
        return $detail;
    }

    public function destroy($id)
    {
        $detail = EventDetail::findOrFail($id);
        $detail->delete();
        return response()->json(['message' => 'Detail deleted']);
    }
}
