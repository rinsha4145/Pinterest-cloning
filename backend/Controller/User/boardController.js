const Boards = require('../../Models/User/boardSchema');
const {NotFoundError,ValidationError}=require('../../Utils/customeError')
const { validateBoard } = require('../../Models/validation');
const Saved=require('../../Models/User/savedSchema')
const mongoose = require("mongoose");


//create a board
const createBoard = async (req, res, next) => {
    const { error, value } = validateBoard.validate(req.body);
    if (error) {
        return next(new ValidationError(error.details[0].message)); 
    }
    const { name, description } = value;
    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized: User ID not found" });
    }

    const newBoard = new Boards({
        name,
        description,
        userId: req.userId,
        posts:[]
    });
    await newBoard.save();
    console.log(newBoard)
    res.status(200).json({ status: "success", message: "board created successfully", newBoard });
};

// add posts into a particular borad based on the boardid
const addToBoard = async (req, res, next) => {
  const { boardId, postId } = req.body; // Accept both boardId and postId from the request body

  if (!boardId || !postId) {
      return res.status(400).json({ message: "Board ID and Post ID are required" });
  }

  // Find the board by ID and ensure it belongs to the logged-in user
  let board = await Boards.findOne({ _id: boardId, userId: req.userId });
  if (!board) {
      return res.status(404).json({ message: "Board not found or you don't have access to this board" });
  }

  // Check if the post is already in the board
  const isPostAdded =
      board.posts &&
      Array.isArray(board.posts) &&
      board.posts.some((post) => post.equals(postId));

  if (isPostAdded) {
      return res.status(400).json({ message: "Post already added to this board" });
  }

  // Add the post to the board's posts array
  board.posts.push(postId);

  // Save the updated board and populate the posts
  await board.save();
  const updatedBoard = await board.populate('posts');

  // Now, also add the post to the saved posts collection
  let save = await Saved.findOne({ userId: req.userId });
  
  if (!save) {
      // If the saved collection does not exist, create a new one
      const newSaved = new Saved({
          userId: req.userId,
          posts: [postId]
      });
      await newSaved.save();
      const updatedSave = await newSaved.populate('posts');
      return res.status(200).json({
          message: "Post successfully added to the board and saved",
          board: updatedBoard,
          saved: updatedSave
      });
  }

  const isPostSaved = save.posts && Array.isArray(save.posts) && save.posts.some(post => post.equals(postId));

  if (!isPostSaved) {
      // If the post is not already saved, add it to the saved posts array
      save.posts.push(postId);
      await save.save();
      const updatedSave = await save.populate('posts');
      return res.status(200).json({
          message: "Post successfully added to the board and saved",
          board: updatedBoard,
          saved: updatedSave
      });
  }

  // If the post is already saved, return a message
  return res.status(200).json({
      message: "Post already saved and added to the board",
      board: updatedBoard,
      saved: save
  });
};

//view board based on the id
const viewBoardById = async (req, res, next) => {
      const board = await Boards.findById(req.params.id).populate('posts') .exec();
      if (!board) {
        throw new NotFoundError("Board not found");
      }
  
      
    //   if (board.userId.toString() !== req.userId) {
    //     return res.status(403).json({ message: "You do not have access to this board" });
    //   }
  
      res.status(200).json({
        message: "Board fetched successfully",
        board,
      });
  };

  //view all boards
  const getAllBoards = async (req, res, next) => {
    const boards = await Boards.find({ userId: req.userId }).populate("posts") // Fetch posts without authentication checks
    res.status(200).json({boards});
};

// View all boards for a specific user
const getBoardsByUserId = async (req, res, next) => {
    const { id } = req.params; // Extract id from req.params

        const boards = await Boards.find({ userId: id }).populate("posts");


        if (!boards) {
            return res.status(404).json({ error: 'Boards not found' });
        }

        res.status(200).json({boards});
   
};

// Update board by its ID
const updateBoardById = async (req, res, next) => {
    const { id } = req.params; // Extract board ID from URL parameters
    const { name, description } = req.body; // Extract updated fields from request body
  console.log( req.body)
    // Validate user input
    if (!name && !description) { 
      return res.status(400).json({ message: "At least one field (name or description) must be provided for update" });
    }
  
    
      // Find the board by ID and ensure it belongs to the logged-in user
      let board = await Boards.findOne({ _id: id, userId: req.userId });
      if (!board) {
        return res.status(404).json({ message: "Board not found or you don't have access to this board" });
      }
  
      // Update fields if provided
      if (name) board.name = name;
      if (description) board.description = description;
  
      // Save the updated board
      await board.save();
  
      res.status(200).json({
        message: "Board updated successfully",
        board,
      });
    
  };
  const deleteBoardById = async (req, res, next) => {
      const { id } = req.params; 
      const board = await Boards.findOne({ _id: id, userId: req.userId });
      if (!board) {
        return res
          .status(404)
          .json({ message: "Board not found or you don't have access to this board" });
      }
  
      // Delete the board using `findByIdAndDelete` or `deleteOne`
      await Boards.deleteOne({ _id: id });
  
      res.status(200).json({
        message: "Board deleted successfully",
        boardId: id, // Optionally include the deleted board ID
      });
    
  };
  

  const removeFromBoard = async (req, res, next) => {
    const { boardId, postId } = req.body; // Accept both boardId and postId from the request body
  
    if (!boardId || !postId) {
      return res.status(400).json({ message: "Board ID and Post ID are required" });
    }
  
    // Find the board by ID and ensure it belongs to the logged-in user
    let board = await Boards.findOne({ _id: boardId, userId: req.userId });
    if (!board) {
      return res.status(404).json({ message: "Board not found or you don't have access to this board" });
    }
  
    // Check if the post exists in the board
    const postIndex = board.posts.findIndex((post) => post.equals(postId));
    if (postIndex === -1) {
      return res.status(404).json({ message: "Post not found in this board" });
    }
  
    // Remove the post from the board's posts array
    board.posts.splice(postIndex, 1);
  
    // Save the updated board
    await board.save();
    const updatedBoard = await board.populate('posts');
  
    // Optionally, remove the post from the saved posts collection
    let save = await Saved.findOne({ userId: req.userId });
    if (save) {
      const savedPostIndex = save.posts.findIndex((post) => post.equals(postId));
      if (savedPostIndex !== -1) {
        save.posts.splice(savedPostIndex, 1);
        await save.save();
      }
    }
  
    res.status(200).json({
      message: "Post successfully removed from the board",
      board: updatedBoard,
    });
  };
  
  
  

module.exports = { createBoard,addToBoard,viewBoardById,getAllBoards,getBoardsByUserId,updateBoardById,deleteBoardById,removeFromBoard };
