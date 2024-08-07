import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const TodoScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');

  const addTodo = () => {
    if (title && description) {
      const newTodo = {
        id: Date.now().toString(),
        title,
        description,
        status: 'active',
      };
      setTodos([...todos, newTodo]);
      setTitle('');
      setDescription('');
    }
  };

  const filterTodos = () => {
    if (filter === 'All') return todos;
    return todos.filter(todo => todo.status === filter.toLowerCase());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TODO APP</Text>
      
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Add Todo</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.divider} />

      <View style={styles.filterContainer}>
        {['All', 'Active', 'Done'].map(status => (
          <TouchableOpacity
            key={status}
            style={[styles.filterButton, filter === status && styles.filterButtonActive]}
            onPress={() => setFilter(status)}
          >
            <Text style={styles.filterButtonText}>{status}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filterTodos()}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoTitle}>{item.title}</Text>
            <Text style={styles.todoDescription}>{item.description}</Text>
            <Text style={styles.todoStatus}>{item.status}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#343a40',
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#dee2e6',
    marginVertical: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e9ecef',
  },
  filterButtonActive: {
    backgroundColor: '#007bff',
  },
  filterButtonText: {
    color: '#495057',
    fontSize: 16,
  },
  todoItem: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    borderColor: '#ced4da',
    borderWidth: 1,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
  },
  todoDescription: {
    fontSize: 16,
    color: '#495057',
    marginVertical: 5,
  },
  todoStatus: {
    fontSize: 14,
    color: '#6c757d',
  },
});

export default TodoScreen;
