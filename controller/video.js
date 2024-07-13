const {VideoLesson} = require('../model/association');

const ITEMS_PER_PAGE = 10;

exports.getVideos = async (req, res, next) => {
    const page = req.query.page || 1;

    try {
        const totalVideos = await VideoLesson.count();
        const videos = await VideoLesson.findAll({
            offset: (page - 1) * ITEMS_PER_PAGE,
            limit: ITEMS_PER_PAGE
        });

        res.render('video/index', {
            videos,
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalVideos,
            hasPreviousPage: page > 1,
            nextPage: Number(page) + 1,
            previousPage: Number(page) - 1,
            lastPage: Math.ceil(totalVideos / ITEMS_PER_PAGE),
            pageTitle: 'Video Lessons'
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.getVideo = async (req, res, next) => {
    const videoId = req.params.id;

    try {
        const video = await VideoLesson.findByPk(videoId);
        if (!video) {
            return res.status(404).render('404', { message: 'Video not found', pageTitle: 'Error' });
        }

        res.render('video/show', { video, pageTitle: video.title });
    } catch (err) {
        console.error(err);
        next(err);
    }
};
