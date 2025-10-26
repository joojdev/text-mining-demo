import type { Response } from 'express'
import multer from 'multer'
import crypto from 'crypto'

export function badRequest(response: Response, obj: any) {
  response.status(400).json(obj)
}

export function created(response: Response, obj: any) {
  response.status(201).json(obj)
}

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, 'uploads/')
  },
  filename: (request, file, callback) => {
    const fileExtension = file.originalname.split('.').pop()

    const newFileName = crypto.randomBytes(64).toString('hex')

    callback(null, `${newFileName}.${fileExtension}`)
  },
})

export const upload = multer({
  storage,
  fileFilter: (request, file, callback) => {
    if (file.mimetype === 'application/pdf') {
      callback(null, true)
    } else {
      callback(null, false)
    }
  },
})
