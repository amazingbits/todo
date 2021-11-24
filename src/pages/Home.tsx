import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    let id = 0;
    if (tasks.length > 0) {
      tasks.forEach(task => {
        if (task.id > id) id = task.id;
      });
    }
    const task = {
      id: id + 1,
      title: newTaskTitle,
      done: false
    }

    setTasks([...tasks, task]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) task.done = !task.done;
      return task;
    });
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    const filteredTask = tasks.filter(task => {
      return task.id !== id;
    });
    setTasks(filteredTask);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})