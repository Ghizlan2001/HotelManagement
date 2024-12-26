<?php

namespace App\Http\Controllers;

use App\Models\ServiceRequest;
use Illuminate\Http\Request;

class ServiceRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $serviceRequests = ServiceRequest::with(['guest', 'service']);
        return response()->json($serviceRequests);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data=$request->all();
        $serviceRequest = ServiceRequest::create($data);
        return response()->json($serviceRequest);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $serviceRequest = ServiceRequest::with(['guest', 'service'])->findOrFail($id);
        return response()->json($serviceRequest);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data=$request->all();
        $serviceRequest = ServiceRequest::findOrFail($id);
        $serviceRequest->update($data);
        return response()->json($serviceRequest);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $serviceRequest = ServiceRequest::findOrFail($id);
        $serviceRequest->delete();
    }
}
