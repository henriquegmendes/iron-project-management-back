const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  project: { type: mongoose.Types.ObjectId, ref: 'Project', required: true },
},
{
  timestamps: true,
});

const Tasks = mongoose.model('Task', taskSchema);

module.exports = Tasks;