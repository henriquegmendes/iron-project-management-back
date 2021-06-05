const express = require('express');

const tasksController = require('../../controller/tasks.controller');

const router = express();

router.post('/', tasksController.createOne);

module.exports = router;