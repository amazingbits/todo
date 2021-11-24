import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

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

    const findTaskWithSameTitle = tasks.find(task => {
      return task.title.toLowerCase() === newTaskTitle.toLowerCase();
    });

    if (findTaskWithSameTitle) {
      return Alert.alert("Você não pode cadastrar uma task com o mesmo nome!");
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

  function removeTaskAlert(id: number) {
    Alert.alert("ATENÇÃO", "Tem certeza que você deseja remover este item?", [
      {
        text: "Sim",
        onPress: () => handleRemoveTask(id)
      },
      {
        text: "Não",
        onPress: () => { }
      }
    ])
  }

  function handleRemoveTask(id: number) {
    const filteredTask = tasks.filter(task => {
      return task.id !== id;
    });
    setTasks(filteredTask);
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) task.title = taskNewTitle;
      return task;
    });
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={removeTaskAlert}
        editTask={handleEditTask}
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