import Note from '../models/notemodels.js';
export  async function getallnotes(req, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }); // Sort by creation date, newest first
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getallnotes:", error);
        res.status(500).json({ message: "Internal Server Error" });   
    }
}

export async function getnotebyid(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(note);
        
    } catch (error) {
        console.error("Error in getbyid in notes:", error);
        res.status(500).json({ message: "Internal Server Error" });     
    }
}

export async function createnotes(req, res) {
    try {
        const {title,content}=req.body
        const newnote = new Note ({title,content})
        const saveNote = await newnote.save()
        res.status(201).json(saveNote)

    } catch (error) {
        console.error("Error in createnotes:", error);
        res.status(500).json({ message: "Internal Server Error" });    
        
    }
    
}

export async function updateded(req, res) {
    try {
        const {title,content}=req.body
        const updated = await Note.findByIdAndUpdate(
            req.params.id,
            {title,content},
            {new:true,}
        );
        if (!updated) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(updated)
    } catch (error) {
       console.error("Error in updatenotes:", error);
       res.status(500).json({ message: "Internal Server Error" });   
    }
    
}

export async function deleted(req, res) {
    try {
        const deletenote = await Note.findByIdAndDelete(req.params.id);
        if (!deletenote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error in delete the notes:", error);
       res.status(500).json({ message: "Internal Server Error" });  
    }
    
}




