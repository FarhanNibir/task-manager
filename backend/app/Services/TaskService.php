<?php

namespace App\Services;

use App\Models\Task;

class TaskService
{
    public function list($userId)
    {
        return Task::where('user_id', $userId)->latest()->get();
    }

    public function create(array $data, $userId)
    {
        return Task::create([
            'user_id' => $userId,
            ...$data
        ]);
    }

    public function update(Task $task, array $data)
    {
        $task->update($data);
        return $task;
    }

    public function delete(Task $task)
    {
        return $task->delete();
    }
}
