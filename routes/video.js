const express = require('express');
const route = express.Router();
const videoController = require('../controller/video');

// عرض الفيديوهات مع pagination
route.get('/videos', videoController.getVideos);

// عرض صفحة الفيديو الفردية
route.get('/video/:id', videoController.getVideo);

module.exports = route;
