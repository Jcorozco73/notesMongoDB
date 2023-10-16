const notesControllers = {}

 require('../models/Notes.js')
 const Notes = require('../models/Notes.js')


notesControllers.renderNotesForm = (req, res) => {

    res.render('note/new-note')
}


notesControllers.createNewNote = async (req, res) => {
   const{title, description} = req.body
    const newNote = new Notes({
        title,
        description
    })
    await newNote.save()
    req.flash(
        'success_msg',
        'Note Added Successfully'
    )
    res.redirect('/note')
}

notesControllers.renderNotes = async (req, res) => {
      const note = await Notes.find({}).lean()
      res.render('note/all-note', {note})
  
}

notesControllers.renderEditForm = async (req, res) => {
    //res.send('editando')
    const notes = await Notes.findById(req.params.id).lean()
   
    res.render('note/edit-note', {notes})
}

notesControllers.renderEditFormUpdate = async (req, res) => {
    
    const {
        title,
        description
    } = req.body
    await Notes.findByIdAndUpdate(req.params.id, {
        title,
        description
    })
    req.flash(
        'success_msg',
        'Note Updated Successfully'
    )
    res.redirect('/note')
}

notesControllers.renderEditFormDelete = async (req, res) => {
   await Notes.findByIdAndDelete(req.params.id)
    req.flash(
     'success_msg',
     'Note Deleted Successfully')
   res.redirect('/note')
    
}

module.exports = notesControllers