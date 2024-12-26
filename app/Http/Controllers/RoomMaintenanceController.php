<?php

namespace App\Http\Controllers;

use App\Models\RoomMaintenance;
use Illuminate\Http\Request;

class RoomMaintenanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roomMaintenances = RoomMaintenance::all();
        return response()->json($roomMaintenances);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data=$request->all();
        $roomMaintenance = RoomMaintenance::create($data);
        return response()->json($roomMaintenance);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $roomMaintenance = RoomMaintenance::with('room')->findOrFail($id);
        return response()->json($roomMaintenance);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data=$request->all();
        $roomMaintenance = RoomMaintenance::findOrFail($id);
        $roomMaintenance->update($data);
        return response()->json($roomMaintenance);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $roomMaintenance = RoomMaintenance::findOrFail($id);
        $roomMaintenance->delete();
        return response()->json(['message' => 'Room Maintenance deleted successfully']);
    }
}
