// Add tests for the posts controller
const PostController = require('../post');
const PostModel = require('../../models/post');

// A simple array of mock posts, useful to be returned by our mock functions where necessary
const mockPosts = [
  {
    _id: 'POST_ID_1',
    postText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    userName: 'USER_ID_1',
    comments: [],
  },
  {
    _id: 'POST_ID_2',
    postText:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    userName: 'USER_ID_2',
    comments: ['COMMENT_ID_1', 'COMMENT_ID_2'],
  },
];

// Mock the entire module for PostModel, set used functions as simple Jest mock functions with a well-defined mock name.
//This mock name will be displayed in console in case of errors, so helpful for debugging.
jest.mock('../../models/post', () => {
  return {
    // To enable executing model functions in a chain, let mock functions return back our mock module as a response. This is done by mockReturnThis().
    // Without this, when populate is executed in a chain after find we will get error saying cannot find method populate of undefined.
    find: jest.fn().mockReturnThis().mockName('PostModel.find()'),
    findById: jest.fn().mockReturnThis().mockName('PostModel.findById()'),
    populate: jest.fn().mockName('PostModel.populate()'),
    create: jest.fn().mockName('PostModel.create()'),
  };
});

// Create a common response object with mock status() and json() functions. Once again enable chaining execution.
const res = {
  status: jest.fn().mockReturnThis().mockName('res.status()'),
  json: jest.fn().mockName('res.json()'),
};

// One test block for each controller function
describe('Post Controller - getAllPosts()', () => {
  // One happy path case
  test('should find all posts from the database with comments populated', async () => {
    // Let final result from our mock model be the collection of mock posts we created above.
    PostModel.populate.mockResolvedValue(mockPosts);

    // NOTE: We are not making a real HTTP API call. We are just executing the controller function with a mock request and response.
    await PostController.getAllPosts({}, res);

    // Run assertions which check appropriate model functions have been called and with appropriate arguments.
    expect(PostModel.find).toHaveBeenCalled();
    expect(PostModel.populate).toHaveBeenCalledWith('comments');
    // Similarly run assertions on response of controller.
    expect(res.json).toHaveBeenCalledWith(mockPosts);
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  // One edge case
  test('should send an error response in case of any error while fetching from database', async () => {
    // Let final result from our mock model be an error, so that we can simulate this test case.
    const mockError = new Error();
    PostModel.populate.mockRejectedValue(mockError);

    await PostController.getAllPosts({}, res);

    // Run assertions to check error response was sent correctly.
    expect(PostModel.find).toHaveBeenCalled();
    expect(PostModel.populate).toHaveBeenCalledWith('comments');
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
  });
});

describe('Post Controller - getSinglePost()', () => {
  test('should find single post from the database with comments populated', async () => {
    const req = {
      params: {
        id: 'POST_ID_2',
      },
    };
    PostModel.populate.mockResolvedValue(mockPosts[1]);

    await PostController.getSinglePost(req, res);

    expect(PostModel.findById).toHaveBeenCalledWith(req.params.id);
    expect(PostModel.populate).toHaveBeenCalledWith('comments');
    expect(res.json).toHaveBeenCalledWith(mockPosts[1]);
  });

  test('should send an error response if post does not exist in database', async () => {
    const req = {
      params: {
        id: 'POST_ID_10',
      },
    };

    PostModel.populate.mockResolvedValue(null);

    await PostController.getSinglePost(req, res);

    expect(PostModel.findById).toHaveBeenCalledWith(req.params.id);
    expect(PostModel.populate).toHaveBeenCalledWith('comments');
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      message: `post ${req.params.id} not found`,
    });
  });
});

describe('Post Controller - addNewPost()', () => {
  test('should create a new post on the database', async () => {
    const req = {
      body: {
        userName: 'USER_ID_1',
        postText: 'This is a test post.',
      },
    };

    const mockCreatedPost = {
      _id: 'POST_ID_3',
      userName: req.body.userName,
      postText: req.body.postText,
      comments: [],
    };
    PostModel.create.mockResolvedValue(mockCreatedPost);

    await PostController.addNewPost(req, res);

    expect(PostModel.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockCreatedPost);
  });

  test('should send an error response if any required data is missing', async () => {
    const req = {
      body: {
        userName: 'USER_ID_1',
        // postText missing
      },
    };

    const mockError = new Error('postText is required');
    PostModel.create.mockRejectedValue(mockError);

    await PostController.addNewPost(req, res);

    expect(PostModel.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
  });
});
