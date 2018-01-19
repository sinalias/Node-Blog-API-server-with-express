const express = require('express') 
const logger = require('morgan')
const errorhandler = require('errorhandler')
let app = express()

let store = {}

/*let store = {
    posts: [
      {name: 'Top 10 ES6 Features every Web Developer must know',
      url: 'https://webapplog.com/es6',
      text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
      comments: [
        text: 'Cruel…..var { house, mouse} = No type optimization at all',
        text: 'I think you’re undervaluing the benefit of ‘let’ and ‘const’.',
        text: '(p1,p2)=>{ … } ,i understand this ,thank you !'      
      ]
      }
    ]
}*/

store.posts = []
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())

app.get('/posts', (req, res) => {
  res.status(200).send(store.posts)
})

app.post('/posts', (req, res) => {
  let newPost = req.body
  let id = store.posts.length
  store.posts.push(newPost)
  res.status(201).send({id: id})
})

app.put('/posts/:id', (req, res) => {
  store.posts[req.params.id] = req.body
  res.status(200).send(store.posts[req.params.id])

})

app.delete('/posts/:id', (req, res) => {
  store.posts.splice(req.params.id, 1)
  res.status(204).send()
})

app.get('/posts/:postId/comments', (req, res) => {
    res.status(200).send(store.posts[req.params.postId].comments)
  })
  
app.post('/posts/:postId/comments', (req, res) => {
    let newPostComment = req.body
    let id = store.posts[req.params.postId].comments.length
    store.posts[req.params.postId].comments.push(newPostComment)
    res.status(201).send({idComment: id})
  })
  
app.put('/posts/:postId/comments/:commentId', (req, res) => {
    store.posts[req.params.postId].comments[req.params.commentId] = req.body
    res.status(200).send(store.posts[req.params.postId].comments[req.params.commentId])
  })
  
app.delete('/posts/:postId/comments/:commentId', (req, res) => {
    store.posts[req.params.postId].comments.splice(req.params.commentId, 1)
    res.status(204).send()
  })

app.listen(3000)