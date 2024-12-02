// api.js
export const fetchStudentList = async () => {
    // Mock API call
    return [
      { user_id: 1, username: 'student1', email: 'student1@example.com' },
      { user_id: 2, username: 'student2', email: 'student2@example.com' },
      // More student data
    ];
  };
  
  export const fetchInstructorList = async () => {
    // Mock API call
    return [
      { user_id: 1, username: 'instructor1', email: 'instructor1@example.com' },
      { user_id: 2, username: 'instructor2', email: 'instructor2@example.com' },
      // More instructor data
    ];
  };
  