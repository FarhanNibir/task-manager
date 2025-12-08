<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Services\TaskService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    private TaskService $service;

    public function __construct(TaskService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     */
     public function index(Request $request)
    {
        $tasks = $this->service->list($request->user()->id);
        return TaskResource::collection($tasks);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $task = $this->service->create(
            $request->validated(),
            $request->user()->id
        );

        return new TaskResource($task);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $task = Task::findOrFail($id);
        abort_if($task->user_id !== Auth::id(), 403);

        return new TaskResource($task);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        abort_if($task->user_id !== Auth::id(), 403);

        $updated = $this->service->update($task, $request->validated());
        return new TaskResource($updated);
    }

    /**
     * Remove the specified resource from storage.
     */
      public function destroy(Task $task)
    {
        abort_if($task->user_id !== Auth::id(), 403);

        $this->service->delete($task);
        return response()->json(['message' => 'Task deleted']);
    }
}
