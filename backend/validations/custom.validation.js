const objectId = (value, helpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      return helpers.message('"{{#label}}" must be a valid id');
    }
    return value;
  };

const videoLink = (value, helpers) => {
  
    if (!value.match(/^(https:\/\/www\.)?youtube.com\/embed\/\S*$/)) {
      return helpers.message('"{{#label}}" is required ');
    }
    return value;
}; 

  module.exports = {
    objectId,
    videoLink
}