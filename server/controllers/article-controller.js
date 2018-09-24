const Article = require("../models/article")
const User = require("../models/user")
const jwt = require('jsonwebtoken')

module.exports = {

  createArticle: function (req, res) {
    let token = req.headers.token
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)


    User.findOne({email: req.user.email})
    .then((result) => {

      if (result) {

        Article.create({
          articleTitle: req.body.articleTitle,
          image: req.body.image,
          article: req.body.article,
          category: req.body.category,
          userId: decode.id
        })
          .then(result => {
            res.status(200).json({

              message: "article successfully created",
              result

            });
          })
          .catch(err => {

            res.status(400).json({
              message: err.message
            });
            
          });

      } else {

        res.status(400).json({
          message: `your not authorized !`
        });

      }

    }).catch((err) => {

      res.status(400).json({
        message: err.message
      });

    });
  },

  deleteArticle: function (req, res) {

    let id = req.params.id;
    Article.deleteOne({ _id: id })
      .then((result) => {
        res.status(200).json({
          message: "article successfully deleted",
          result
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  },

 myArticle: function (req, res) {
    let token = req.headers.token
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

    User.findOne({email: req.user.email})
    .sort({ updatedAt: 1 })
    .then((result) => {

      if (result) {

        Article.find({userId: decode.id})
          .populate("userId")
          .then(result => {

            res.status(200).json({
              message: "data my article",
              result
            });

          })
          .catch(err => {

            res.status(400).json({
              message: err.message
            });

          });

      } else {

        res.status(400).json({
          message: `your not authorized !`
        });

      }

    })
    .catch((err) => {

      res.status(400).json({
        message: err.message
      });

    });
  },

  categoryArticle: function (req, res) {

    if (req.params.category == 'All') {
      Article.find({})
      .populate("userId")
      .then(result => {

        res.status(200).json({
          message: "data my article",
          result
        });

      })
      .catch(err => {

        res.status(400).json({
          message: err.message
        });

      })
    } else {

      Article.find({category: req.params.category})
        .populate("userId")
        .then(result => {
  
          res.status(200).json({
            message: "data category article",
            result
          });
  
        })
        .catch(err => {
  
          res.status(400).json({
            message: err.message
          });
  
        })
    }

  },

 getArticle: function (req, res) {
    Article.find({})
      .populate("userId")
      .then(result => {
        res.status(200).json({
          message: "data all article",
          result
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  },

  getOneArticle: function (req, res) {
    let id = req.params.id
    Article.findOne({_id: id})
      .populate("userId")
      .then(articles => {
        res.status(200).json({
          message: "data article",
          articles
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  },

 updateArticle: function(req, res) {
   let id = req.params.id;
    
    Article.findOne({_id: id})
    .then((result) => {
      if (result.userId.toLocaleString() == req.user._id.toLocaleString()) {
        Article.updateOne(
          { _id: id },
          {
            $set: {
              articleTitle: req.body.articleTitle,
              image: req.body.image,
              article: req.body.article,
              category: req.body.category,
            }
          }
        )
          .then(result => {
            res.status(200).json({
              message: "article successfully update",
              result
            });
          })
          .catch(err => {
            res.status(400).json({
              message: err.message
            });
          });

      } else {

        res.status(400).json({
          message: `your not authorized !`
        });

      }

    })
    .catch((err) => {

      res.status(400).json({
        message: err.message
      });

    });
   
  },

  commentArticle: function (req, res) {
    let id = req.params.id
    let token = req.headers.token
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

    Article.findOne({_id: id})
    .then((result) => {

      if (result) {

        Article.updateOne(
          {_id: id},
          {
            $push: {
              comments: { 
                comment: req.body.comment,
                date: new Date(),
                viewer: decode.username
              }
            }
          }
        )
        .then(result => {

          res.status(200).json({
            message: "comment successfully update",
            result
          });

        })
        .catch(err => {

          res.status(400).json({
            message: err.message
          });

        });

      } else {

        res.status(400).json({
          message: `your not authorized !`
        });

      }
      
    })
    .catch((err) => {

      res.status(400).json({
            message: err.message
          });

    });
  },

  deleteComment: function (req, res) {
    let idArticle = req.params.id;
    let idComment = req.body.idComment
    
    Article.findOne({_id: idArticle})
    .then((result) => {
      
      if (result) {
          Article.updateOne(
            {_id: idArticle},
            {
              $pull: {
                comments: { 
                  _id: idComment
                }
              }
            }
          )
          .then(result => {

            res.status(200).json({
              message: "comment successfully deleted",
              result
            });

          })
          .catch(err => {

            res.status(400).json({
              message: err.message
            });

          });
      } else {

        res.status(400).json({
          message: `your not authorized !`
        });

      }
      
    })
    .catch((err) => {
      
      res.status(400).json({
        message: err.message
      });

    });
   
  }

}
