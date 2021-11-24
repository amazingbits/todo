import React, { useState, useRef, useEffect } from "react";
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import penIcon from "../assets/icons/pen/pen.png";
import xIcon from "../assets/icons/x/x.png";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export interface TaskItemProps {
  index: number;
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, title: string) => void;
}

export function TaskItem({
  index,
  task,
  toggleTaskDone,
  removeTask,
  editTask
}: TaskItemProps) {

  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setEditedTask(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask(task.id, editedTask);
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            value={editedTask}
            onChangeText={setEditedTask}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />

        </TouchableOpacity>
      </View>

      <View>
        {isEditing && (
          <TouchableOpacity
            style={{ paddingHorizontal: 24 }}
            onPress={handleCancelEditing}
          >
            <Image source={xIcon} />
          </TouchableOpacity>
        )}

        {!isEditing && (
          <TouchableOpacity
            style={{ paddingHorizontal: 24 }}
            onPress={handleStartEditing}
          >
            <Image source={penIcon} />
          </TouchableOpacity>
        )}
      </View>

      <View style={{ width: 1, height: 24, backgroundColor: 'rgba(196,196,196,0.24)' }} />

      <TouchableOpacity
        testID={`trash-${index}`}
        style={{ paddingHorizontal: 24, opacity: isEditing ? 0.2 : 1 }}
        onPress={() => removeTask(Number(task.id))}
        disabled={isEditing ? true : false}
      >
        <Image source={trashIcon} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})