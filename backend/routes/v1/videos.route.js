const router = require('express').Router();
const {videoController} = require('../../controller');



router.get('/', videoController.getAllVideos );
router.get('/:videoid' , videoController.getVideoById);
router.post('/', videoController.addVideo);
router.patch('/:videoid/votes', videoController.videoVoteUpdate);
router.patch('/:videoid/views', videoController.videoViewsUpdate);


module.exports = router;