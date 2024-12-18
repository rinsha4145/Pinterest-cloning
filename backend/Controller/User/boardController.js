const Boards = require('../../Models/User/boardSchema');
const {NotFoundError,ValidationError}=require('../../Utils/customeError')
const { validateBoard } = require('../../Models/validation');


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

    res.status(200).json({
      message: "Post successfully added to the board",
      board: updatedBoard,
    });
};

//view board based on the id
const viewBoardById = async (req, res, next) => {
      const { boardId } = req.params; // Get boardId from request parameters
      const board = await Boards.findById(req.params.id).populate('posts') .exec();
  
      if (!board) {
        throw new NotFoundError("Board not found");
      }
  
      
      if (board.userId.toString() !== req.userId) {
        return res.status(403).json({ message: "You do not have access to this board" });
      }
  
      res.status(200).json({
        message: "Board fetched successfully",
        board,
      });
  };

  //view all boards
  const getAllBoards = async (req, res, next) => {
    const boards = await Boards.find().populate("posts") // Fetch posts without authentication checks
    res.status(200).json(boards);
};


module.exports = { createBoard,addToBoard,viewBoardById,getAllBoards };
