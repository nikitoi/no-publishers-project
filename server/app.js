import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import studentsRouter from './routes/students.js'

const app = express()

mongoose.connect('mongodb://localhost:27017/StudentsDB', { useNewUrlParser: true, useUnifiedTopology: true })

const Student = mongoose.model('Student', {
  name: { type: String, trim: true },
  age: Number,
  edit: Boolean,
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use('/students', studentsRouter)

export { app, Student }
