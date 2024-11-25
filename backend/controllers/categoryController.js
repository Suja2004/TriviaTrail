const categories = ["Science", "Math", "History", "Technology"]; 

const getCategories = (req, res) => {
  res.status(200).json(categories);
};

module.exports = { getCategories };
