var express = require('express');
var router = express.Router();
const {myArticle,getArticle,getOneArticle,createArticle,commentArticle,updateArticle,deleteArticle,deleteComment,categoryArticle} = require('../controllers/article-controller')
const {isLogin} = require('../middlewares/isLogin')
const images = require('../helpers/images')

router.post('/upload',
  images.multer.single('image'), 
  images.sendUploadToGCS,
  (req, res) => {
    res.send({
      status: 200,
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
})
router.get('/', getArticle)
router.get('/myarticle', isLogin, myArticle)
router.post('/create', isLogin, createArticle)
router.put('/update/:id', isLogin, updateArticle)
router.get('/category/:category', categoryArticle)
router.get('/article/:id', getOneArticle)
router.delete('/delete/:id', isLogin, deleteArticle)
router.put('/comment/delete/:id', isLogin, deleteComment)
router.put('/comment/:id', isLogin, commentArticle)

module.exports = router;