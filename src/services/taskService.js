import { supabase } from '../lib/supabase'

export const taskService = {
    async createTask(text) {
    console.log("Creating task in Doozy:", text); // Debug log
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ 
        text: text,
        completed: false 
      }])
      .select()
      .single();
    
    if (error) {
      console.error("Supabase error:", error); // Log Supabase error
      throw error;
    }
    
    console.log("Task created in Doozy:", data); // Debug log
    return data;
  },

  async getTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching tasks:', error)
      throw error
    }
    return data
  },

  async updateTask(id, updates) {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating task:', error)
      throw error
    }
    return data
  },

  async deleteTask(id) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting task:', error)
      throw error
    }
    return { message: 'Task deleted' }
  },

  subscribeToTasks(callback) {
    return supabase
      .channel('tasks')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'tasks' }, 
        callback
      )
      .subscribe()
  }
}