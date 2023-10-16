const {Router} = require('express')
const route = Router()


const { renderNotesForm, 
        createNewNote, 
        renderNotes, 
        renderEditForm, 
        renderEditFormUpdate, 
        renderEditFormDelete } = require('../controllers/notes.controllers.js')

        const {isAuthenticated} = require('../helpers/validateauth.js')
// New Notes

route.get('/note/add',() => isAuthenticated, renderNotesForm)

route.post('/note/new-note',() => isAuthenticated, createNewNote)  




// Get all Notes
route.get('/note',() => isAuthenticated, renderNotes )

//Edit Notes
route.get('/note/edit/:id',() => isAuthenticated, renderEditForm)

route.put('/note/edit/:id',() => isAuthenticated, renderEditFormUpdate)

// Delete Notes
route.delete('/note/delete/:id',() => isAuthenticated, renderEditFormDelete)


module.exports = route
