import React, { useEffect, useState } from 'react';
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  Paper, TableContainer, IconButton, Box, Typography, Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import type { Course } from '../models/Course';

import type { assignments } from '../models/Student';

const courselist: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('courses') || '[]');
    setCourses(stored);
  }, []);

  const Handle_Edit = (code: string) => {
    navigate(`/courses/edit/${code}`);
  };

  const handleDelete = (code: string) => {
    const updated = courses.filter(c => c.courseCode !== code);
    localStorage.setItem('courses', JSON.stringify(updated));
    setCourses(updated);
  };

  return (
    <Box sx={{ mt: 4, mx: 'auto', maxWidth: 800 }}>
      <Box className="CourseListHeader" display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">course list</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Credits</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Assignments</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map(course => (
              <TableRow key={course.courseCode}>
                <TableCell>{course.courseCode}</TableCell>
                <TableCell>{course.courseName}</TableCell>
                <TableCell>{course.credits}</TableCell>
                <TableCell>{course.semester}</TableCell>
                <TableCell>{course.assignments.join(', ')}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => Handle_Edit(course.courseCode)}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDelete(course.courseCode)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {courses.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  no Courses Found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button
          variant="contained"
          onClick={() => navigate('/courses/new')}>
          Add Course
        </Button>
      </Box>
    </Box>
  );
};

export default courselist;