<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::with([ 'location','details','details.images','people'])->get();

        if ($events->isEmpty()) {
            return response()->json([
                "message" => "Không tìm thấy dữ liệu vui lòng thử lại"
            ], 404);
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
        'start_day' => 'required|date',
        'end_day' => 'nullable|date',
        'location_id' => 'nullable|integer',   
        'parent_id' => 'nullable|integer',   
        'img_id' => 'nullable|integer',      
    ]);

        return Event::create($data);
    }

    public function show($id)
    {
        return Event::with(['details','location','people'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);
        $event->update($request->all());
        return $event;
    }

    public function getEventWithDays($date)
    {
        if(!$date){
            return response()->json([
                "message" => "Không có dữ liệu ngày!!!"
            ], 400);
        }

        $carbon = Carbon::parse($date);

        $events = Event::with('location','people')->whereDay('start_day', $carbon->day)
            ->whereMonth('start_day', $carbon->month)
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

        $events = Event::whereMonth('start_day', $carbon->month)
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
