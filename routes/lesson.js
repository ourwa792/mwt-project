const express = require('express');
const route = express.Router();

const lessonController = require('../controller/lesson')
const {protectedRoute, guestRout} = require('../middleware/authMiddleWare')

route.get('/', lessonController.getIndex)

route.get('/lesson/:id', lessonController.getLessonById )

route.get('/lesson/:id/rate', protectedRoute, lessonController.getLessonRate)

route.post('/api/lesson/:id/rate', lessonController.postLessonRate)

module.exports = route