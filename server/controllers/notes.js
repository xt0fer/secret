const Note = require('../models/Note')

/**
 * Determines if a note exists, consumed by the frontend before the decryption process.
 * Returns a 200 if a note has been found or 404 if it's deleted or non-existent
 *
 * @param {String} req.params.id ObjectID of the note
 */
module.exports.get = (req, res, next) =>
  Note.findById(req.params.id).then(note => res.sendStatus(note ? 200 : 404))

/**
 * Stores a note
 *
 * @param {Object} req.body the JSON decoded body of the request, contains the body of the note
 */
module.exports.post = ({ body }, res, next) =>
  Note.create(body).then(note => res.send({ note }))

/**
 * Deletes a note and returns its contents, this route is hit once the users confirm
 * they want to view the note
 *
 * @param {*} req.params.id ObjectID of the note
 */
module.exports.delete = (req, res, next) =>
  Note.findByIdAndRemove(req.params.id).then(
    note => (note ? res.send({ note }) : res.sendStatus(404))
  )
