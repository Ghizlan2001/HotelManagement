<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $room=Room::with(['reservations', 'roomMaintenance', 'roomType'])->get();
        return response()->json($room);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $validatedData = $request->validate([
            'room_number' => 'required|string',
            'max_occupancy' => 'required|integer',
            'room_type_id' => 'required|integer', // Ensure this matches your schema
            'price_per_night' => 'required|numeric',
            'room_status' => 'required|string',
            'description' => 'required|string',
        ]);

        $room = Room::create($validatedData);

        return response()->json($room, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $room = Room::with(['reservations', 'roomMaintenance'])->findOrFail($id);
        return response()->json($room);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data=$request->all();
        $room = Room::findOrFail($id);
        $room->update($data);
        return response()->json($room);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $room = Room::findOrFail($id);
        $room->delete();
        return response()->json(['message' => 'Room deleted successfully']);
    }
}
