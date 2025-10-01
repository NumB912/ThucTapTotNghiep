<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::get();
        if (!$events) {
            return response()->json(["message", "Không tìm thấy dữ liệu vui lòng thử lại"], 404);
        }
        return response()->json([
            "events" => $events
        ], 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'day' => 'required|date',
            'region' => 'nullable|string',
            'img' => 'nullable|string',
            'to_day' => 'nullable|date',
        ]);

        return Event::create($data);
    }

    public function show($id)
    {
        return Event::with('details')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);
        $event->update($request->all());
        return $event;
    }

    public function getEventWithDays($date)
    {
        $carbon = Carbon::parse($date);

        $events = Event::whereDay('day', $carbon->day)
               ->whereMonth('day', $carbon->month)
               ->get();

        if ($events->isEmpty()) {
            return response()->json([
                "message" => "Không có sự kiện theo ngày bạn muốn!!!"
            ], 404);
        }

        return response()->json([
            "events" => $events
        ], 200);
    }

    public function getEventWithMonth($date)
    {
        $carbon = Carbon::parse($date);

        $events = Event::whereMonth('day', $carbon->month)
               ->get();

        if ($events->isEmpty()) {
            return response()->json([
                "message" => "Không có sự kiện theo ngày bạn muốn!!!"
            ], 404);
        }

        return response()->json([
            "events" => $events
        ], 200);
    }

    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();
        return response()->json(['message' => 'Event deleted']);
    }
}
