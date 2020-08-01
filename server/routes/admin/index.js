const AdminUser = require('../../models/AdminUser')

module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../../models/AdminUser')
  const router = express.Router({
    mergeParams: true
  })
  // const Category = require('../../models/Category')

  // 新增分类
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  // 获取分类列表
  router.get('/', async (req, res) => {
    let queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })

  // 获取对应分类信息
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  // 更改分类
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    // 通过id找，然后把对应id的内容更新
    res.send(model)
  })

  // 删除分类
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })

  // 登陆校验中间件
  const authMiddleware = require('../../middleware/auth')

  const resourceMiddleware = require('../../middleware/resource')

  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)


  // 新增英雄
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })

  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 1. 根据用户名找用户
    const user = await AdminUser.findOne({
      username: username
    }).select('+password')
    assert(user, 422, '用户不存在')
    // if (!user) {
    //   return res.status(422).send({
    //     message: '用户不存在'
    //   })
    // }

    // 2. 校验密码
    const isValid = require('bcryptjs').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    // if (!isValid) {
    //   return res.status(422).send({
    //     message: '密码错误'
    //   })
    // }

    // 3. 返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token })
  })

  // 错误处理()捕获异常后处理
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}

