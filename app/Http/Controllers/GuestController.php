<?php

namespace App\Http\Controllers;

use App\Models\Guest;
use Illuminate\Http\Request;

class GuestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $guests=Guest::with((['reservations', 'serviceRequests']))->get();
        return response()->json($guests);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data=$request->all();
        $guests=Guest::create($data);
        return response()->json($guests);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $guest=Guest::with(['reservations', 'serviceRequests'])->findOrfail($id);
        return response()->json($guest);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data=$request->all();
        $guest=Guest::findOrfail($id);
        $guest->update($data);
        return response()->json($guest);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $guest=Guest::findOrfail($id);
        $guest->delete();
        return response()->json(['message'=>'Guest deleted successfully']);
    }
}
