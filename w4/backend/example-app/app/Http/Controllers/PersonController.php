<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Person;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PersonController extends Controller
{
    public function index()
    {
        return response()->json(Person::all());
    }

    public function show($id)
    {
        if (!$id) {
            return response()->json([
                "message" => "Không tồn tại"
            ], 404);
        }

        $person = Person::findOrFail($id);

        return response()->json([
            "person" => $person
        ], 200);
    }


    public function store(Request $request)
    {
        $person = Person::create($request->all());
        return response()->json($person, 201);
    }


    public function update(Request $request, $id)
    {
        $person = Person::find($id);
        if (!$person) {
            return response()->json(["message" => "Không tìm thấy người dùng"], 404);
        }
        $person->update($request->all());
        return response()->json($person, 200);
    }

    public function destroy($id)
    {
        $person = Person::find($id);
        if (!$person) {
            return response()->json(["message" => "Không tìm thấy người dùng"], 404);
        }
        $person->delete();
        return response()->json(["message" => "Đã xóa thành công"], 200);
    }

    public function getPersonWithDay($date)
    {
        if (!$date) {
            return response()->json([
                "message" => "Không có dữ liệu ngày!!!"
            ], 400);
        }

        try {
            $carbon = Carbon::parse($date);
        } catch (\Exception $e) {
            return response()->json([
                "message" => "Ngày không hợp lệ!"
            ], 400);
        }

        $people = Person::where(function ($q) use ($carbon) {
            $q->whereDay('DOB', $carbon->day)
                ->whereMonth('DOB', $carbon->month);
        })
            ->orWhere(function ($q) use ($carbon) {
                $q->whereDay('DOD', $carbon->day)
                    ->whereMonth('DOD', $carbon->month);
            })
            ->get();

        if ($people->isEmpty()) {
            return response()->json([
                "message" => "Không có nhân vật nào sinh trong ngày này!!!"
            ], 404);
        }

        return response()->json([
            "people" => $people
        ], 200);
    }

    public function getPeopleWithMonth($date)
    {
        $carbon = Carbon::parse($date);

        $people = Person::whereMonth('DOB', $carbon->month)
            ->orWhereMonth('DOD', $carbon->month)
            ->get();

        if ($people->isEmpty()) {
            return response()->json([
                "message" => "Không có sự kiện trong tháng bạn muốn!!!"
            ], 404);
        }

        return response()->json([
            "people" => $people
        ], 200);
    }
}
