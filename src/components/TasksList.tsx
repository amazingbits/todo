import React from 'react';
import { FlatList } from 'react-native';

import { ItemWrapper } from './ItemWrapper';
import { TaskItem, Task, TaskItemProps } from './TaskItem';

export interface TasksListProps extends TaskItemProps {
  tasks: Task[];
}

export function TasksList({ tasks, toggleTaskDone, removeTask, editTask }: TasksListProps) {

  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem
              index={index}
              task={item}
              toggleTaskDone={toggleTaskDone}
              editTask={editTask}
              removeTask={removeTask}
            />
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}